param(
  [int]$Port = 8787,
  [string]$BindAddress = "127.0.0.1",
  [switch]$Once
)

$ErrorActionPreference = "Stop"
$Root = [System.IO.Path]::GetFullPath((Split-Path -Parent $MyInvocation.MyCommand.Path))
$Address = [System.Net.IPAddress]::Parse($BindAddress)

$Seed = @{
  products = @(
    @{
      id = "p-100"; type = "weapon"; brand = "Delta Arms"; model = "Карабін AR-15 Civil";
      caliber = "5.56x45"; internalCode = "WPN-AR15-001"; uktzed = "9303300000"; price = 86500; currency = "UAH"
    },
    @{
      id = "p-200"; type = "regular"; brand = "Optix"; model = "Приціл коліматорний R-Point";
      caliber = ""; internalCode = "ACC-OPT-001"; uktzed = "9013109000"; price = 5400; currency = "UAH"
    }
  )
  invoices = @(
    @{
      id = "inv-240521-001"; channel = "B2B"; clientId = "c-001"; manager = "Марія Шевчук";
      total = 86500; paid = 30000; currency = "UAH"; accounting = $true
    }
  )
  integrations = @(
    @{ id = "rozetka"; name = "Rozetka"; status = "token_needed"; scope = "товари, замовлення, залишки, ціни" },
    @{ id = "prom"; name = "Prom"; status = "ok"; scope = "товари, замовлення, залишки, ціни" },
    @{ id = "epicentr"; name = "Epicentr"; status = "mapping_needed"; scope = "товари, замовлення, залишки" },
    @{ id = "allo"; name = "Allo"; status = "ok"; scope = "товари, замовлення, залишки, ціни" }
  )
}

function Get-StatusText {
  param([int]$StatusCode)

  switch ($StatusCode) {
    200 { "OK" }
    201 { "Created" }
    204 { "No Content" }
    400 { "Bad Request" }
    403 { "Forbidden" }
    404 { "Not Found" }
    500 { "Internal Server Error" }
    default { "OK" }
  }
}

function Get-ContentType {
  param([string]$Path)

  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".md" { "text/markdown; charset=utf-8" }
    default { "application/octet-stream" }
  }
}

function ConvertTo-Utf8Bytes {
  param([string]$Text)
  return [System.Text.Encoding]::UTF8.GetBytes($Text)
}

function Send-Response {
  param(
    [System.Net.Sockets.TcpClient]$Client,
    [int]$StatusCode,
    [string]$ContentType,
    [byte[]]$Body
  )

  $Stream = $Client.GetStream()
  $StatusText = Get-StatusText -StatusCode $StatusCode
  $Header = "HTTP/1.1 $StatusCode $StatusText`r`n" +
    "Content-Type: $ContentType`r`n" +
    "Content-Length: $($Body.Length)`r`n" +
    "Access-Control-Allow-Origin: *`r`n" +
    "Access-Control-Allow-Methods: GET,POST,OPTIONS`r`n" +
    "Access-Control-Allow-Headers: Content-Type`r`n" +
    "Connection: close`r`n`r`n"
  $HeaderBytes = [System.Text.Encoding]::ASCII.GetBytes($Header)
  $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
  $Stream.Flush()
  $Client.Close()
}

function Send-Json {
  param(
    [System.Net.Sockets.TcpClient]$Client,
    [object]$Value,
    [int]$StatusCode = 200
  )

  $Json = $Value | ConvertTo-Json -Depth 12
  Send-Response -Client $Client -StatusCode $StatusCode -ContentType "application/json; charset=utf-8" -Body (ConvertTo-Utf8Bytes $Json)
}

function Send-Text {
  param(
    [System.Net.Sockets.TcpClient]$Client,
    [string]$Text,
    [string]$ContentType = "text/plain; charset=utf-8",
    [int]$StatusCode = 200
  )

  Send-Response -Client $Client -StatusCode $StatusCode -ContentType $ContentType -Body (ConvertTo-Utf8Bytes $Text)
}

