@echo off

cd /d C:\Users\User\Documents\Codex\2026-05-23\crm-rozetka-prom-epicentr-allo-api

echo =========================
echo Git Status
echo =========================
git status

echo.
echo =========================
echo Adding files
echo =========================
git add .

echo.
echo =========================
echo Commit
echo =========================
git commit -m "Auto update"

echo.
echo =========================
echo Push to GitHub
echo =========================
git push

echo.
echo =========================
echo Done
echo =========================

pause