function Read-Request {
  param([System.Net.Sockets.TcpClient]$Client)

  $Stream = $Client.GetStream()
  $Buffer = New-Object byte[] 65536
  $Read = $Stream.Read($Buffer, 0, $Buffer.Length)
  if ($Read -le 0) {
    return $null
  }

  $Raw = [System.Text.Encoding]::UTF8.GetString($Buffer, 0, $Read)
  $Parts = $Raw -split "`r`n`r`n", 2
  $Head = $Parts[0]
  $Body = if ($Parts.Count -gt 1) { $Parts[1] } else { "" }
  $Lines = $Head -split "`r`n"
  $RequestLine = $Lines[0] -split " "
  if ($RequestLine.Count -lt 2) {
    return $null
  }

  return @{
    method = $RequestLine[0]
    path = ($RequestLine[1] -split "\?")[0]
    body = $Body
  }
}

function Send-Static {
  param(
    [System.Net.Sockets.TcpClient]$Client,
    [string]$RelativePath
  )

  $SafePath = $RelativePath.TrimStart("/")
  if ([string]::IsNullOrWhiteSpace($SafePath)) {
    $SafePath = "index.html"
  }
  $Resolved = [System.IO.Path]::GetFullPath((Join-Path $Root $SafePath))
  if (-not $Resolved.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
    Send-Json -Client $Client -StatusCode 403 -Value @{ error = "Forbidden" }
    return
  }
  if (-not (Test-Path -LiteralPath $Resolved -PathType Leaf)) {
    Send-Json -Client $Client -StatusCode 404 -Value @{ error = "Not found" }
    return
  }
  $Bytes = [System.IO.File]::ReadAllBytes($Resolved)
  Send-Response -Client $Client -StatusCode 200 -ContentType (Get-ContentType $Resolved) -Body $Bytes
}

function Handle-Client {
  param([System.Net.Sockets.TcpClient]$Client)

  $Request = Read-Request -Client $Client
  if ($null -eq $Request) {
    Send-Json -Client $Client -StatusCode 400 -Value @{ error = "Bad request" }
    return
  }

  $Path = $Request.path
  if ($Request.method -eq "OPTIONS") {
    Send-Text -Client $Client -Text ""
    return
  }

  if ($Path -eq "/api/health") {
    Send-Json -Client $Client -Value @{ ok = $true; service = "arms-crm-mock-api"; date = "2026-05-23" }
    return
  }

  if ($Path -eq "/api/products") {
    Send-Json -Client $Client -Value $Seed.products
    return
  }

  if ($Path -eq "/api/invoices") {
    Send-Json -Client $Client -Value $Seed.invoices
    return
  }

  if ($Path -eq "/api/integrations") {
    Send-Json -Client $Client -Value $Seed.integrations
    return
  }

  if ($Path -match "^/api/integrations/([^/]+)/sync$" -and $Request.method -eq "POST") {
    $Provider = $Matches[1]
    Send-Json -Client $Client -Value @{
      ok = $true
      provider = $Provider
      accepted = @("products", "orders", "stocks", "prices")
      idempotencyKey = "${Provider}:sync:$([DateTimeOffset]::Now.ToUnixTimeSeconds())"
    }
    return
  }

  if ($Path -eq "/api/bas-baf/export" -and $Request.method -eq "POST") {
    Send-Json -Client $Client -Value @{
      ok = $true
      exportedDocuments = @("inv-240521-001")
      target = "BAS/BAF"
      mode = "marked-documents-only"
    }
    return
  }

  Send-Static -Client $Client -RelativePath $Path
}

$Listener = [System.Net.Sockets.TcpListener]::new($Address, $Port)

try {
  $Listener.Start()
  $DisplayHost = if ($BindAddress -eq "0.0.0.0") { "<your-computer-ip>" } else { $BindAddress }
  Write-Host "Arms CRM mock API: http://$DisplayHost`:$Port/"
  Write-Host "Static app: http://$DisplayHost`:$Port/index.html"
  Write-Host "Stop with Ctrl+C."

  do {
    $Client = $Listener.AcceptTcpClient()
    Handle-Client -Client $Client
  } while (-not $Once)
}
finally {
  $Listener.Stop()
}
