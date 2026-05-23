"use strict";

const STORAGE_KEY = "arms-crm-v1";

const NAV = [
  ["dashboard", "Панель", "ПН"],
  ["sales", "Продажі", "ПР"],
  ["products", "Товари", "ТВ"],
  ["purchases", "Прихід", "ПХ"],
  ["serials", "Серії / ЄРЗ", "ЄР"],
  ["warehouse", "Склад", "СК"],
  ["b2b", "B2B кабінети", "B2"],
  ["clients", "Клієнти", "КЛ"],
  ["finance", "Фінанси", "ФН"],
  ["reports", "Звіти", "ЗВ"],
  ["marketplaces", "Маркетплейси", "МП"],
  ["integrations", "Інтеграції", "ІН"],
  ["settings", "Налаштування", "НЛ"],
  ["roles", "Ролі", "РЛ"]
];

const today = "2026-05-23";

const seedState = {
  currentView: "dashboard",
  currentEmployeeId: "emp-001",
  currentRole: "Адміністратор",
  currentManager: "Марія Шевчук",
  settings: {
    closedDay: "2026-05-21",
    baseCurrency: "UAH",
    rates: { UAH: 1, USD: 40.2, EUR: 43.7 },
    firms: [
      { id: "vat", name: "ТОВ Альфа Армс, ПДВ", vat: true },
      { id: "fop", name: "ФОП без ПДВ", vat: false }
    ],
    suppliers: [
      { id: "sup-delta", name: "Delta Arms", edrpou: "", phone: "", email: "" },
      { id: "sup-nord", name: "Nord Hunt", edrpou: "", phone: "", email: "" },
      { id: "sup-optix", name: "Optix", edrpou: "", phone: "", email: "" },
      { id: "sup-fieldline", name: "FieldLine", edrpou: "", phone: "", email: "" }
    ],
    productDictionaries: {
      categories: ["Зброя нарізна", "Зброя гладкоствольна", "Оптика", "Чохли та кейси", "Аксесуари"],
      units: ["шт", "компл", "упак"],
      brands: ["Delta Arms", "Nord Hunt", "Optix", "FieldLine"],
      models: ["Карабін AR-15 Civil", "Рушниця помпова Hunter 12", "Приціл коліматорний R-Point", "Чохол тактичний 120 см"],
      calibers: ["5.56x45", "12/76", "9x19", ".308 Win", "без калібру"],
      uktzed: ["9303300000", "9303201000", "9013109000", "4202921900"],
      supplierSkus: ["DA-AR15-CIV", "NH-PUMP-12", "OP-RPOINT", "FL-CASE-120"],
      internalCodes: ["WPN-AR15-001", "WPN-H12-002", "ACC-OPT-001", "ACC-BAG-120"]
    },
    delivery: ["Нова пошта", "Укрпошта", "Міст", "Спецзв'язок Укрпошти"],
    documentTypes: ["Рахунок", "Видаткова накладна", "Реалізація", "Акт відповідального зберігання", "Повернення", "Переміщення"],
    priceTypes: ["Роздріб", "B2B базова", "B2B дилер", "Маркетплейс", "Акційна"],
    cashArticles: ["Продаж товарів", "Передоплата B2B", "Повернення коштів", "Конвертація валюти", "Інкасація"],
    expenseArticles: ["Комісія маркетплейсу", "Логістика", "Оренда", "Зарплата", "Банківська комісія", "Закупівля товару"],
    numberPrefix: "INV",
    defaultDueDays: 14,
    vatRate: 20
  },
  roles: [
    {
      name: "Адміністратор",
      canEditClosedDay: true,
      canSellWeapon: true,
      canChangePrices: true,
      canExportAccounting: true,
      canApproveCredit: true,
      canManageUsers: true,
      canViewReports: true,
      canEditSettings: true
    },
    {
      name: "Керівник продажів",
      canEditClosedDay: false,
      canSellWeapon: true,
      canChangePrices: true,
      canExportAccounting: true,
      canApproveCredit: true,
      canManageUsers: false,
      canViewReports: true,
      canEditSettings: false
    },
    {
      name: "Менеджер магазину",
      canEditClosedDay: false,
      canSellWeapon: true,
      canChangePrices: false,
      canExportAccounting: false,
      canApproveCredit: false,
      canManageUsers: false,
      canViewReports: false,
      canEditSettings: false
    },
    {
      name: "B2B клієнт",
      canEditClosedDay: false,
      canSellWeapon: false,
      canChangePrices: false,
      canExportAccounting: false,
      canApproveCredit: false,
      canManageUsers: false,
      canViewReports: false,
      canEditSettings: false
    }
  ],
  employees: [
    { id: "emp-001", name: "Марія Шевчук", roleName: "Адміністратор", department: "Адміністрація", phone: "+380671112233", email: "m.shevchuk@example.com", active: true },
    { id: "emp-002", name: "Олег Кравець", roleName: "Керівник продажів", department: "B2B", phone: "+380672224455", email: "o.kravets@example.com", active: true },
    { id: "emp-003", name: "Ірина Бойко", roleName: "Менеджер магазину", department: "Магазин", phone: "+380673336677", email: "i.boiko@example.com", active: true },
    { id: "emp-004", name: "Сергій Данилюк", roleName: "Менеджер магазину", department: "Склад", phone: "+380674448899", email: "s.danyliuk@example.com", active: true }
  ],
  managers: ["Марія Шевчук", "Олег Кравець", "Ірина Бойко", "Сергій Данилюк"],
  clients: [
    {
      id: "c-001",
      name: "Магазин Тактик Про",
      type: "B2B",
      manager: "Марія Шевчук",
      paymentTerms: "Відтермінування 14 днів",
      creditLimitUAH: 450000,
      cabinetEnabled: true,
      edrpou: "40112233",
      phone: "+380501234567",
      email: "office@tactic-pro.ua",
      priceType: "B2B дилер",
      currency: "UAH",
      taxMode: "ПДВ",
      responsibleStorage: true,
      address: "Київ, вул. Складська, 12"
    },
    {
      id: "c-002",
      name: "Стрілецький Дім",
      type: "B2B",
      manager: "Олег Кравець",
      paymentTerms: "Попередня оплата",
      creditLimitUAH: 0,
      cabinetEnabled: true,
      edrpou: "30998877",
      phone: "+380631112233",
      email: "sales@striletskyi-dim.ua",
      priceType: "B2B базова",
      currency: "UAH",
      taxMode: "без ПДВ",
      responsibleStorage: true,
      address: "Львів, вул. Промислова, 4"
    },
    {
      id: "c-003",
      name: "Роздрібний покупець",
      type: "Retail",
      manager: "Ірина Бойко",
      paymentTerms: "Оплата при продажу",
      creditLimitUAH: 0,
      cabinetEnabled: false,
      edrpou: "",
      phone: "",
      email: "",
      priceType: "Роздріб",
      currency: "UAH",
      taxMode: "роздріб",
      responsibleStorage: false,
      address: ""
    }
  ],
  warehouses: [
    { id: "wh-main", name: "Центральний склад", kind: "own" },
    { id: "wh-store", name: "Магазин", kind: "retail" },
    { id: "wh-b2b", name: "Відповідальне зберігання", kind: "responsible" },
    { id: "wh-client-c-001", name: "Склад клієнта · Магазин Тактик Про", kind: "client_responsible", clientId: "c-001" },
    { id: "wh-client-c-002", name: "Склад клієнта · Стрілецький Дім", kind: "client_responsible", clientId: "c-002" }
  ],
  products: [
    {
      id: "p-100",
      type: "weapon",
      model: "Карабін AR-15 Civil",
      caliber: "5.56x45",
      brand: "Delta Arms",
      erzRequired: true,
      barcode: "4820001000019",
      supplierSku: "DA-AR15-CIV",
      internalCode: "WPN-AR15-001",
      uktzed: "9303300000",
      price: 86500,
      currency: "UAH",
      cost: 1620,
      costCurrency: "USD",
      category: "Зброя нарізна",
      unit: "шт",
      minStock: 2,
      leadTimeDays: 21,
      description: "Цивільний карабін із серійним обліком та ЄРЗ контролем.",
      photos: []
    },
    {
      id: "p-101",
      type: "weapon",
      model: "Рушниця помпова Hunter 12",
      caliber: "12/76",
      brand: "Nord Hunt",
      erzRequired: true,
      barcode: "4820001000026",
      supplierSku: "NH-PUMP-12",
      internalCode: "WPN-H12-002",
      uktzed: "9303201000",
      price: 31200,
      currency: "UAH",
      cost: 620,
      costCurrency: "EUR",
      category: "Зброя гладкоствольна",
      unit: "шт",
      minStock: 3,
      leadTimeDays: 18,
      description: "Помпова рушниця для цивільного ринку.",
      photos: []
    },
    {
      id: "p-200",
      type: "regular",
      model: "Приціл коліматорний R-Point",
      caliber: "",
      brand: "Optix",
      erzRequired: false,
      barcode: "4820002000018",
      supplierSku: "OP-RPOINT",
      internalCode: "ACC-OPT-001",
      uktzed: "9013109000",
      price: 5400,
      currency: "UAH",
      cost: 92,
      costCurrency: "USD",
      category: "Оптика",
      unit: "шт",
      minStock: 12,
      leadTimeDays: 14,
      description: "Коліматорний приціл для роздрібного та B2B продажу.",
      photos: []
    },
    {
      id: "p-201",
      type: "regular",
      model: "Чохол тактичний 120 см",
      caliber: "",
      brand: "FieldLine",
      erzRequired: false,
      barcode: "4820002000025",
      supplierSku: "FL-CASE-120",
      internalCode: "ACC-BAG-120",
      uktzed: "4202921900",
      price: 2100,
      currency: "UAH",
      cost: 46,
      costCurrency: "EUR",
      category: "Чохли та кейси",
      unit: "шт",
      minStock: 15,
      leadTimeDays: 10,
      description: "Тканинний тактичний чохол 120 см.",
      photos: []
    }
  ],
  serials: [
    {
      id: "s-001",
      productId: "p-100",
      serial: "AR15-UA-24001",
      warehouseId: "wh-main",
      status: "available",
      erzStatus: "verified",
      actual: true,
      basSynced: true,
      purchaseId: "pin-240520-001",
      clientId: "",
      permitNumber: "",
      permitDate: ""
    },
    {
      id: "s-002",
      productId: "p-100",
      serial: "AR15-UA-24002",
      warehouseId: "wh-b2b",
      status: "responsible_storage",
      erzStatus: "verified",
      actual: true,
      basSynced: true,
      purchaseId: "pin-240520-001",
      clientId: "c-001",
      permitNumber: "",
      permitDate: ""
    },
    {
      id: "s-003",
      productId: "p-101",
      serial: "H12-UA-88015",
      warehouseId: "wh-store",
      status: "available",
      erzStatus: "pending",
      actual: true,
      basSynced: false,
      purchaseId: "pin-240521-002",
      clientId: "",
      permitNumber: "",
      permitDate: ""
    },
    {
      id: "s-004",
      productId: "p-100",
      serial: "AR15-UA-24003",
      warehouseId: "wh-client-c-001",
      status: "responsible_storage",
      erzStatus: "verified",
      actual: true,
      basSynced: true,
      purchaseId: "rs-240523-001",
      clientId: "c-001",
      permitNumber: "",
      permitDate: "",
      responsibleStorageDocId: "rs-240523-001"
    }
  ],
  stock: [
    { productId: "p-200", warehouseId: "wh-main", qty: 31 },
    { productId: "p-200", warehouseId: "wh-store", qty: 8 },
    { productId: "p-201", warehouseId: "wh-main", qty: 44 },
    { productId: "p-201", warehouseId: "wh-client-c-002", qty: 12, clientId: "c-002", responsibleStorageDocId: "rs-240522-002" }
  ],
  responsibleStorageDocs: [
    {
      id: "rs-240523-001",
      date: "2026-05-23",
      clientId: "c-001",
      warehouseId: "wh-client-c-001",
      productId: "p-100",
      qty: 1,
      serialIds: ["s-004"],
      manager: "Марія Шевчук",
      paymentDays: 14,
      status: "in_storage",
      ownership: "ours_until_client_sale",
      comment: "Передано на відповідальне зберігання, власність наша до продажу клієнтом."
    },
    {
      id: "rs-240522-002",
      date: "2026-05-22",
      clientId: "c-002",
      warehouseId: "wh-client-c-002",
      productId: "p-201",
      qty: 12,
      serialIds: [],
      manager: "Олег Кравець",
      paymentDays: 10,
      status: "in_storage",
      ownership: "ours_until_client_sale",
      comment: "Кількісний товар на складі клієнта."
    }
  ],
  purchases: [
    {
      id: "pin-240520-001",
      date: "2026-05-20",
      supplier: "Delta Arms",
      supplierDoc: "DA-8801",
      firmId: "vat",
      warehouseId: "wh-main",
      productId: "p-100",
      productType: "weapon",
      qty: 2,
      cost: 1620,
      currency: "USD",
      serials: ["AR15-UA-24001", "AR15-UA-24002"],
      accounting: true,
      basStatus: "exported",
      comment: "Імпортовано в BAS/BAF, серії актуальні"
    },
    {
      id: "pin-240521-002",
      date: "2026-05-21",
      supplier: "Nord Hunt",
      supplierDoc: "NH-772",
      firmId: "vat",
      warehouseId: "wh-store",
      productId: "p-101",
      productType: "weapon",
      qty: 1,
      cost: 620,
      currency: "EUR",
      serials: ["H12-UA-88015"],
      accounting: true,
      basStatus: "pending",
      comment: "Очікує підтвердження ЄРЗ та експорту BAS/BAF"
    }
  ],
  invoices: [
    {
      id: "inv-240521-001",
      date: "2026-05-21",
      firmId: "vat",
      channel: "B2B",
      clientId: "c-001",
      manager: "Марія Шевчук",
      currency: "UAH",
      total: 86500,
      paid: 30000,
      dueDate: "2026-06-04",
      accounting: true,
      locked: true,
      status: "partial",
      lines: [
        { productId: "p-100", qty: 1, price: 86500, serialId: "s-002", permitNumber: "ДЗ-450112", permitDate: "2026-05-19" }
      ],
      delivery: "Спецзв'язок Укрпошти",
      ttn: "SZ-009812"
    },
    {
      id: "inv-240522-002",
      date: "2026-05-22",
      firmId: "fop",
      channel: "Rozetka",
      clientId: "c-003",
      manager: "Ірина Бойко",
      currency: "UAH",
      total: 10800,
      paid: 10800,
      dueDate: "2026-05-22",
      accounting: false,
      locked: false,
      status: "paid",
      lines: [{ productId: "p-200", qty: 2, price: 5400, serialId: "", permitNumber: "", permitDate: "" }],
      delivery: "Нова пошта",
      ttn: "NP-590010222"
    }
  ],
  payments: [
    {
      id: "pay-001",
      invoiceId: "inv-240521-001",
      date: "2026-05-21",
      amount: 30000,
      currency: "UAH",
      rate: 1,
      method: "Безготівка",
      bankRef: "mono-88210"
    },
    {
      id: "pay-002",
      invoiceId: "inv-240522-002",
      date: "2026-05-22",
      amount: 10800,
      currency: "UAH",
      rate: 1,
      method: "Каса",
      bankRef: "cash-shift-47"
    }
  ],
  expenses: [
    { id: "exp-001", date: "2026-05-22", article: "Комісія маркетплейсу", amount: 648, currency: "UAH", method: "Безготівка", manager: "Ірина Бойко", supplier: "Rozetka", comment: "Комісія по замовленню NP-590010222" },
    { id: "exp-002", date: "2026-05-21", article: "Логістика", amount: 920, currency: "UAH", method: "Безготівка", manager: "Марія Шевчук", supplier: "Спецзв'язок Укрпошти", comment: "Доставка серійного товару" },
    { id: "exp-003", date: "2026-05-20", article: "Банківська комісія", amount: 18, currency: "USD", method: "Банк API", manager: "Олег Кравець", supplier: "Банк", comment: "SWIFT/еквайринг" }
  ],
  payables: [
    { id: "ap-001", supplier: "Delta Arms", manager: "Марія Шевчук", article: "Закупівля товару", amount: 3240, currency: "USD", dueDate: "2026-06-02", status: "open" },
    { id: "ap-002", supplier: "Optix", manager: "Олег Кравець", article: "Закупівля товару", amount: 1840, currency: "USD", dueDate: "2026-05-30", status: "open" },
    { id: "ap-003", supplier: "FieldLine", manager: "Ірина Бойко", article: "Закупівля товару", amount: 920, currency: "EUR", dueDate: "2026-06-08", status: "planned" }
  ],
  cashShifts: [
    { id: "shift-47", date: "2026-05-22", manager: "Ірина Бойко", expected: 10800, actual: 10800, closed: true },
    { id: "shift-48", date: "2026-05-23", manager: "Сергій Данилюк", expected: 0, actual: 0, closed: false }
  ],
  salesPlans: [
    { manager: "Марія Шевчук", period: "2026-05", plan: 320000, currency: "UAH" },
    { manager: "Олег Кравець", period: "2026-05", plan: 260000, currency: "UAH" },
    { manager: "Ірина Бойко", period: "2026-05", plan: 180000, currency: "UAH" }
  ],
  marketplaceStats: [
    { marketplace: "Rozetka", sku: "OP-RPOINT", productId: "p-200", price: 5400, sold: 2, commission: 648, logistics: 260, otherCosts: 80, cost: 92, costCurrency: "USD", currency: "UAH" },
    { marketplace: "Prom", sku: "FL-CASE-120", productId: "p-201", price: 2100, sold: 5, commission: 420, logistics: 350, otherCosts: 60, cost: 46, costCurrency: "EUR", currency: "UAH" },
    { marketplace: "Allo", sku: "OP-RPOINT", productId: "p-200", price: 5350, sold: 3, commission: 722, logistics: 390, otherCosts: 90, cost: 92, costCurrency: "USD", currency: "UAH" }
  ],
  marketplacePublications: [
    { id: "pub-001", marketplace: "Rozetka", productId: "p-200", sku: "OP-RPOINT-RZ", externalId: "rz-93001", title: "Приціл коліматорний R-Point", price: 5400, currency: "UAH", stockQty: 39, status: "published", photosStatus: "ok", lastSync: "2026-05-23 09:15", manager: "Ірина Бойко" },
    { id: "pub-002", marketplace: "Prom", productId: "p-201", sku: "FL-CASE-120-PR", externalId: "pr-12044", title: "Чохол тактичний 120 см", price: 2100, currency: "UAH", stockQty: 56, status: "needs_sync", photosStatus: "missing", lastSync: "2026-05-22 18:20", manager: "Олег Кравець" },
    { id: "pub-003", marketplace: "Allo", productId: "p-200", sku: "OP-RPOINT-AL", externalId: "al-55120", title: "Коліматорний приціл R-Point", price: 5350, currency: "UAH", stockQty: 39, status: "published", photosStatus: "ok", lastSync: "2026-05-23 08:40", manager: "Ірина Бойко" }
  ],
  marketplaceOrders: [
    {
      id: "mpo-001",
      marketplace: "Rozetka",
      externalOrderId: "RZ-20260523-101",
      date: "2026-05-23",
      status: "new_order",
      manager: "Ірина Бойко",
      productId: "p-200",
      sku: "OP-RPOINT-RZ",
      qty: 1,
      price: 5400,
      currency: "UAH",
      buyer: { name: "Олександр Клименко", phone: "+380501119900", email: "buyer101@example.com", edrpou: "", address: "Київ, відділення Нової пошти 12" },
      delivery: { service: "Нова пошта", city: "Київ", warehouse: "Відділення 12", ttn: "" },
      payment: { method: "Післяплата маркетплейсу", status: "expected", amount: 5400, source: "RozetkaPay" },
      clientId: "",
      invoiceId: ""
    }
  ],
  reportBuilder: {
    reportId: "sales",
    from: "2026-05-01",
    to: "2026-05-23",
    columns: [],
    sortBy: "date",
    sortDir: "desc",
    groupBy: ""
  },
  integrations: [
    { id: "rozetka", name: "Rozetka", status: "token_needed", lastSync: "2026-05-22 18:10", scope: "товари, замовлення, залишки, ціни" },
    { id: "prom", name: "Prom", status: "ok", lastSync: "2026-05-23 09:15", scope: "товари, замовлення, залишки, ціни" },
    { id: "epicentr", name: "Epicentr", status: "mapping_needed", lastSync: "2026-05-21 16:45", scope: "товари, замовлення, залишки" },
    { id: "allo", name: "Allo", status: "ok", lastSync: "2026-05-23 08:40", scope: "товари, замовлення, залишки, ціни" },
    { id: "bas", name: "BAS/BAF", status: "ok", lastSync: "2026-05-23 07:10", scope: "позначені документи бухобліку" },
    { id: "bank", name: "Банки", status: "mapping_needed", lastSync: "2026-05-22 20:00", scope: "виписки, платежі, валюта" }
  ],
  audit: [
    { at: "2026-05-23 09:15", actor: "system", action: "Prom sync: оновлено 4 залишки та 2 ціни" },
    { at: "2026-05-22 18:10", actor: "system", action: "Rozetka sync: потрібне оновлення токена" },
    { at: "2026-05-22 12:25", actor: "Марія Шевчук", action: "Накладну inv-240521-001 позначено для BAS/BAF" }
  ]
};

const ROLE_BASIC_PERMISSIONS = [
  ["canEditClosedDay", "Закритий день"],
  ["canSellWeapon", "Продаж зброї"],
  ["canChangePrices", "Зміна цін"],
  ["canExportAccounting", "BAS/BAF"],
  ["canApproveCredit", "Кредит / відтермінування"],
  ["canManageUsers", "Працівники"],
  ["canViewReports", "Звіти"],
  ["canEditSettings", "Налаштування"]
];

const ROLE_DOCUMENT_PERMISSIONS = [
  ["salesInvoice", "Продаж / накладна"],
  ["purchase", "Прихід"],
  ["responsibleShipment", "Відповідальне зберігання"],
  ["b2bSaleReport", "Звіт продажу B2B"],
  ["payment", "Оплата"],
  ["expense", "Витрата"],
  ["payable", "Кредиторка"],
  ["productCard", "Картка товару"],
  ["clientCard", "Картка клієнта"],
  ["serialCorrection", "Серійний облік"],
  ["marketplacePublication", "Публікація маркетплейсу"],
  ["settingsDocument", "Налаштування"]
];

const ROLE_FIELD_PERMISSIONS = [
  ["date", "Дата документа"],
  ["client", "Клієнт"],
  ["product", "Товар / QR"],
  ["warehouse", "Склад"],
  ["price", "Ціна"],
  ["discount", "Знижка"],
  ["cost", "Собівартість"],
  ["serials", "Серійні номери"],
  ["permit", "Дозвіл покупця"],
  ["payment", "Оплата / курс"],
  ["due", "Відтермінування"],
  ["manager", "Менеджер"],
  ["accounting", "Бухоблік BAS/BAF"],
  ["marketplace", "Маркетплейс"]
];

let state = normalizeState(loadState());
let saleDraft = { productId: "p-200", qty: 1, serialIds: [], permitNumber: "", permitDate: "", barcode: "" };
let b2bDraft = { shipmentProductId: "p-100", saleProductId: "p-100", saleClientId: "c-001" };
let authEmployeeId = sessionStorage.getItem("arms-crm-auth-employee-id") || "";
let productImagesDraft = [];

const MARKETPLACE_IMAGE_TYPES = ["image/jpeg", "image/png"];
const MARKETPLACE_IMAGE_EXTENSIONS = ".jpg,.jpeg,.png";
const MAX_PRODUCT_PHOTOS = 6;
const MAX_PRODUCT_PHOTO_BYTES = 8 * 1024 * 1024;
const PRODUCT_PHOTO_MAX_SIDE = 1280;
const PRODUCT_PHOTO_JPEG_QUALITY = 0.82;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const DECIMAL_FIELD_NAMES = new Set([
  "price",
  "cost",
  "paid",
  "amount",
  "rate",
  "discount",
  "creditLimitUAH"
]);

function normalizeDecimalText(value) {
  const raw = String(value ?? "").trim().replace(/\s+/g, "").replaceAll("'", "");
  if (!raw) return "";
  const comma = raw.lastIndexOf(",");
  const dot = raw.lastIndexOf(".");
  if (comma >= 0 && dot >= 0) {
    const decimalIndex = Math.max(comma, dot);
    return `${raw.slice(0, decimalIndex).replace(/[.,]/g, "")}.${raw.slice(decimalIndex + 1)}`;
  }
  return raw.replace(",", ".");
}

function parseDecimal(value, fallback = 0) {
  const number = Number(normalizeDecimalText(value));
  return Number.isFinite(number) ? number : fallback;
}

function isDecimalFieldName(name) {
  const key = String(name || "");
  return DECIMAL_FIELD_NAMES.has(key) || /^[A-Z]{3}$/.test(key);
}

function prepareDecimalInputs(root = document) {
  $$("input", root).forEach((input) => {
    if (isDecimalFieldName(input.name)) {
      input.type = "text";
      input.inputMode = "decimal";
      input.dataset.decimal = "true";
      input.autocomplete = "off";
      input.title = "Можна вводити копійки/центи через кому або крапку";
    } else if (input.type === "number" && !input.step) {
      input.step = "1";
    }
  });
}

const FIELD_LOCKS = {
  date: ["date"],
  client: ["clientId", "clientName"],
  product: ["productId", "barcode"],
  warehouse: ["warehouseId"],
  price: ["price", "currency", "priceType"],
  discount: ["discount"],
  cost: ["cost", "costCurrency"],
  serials: ["serialIds", "serials"],
  permit: ["permitNumber", "permitDate"],
  payment: ["paid", "paymentMode", "amount", "rate", "method", "bankRef"],
  due: ["dueDays", "paymentDays", "dueDate"],
  manager: ["manager"],
  accounting: ["accounting", "firmId"],
  marketplace: ["marketplace", "sku", "externalId"]
};

function applyRoleFieldLocks(root = document) {
  Object.entries(FIELD_LOCKS).forEach(([fieldKey, names]) => {
    if (canEditField(fieldKey)) return;
    names.forEach((name) => {
      $$(`[name="${name}"]`, root).forEach((element) => {
        element.disabled = true;
        element.title = "Поле заблоковане поточною роллю";
      });
    });
  });
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function uniqueList(values) {
  const seen = new Set();
  return values.reduce((list, value) => {
    const text = String(value ?? "").trim();
    const key = text.toLowerCase();
    if (!text || seen.has(key)) return list;
    seen.add(key);
    list.push(text);
    return list;
  }, []);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : clone(seedState);
  } catch (error) {
    console.warn("Cannot load state", error);
    return clone(seedState);
  }
}

function roleHasAdminAccess(roleItem) {
  return roleItem?.canManageUsers === true || roleItem?.name === "Адміністратор" || roleItem?.name === "РђРґРјС–РЅС–СЃС‚СЂР°С‚РѕСЂ";
}

function defaultRoleAccess(roleItem) {
  const admin = roleHasAdminAccess(roleItem);
  const views = Object.fromEntries(NAV.map(([id]) => {
    const allowed = admin
      || id === "dashboard"
      || (id === "reports" && roleItem.canViewReports)
      || (id === "settings" && roleItem.canEditSettings)
      || (id === "roles" && roleItem.canManageUsers)
      || (id === "finance" && (roleItem.canApproveCredit || roleItem.canViewReports))
      || !["reports", "settings", "roles", "integrations"].includes(id);
    return [id, Boolean(allowed)];
  }));
  const documents = Object.fromEntries(ROLE_DOCUMENT_PERMISSIONS.map(([key]) => {
    const allowed = admin
      || ["salesInvoice", "purchase", "productCard", "clientCard", "marketplacePublication"].includes(key)
      || (["payment", "payable", "b2bSaleReport", "responsibleShipment"].includes(key) && roleItem.canApproveCredit)
      || (key === "expense" && roleItem.canViewReports)
      || (key === "serialCorrection" && roleItem.canSellWeapon)
      || (key === "settingsDocument" && roleItem.canEditSettings);
    return [key, Boolean(allowed)];
  }));
  const fields = Object.fromEntries(ROLE_FIELD_PERMISSIONS.map(([key]) => {
    const allowed = admin
      || !["price", "discount", "cost", "accounting", "permit", "serials", "payment", "due", "marketplace"].includes(key)
      || (["price", "discount"].includes(key) && roleItem.canChangePrices)
      || (["permit", "serials"].includes(key) && roleItem.canSellWeapon)
      || (key === "accounting" && roleItem.canExportAccounting)
      || (["payment", "due"].includes(key) && roleItem.canApproveCredit)
      || (key === "marketplace" && (roleItem.canEditSettings || roleItem.canChangePrices));
    return [key, Boolean(allowed)];
  }));
  return { views, documents, fields };
}

function normalizeRole(roleItem) {
  const base = {
    canEditClosedDay: false,
    canSellWeapon: false,
    canChangePrices: false,
    canExportAccounting: false,
    canApproveCredit: false,
    canManageUsers: false,
    canViewReports: false,
    canEditSettings: false,
    ...roleItem
  };
  const defaults = defaultRoleAccess(base);
  base.access = {
    views: { ...defaults.views, ...(roleItem.access?.views || {}) },
    documents: { ...defaults.documents, ...(roleItem.access?.documents || {}) },
    fields: { ...defaults.fields, ...(roleItem.access?.fields || {}) }
  };
  return base;
}

function defaultEmployeeLogin(employee, index) {
  if (employee.login) return employee.login;
  if (index === 0 || employee.roleName === "Адміністратор" || employee.roleName === "РђРґРјС–РЅС–СЃС‚СЂР°С‚РѕСЂ") return "admin";
  return employee.id || `emp-${String(index + 1).padStart(3, "0")}`;
}

function normalizeState(loaded) {
  const next = { ...clone(seedState), ...loaded };
  next.settings = { ...clone(seedState.settings), ...(loaded.settings || {}) };
  next.roles = (loaded.roles || seedState.roles).map(normalizeRole);
  const employees = loaded.employees && loaded.employees.length
    ? loaded.employees
    : (loaded.managers || seedState.managers).map((name, index) => ({
      id: `emp-${String(index + 1).padStart(3, "0")}`,
      name,
      roleName: index === 0 ? "Адміністратор" : "Менеджер магазину",
      department: index === 0 ? "Адміністрація" : "Продажі",
      phone: "",
      email: "",
      active: true
    }));
  next.employees = employees.map((employee, index) => ({
    department: "Продажі",
    phone: "",
    email: "",
    active: true,
    ...employee,
    login: defaultEmployeeLogin(employee, index),
    password: employee.password || (index === 0 ? "admin" : "1234")
  }));
  next.currentEmployeeId = loaded.currentEmployeeId || next.employees[0]?.id || "emp-001";
  const activeEmployee = next.employees.find((employee) => employee.id === next.currentEmployeeId) || next.employees[0];
  next.currentManager = activeEmployee?.name || loaded.currentManager || "Адміністратор";
  next.currentRole = activeEmployee?.roleName || loaded.currentRole || "Адміністратор";
  next.managers = next.employees.filter((employee) => employee.active).map((employee) => employee.name);
  next.warehouses = (loaded.warehouses || seedState.warehouses).map((warehouse) => ({
    clientId: "",
    ...warehouse
  }));
  next.settings.suppliers = (loaded.settings?.suppliers && loaded.settings.suppliers.length)
    ? loaded.settings.suppliers.map((supplier) => ({ edrpou: "", phone: "", email: "", ...supplier }))
    : seedState.settings.suppliers;
  next.settings.productDictionaries = {
    ...clone(seedState.settings.productDictionaries),
    ...(loaded.settings?.productDictionaries || {})
  };
  next.clients = (loaded.clients || seedState.clients).map((client) => ({
    edrpou: "",
    phone: "",
    email: "",
    priceType: "Роздріб",
    currency: "UAH",
    taxMode: "без ПДВ",
    responsibleStorage: false,
    address: "",
    ...client
  }));
  next.products = (loaded.products || seedState.products).map((product) => ({
    category: product.type === "weapon" ? "Зброя" : "Аксесуари",
    unit: "шт",
    minStock: 0,
    leadTimeDays: 14,
    description: "",
    photos: [],
    ...product
  }));
  seedProductDictionaries(next);
  next.serials = (loaded.serials || seedState.serials).map((serial) => ({
    actual: true,
    basSynced: false,
    purchaseId: "",
    ...serial
  }));
  (loaded.invoices || seedState.invoices).forEach((invoice) => {
    (invoice.lines || []).forEach((line) => {
      if (!line.serialId) return;
      const serial = next.serials.find((item) => item.id === line.serialId);
      if (serial) {
        serial.status = "sold";
        serial.clientId = invoice.clientId;
        serial.permitNumber = line.permitNumber || serial.permitNumber || "";
        serial.permitDate = line.permitDate || serial.permitDate || "";
      }
    });
  });
  next.expenses = loaded.expenses || seedState.expenses;
  next.payables = loaded.payables || seedState.payables;
  next.purchases = loaded.purchases || seedState.purchases;
  next.responsibleStorageDocs = loaded.responsibleStorageDocs || seedState.responsibleStorageDocs;
  next.salesPlans = loaded.salesPlans || seedState.salesPlans;
  next.marketplaceStats = loaded.marketplaceStats || seedState.marketplaceStats;
  next.marketplacePublications = loaded.marketplacePublications || seedState.marketplacePublications;
  next.marketplaceOrders = loaded.marketplaceOrders || seedState.marketplaceOrders;
  next.reportBuilder = { ...clone(seedState.reportBuilder), ...(loaded.reportBuilder || {}) };
  return next;
}

function seedProductDictionaries(next) {
  const dictionaries = next.settings.productDictionaries;
  const map = {
    categories: "category",
    units: "unit",
    brands: "brand",
    models: "model",
    calibers: "caliber",
    uktzed: "uktzed",
    supplierSkus: "supplierSku",
    internalCodes: "internalCode"
  };
  Object.entries(map).forEach(([key, productField]) => {
    dictionaries[key] = uniqueList([...(dictionaries[key] || []), ...next.products.map((product) => product[productField]).filter(Boolean)]);
  });
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Cannot save state", error);
  }
}

function byId(list, id) {
  return list.find((item) => item.id === id);
}

function productName(id) {
  const product = byId(state.products, id);
  return product ? `${product.brand} ${product.model}` : "Невідомий товар";
}

function clientName(id) {
  const client = byId(state.clients, id);
  return client ? client.name : "Невідомий клієнт";
}

function warehouseName(id) {
  const warehouse = byId(state.warehouses, id);
  return warehouse ? warehouse.name : "Невідомий склад";
}

function firmName(id) {
  const firm = byId(state.settings.firms, id);
  return firm ? firm.name : "Невідома фірма";
}

function currentEmployee() {
  return state.employees.find((employee) => employee.id === state.currentEmployeeId) || state.employees[0];
}

function authenticatedEmployee() {
  return state.employees.find((employee) => employee.id === authEmployeeId && employee.active !== false);
}

function isAuthenticated() {
  return Boolean(authenticatedEmployee());
}

function activateEmployeeSession(employee) {
  authEmployeeId = employee.id;
  sessionStorage.setItem("arms-crm-auth-employee-id", employee.id);
  state.currentEmployeeId = employee.id;
  state.currentManager = employee.name;
  state.currentRole = employee.roleName;
}

function role() {
  const employee = currentEmployee();
  const roleName = employee?.roleName || state.currentRole;
  return state.roles.find((item) => item.name === roleName) || state.roles[0];
}

function isAdmin() {
  return role().canManageUsers === true || role().name === "Адміністратор";
}

function canAccessView(viewId) {
  return roleHasAdminAccess(role()) || role().access?.views?.[viewId] !== false || viewId === "dashboard";
}

function canCreateDocument(documentKey) {
  return roleHasAdminAccess(role()) || role().access?.documents?.[documentKey] !== false;
}

function canEditField(fieldKey) {
  return roleHasAdminAccess(role()) || role().access?.fields?.[fieldKey] !== false;
}

function employeeOptions(selectedName = state.currentManager) {
  return state.employees
    .filter((employee) => employee.active)
    .map((employee) => option(employee.name, employee.name, employee.name === selectedName))
    .join("");
}

function supplierOptions(selectedId = "") {
  return [
    ...state.settings.suppliers.map((supplier) => option(supplier.id, supplier.name, supplier.id === selectedId || supplier.name === selectedId)),
    option("__new", "+ Новий постачальник")
  ].join("");
}

function supplierName(idOrName) {
  const supplier = state.settings.suppliers.find((item) => item.id === idOrName || item.name === idOrName);
  return supplier ? supplier.name : idOrName;
}

function dictionaryOptions(key, selected = "") {
  const values = uniqueList(state.settings.productDictionaries?.[key] || []);
  return [
    ...values.map((value) => option(value, value, value === selected)),
    option("__new", "+ Додати нове", selected === "__new")
  ].join("");
}

function dictionaryField(key, label, selectName, newName, config = {}) {
  const className = `field${config.wide ? " wide" : ""}`;
  const required = config.required === false ? "" : "required";
  const placeholder = config.placeholder || "заповніть, якщо обрано + Додати нове";
  return `
    <label class="${className}"><span>${escapeHtml(label)}</span><select name="${escapeHtml(selectName)}" ${required}>${dictionaryOptions(key, config.selected || "")}</select></label>
    <label class="${className}"><span>${escapeHtml(label)}: нове</span><input name="${escapeHtml(newName)}" placeholder="${escapeHtml(placeholder)}"></label>
  `;
}

function resolveDictionaryValue(key, selected, fresh, label, config = {}) {
  const value = String(selected === "__new" ? fresh : selected || "").trim();
  if (config.required !== false && !value) {
    throw new Error(`Заповніть поле "${label}".`);
  }
  if (!value) return "";
  state.settings.productDictionaries[key] = uniqueList([...(state.settings.productDictionaries[key] || []), value]);
  return value;
}

function findProductByCode(code) {
  const normalized = String(code || "").trim().toLowerCase();
  if (!normalized) return null;
  return state.products.find((product) => [product.barcode, product.qrCode, product.supplierSku, product.internalCode]
    .filter(Boolean)
    .some((value) => String(value).trim().toLowerCase() === normalized));
}

function normalizedText(value) {
  return String(value || "").trim().toLowerCase();
}

function invoiceUsesSerial(serialId) {
  return state.invoices.some((invoice) => invoice.lines.some((line) => line.serialId === serialId || (line.serialIds || []).includes(serialId)));
}

function serialIsSold(serial) {
  return serial.status === "sold" || invoiceUsesSerial(serial.id);
}

function serialIsOnStock(serial) {
  return ["available", "responsible_storage"].includes(serial.status);
}

function serialMatchesProduct(serial, product) {
  if (!serial || !product) return false;
  return serial.productId === product.id;
}

function serialIsSelectable(serial) {
  return serialIsOnStock(serial) && !serialIsSold(serial) && serial.actual !== false && serial.erzStatus === "verified";
}

function serialStatusText(serial) {
  if (serialIsSold(serial)) return "продано";
  if (serial.actual === false) return "неактуальна";
  if (!serialIsOnStock(serial)) return serial.status || "не на складі";
  if (serial.erzStatus !== "verified") return "ЄРЗ очікує";
  return serial.status === "responsible_storage" ? "відп. зберігання" : "на складі";
}

function serialsForProduct(product) {
  return state.serials
    .filter((serial) => serialMatchesProduct(serial, product))
    .sort((first, second) => Number(serialIsSelectable(second)) - Number(serialIsSelectable(first)) || first.serial.localeCompare(second.serial, "uk"));
}

function serialOption(serial, selectedIds = []) {
  const isSelectable = serialIsSelectable(serial);
  const isSold = serialIsSold(serial);
  const linkedProduct = byId(state.products, serial.productId);
  const label = `${serial.serial} · ${linkedProduct?.model || "модель"} · ${warehouseName(serial.warehouseId)} · ${serialStatusText(serial)}`;
  const className = isSelectable ? "serial-available" : isSold ? "serial-sold" : "serial-blocked";
  return `<option value="${escapeHtml(serial.id)}" ${selectedIds.includes(serial.id) ? "selected" : ""} ${isSelectable ? "" : "disabled"} class="${className}">${escapeHtml(label)}</option>`;
}

function validateScannedCode(code, product) {
  const normalized = String(code || "").trim();
  if (!normalized) return "QR або штрихкод обов'язковий.";
  if (!product.barcode && !product.qrCode) return "У картці товару немає QR/штрихкоду. Створіть його в товарі або внесіть у приході.";
  const allowed = [product.barcode, product.qrCode].filter(Boolean).map((value) => String(value).trim().toLowerCase());
  if (!allowed.includes(normalized.toLowerCase())) {
    return `QR/штрихкод не відповідає вибраній позиції ${product.brand} ${product.model}.`;
  }
  return "";
}

function generateEan13(prefix = "482") {
  const base = `${prefix}${String(Date.now()).slice(-8)}${Math.floor(Math.random() * 10)}`.slice(0, 12);
  const sum = base.split("").reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 1 : 3), 0);
  const checksum = (10 - (sum % 10)) % 10;
  return `${base}${checksum}`;
}

function fileToMarketplacePhoto(file) {
  if (!MARKETPLACE_IMAGE_TYPES.includes(file.type)) {
    throw new Error(`Фото "${file.name}" має бути JPG/JPEG або PNG.`);
  }
  if (file.size > MAX_PRODUCT_PHOTO_BYTES) {
    throw new Error(`Фото "${file.name}" більше 8 МБ. Оберіть менший файл.`);
  }

  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      const scale = Math.min(1, PRODUCT_PHOTO_MAX_SIDE / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve({
        id: uniqueId("photo"),
        name: file.name,
        type: "image/jpeg",
        format: "JPG",
        originalType: file.type,
        originalSize: file.size,
        width,
        height,
        dataUrl: canvas.toDataURL("image/jpeg", PRODUCT_PHOTO_JPEG_QUALITY)
      });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Не вдалося прочитати фото "${file.name}".`));
    };
    image.src = url;
  });
}

async function handleProductPhotos(input) {
  const files = Array.from(input.files || []);
  if (!files.length) return;
  if (productImagesDraft.length + files.length > MAX_PRODUCT_PHOTOS) {
    input.value = "";
    alert(`Можна додати максимум ${MAX_PRODUCT_PHOTOS} фото до одного товару.`);
    return;
  }
  try {
    const photos = [];
    for (const file of files) {
      photos.push(await fileToMarketplacePhoto(file));
    }
    productImagesDraft = [...productImagesDraft, ...photos].slice(0, MAX_PRODUCT_PHOTOS);
    renderProductPhotoPreview();
  } catch (error) {
    alert(error.message);
  } finally {
    input.value = "";
  }
}

function renderProductPhotoPreview() {
  const preview = $("#product-photo-preview");
  if (!preview) return;
  if (!productImagesDraft.length) {
    preview.innerHTML = '<div class="photo-empty">Фото ще не додані. Дозволено до 6 файлів JPG/JPEG або PNG.</div>';
    return;
  }
  preview.innerHTML = productImagesDraft.map((photo, index) => `
    <figure class="photo-thumb">
      <img src="${escapeHtml(photo.dataUrl)}" alt="${escapeHtml(photo.name)}">
      <figcaption>
        <strong>${index + 1}. ${escapeHtml(photo.name)}</strong>
        <span>${photo.format} · ${photo.width}×${photo.height}</span>
      </figcaption>
      <button class="icon-button danger photo-remove" type="button" data-remove-product-photo="${escapeHtml(photo.id)}" title="Видалити фото" aria-label="Видалити фото">×</button>
    </figure>
  `).join("");
}

function productPhotoThumbs(product) {
  const photos = product.photos || [];
  if (!photos.length) return '<span class="small muted">немає</span>';
  return `
    <div class="product-photo-stack">
      ${photos.slice(0, 3).map((photo) => `<img src="${escapeHtml(photo.dataUrl)}" alt="${escapeHtml(photo.name || product.model)}">`).join("")}
      ${photos.length > 3 ? `<span class="photo-count">+${photos.length - 3}</span>` : ""}
    </div>
  `;
}

function selectedValues(select) {
  return select ? Array.from(select.selectedOptions).map((optionNode) => optionNode.value).filter(Boolean) : [];
}

function resolveSupplier(raw) {
  if (raw.supplierId === "__new") {
    const name = String(raw.newSupplier || "").trim();
    if (!name) throw new Error("Вкажіть назву нового постачальника.");
    let supplier = state.settings.suppliers.find((item) => item.name.toLowerCase() === name.toLowerCase());
    if (!supplier) {
      supplier = { id: uniqueId("sup"), name, edrpou: "", phone: "", email: "" };
      state.settings.suppliers.push(supplier);
    }
    return supplier.name;
  }
  if (raw.supplierId) return supplierName(raw.supplierId);
  const name = String(raw.supplier || "").trim();
  if (!name) throw new Error("Вкажіть постачальника.");
  if (!state.settings.suppliers.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
    state.settings.suppliers.push({ id: uniqueId("sup"), name, edrpou: "", phone: "", email: "" });
  }
  return name;
}

function isLocked(date, locked) {
  return locked || (!role().canEditClosedDay && date <= state.settings.closedDay);
}

function formatMoney(amount, currency = "UAH") {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "UAH" ? 0 : 2
  }).format(Number(amount || 0));
}

function uah(amount, currency) {
  return Number(amount || 0) * Number(state.settings.rates[currency] || 1);
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + Number(days || 0));
  return date.toISOString().slice(0, 10);
}

function uniqueId(prefix) {
  return `${prefix}-${String(Date.now()).slice(-8)}-${Math.random().toString(36).slice(2, 6)}`;
}

function statusPill(status) {
  const map = {
    paid: ["good", "оплачено"],
    partial: ["warn", "частково"],
    overdue: ["danger", "прострочено"],
    draft: ["info", "чернетка"],
    cancelled: ["danger", "скасовано"],
    published: ["good", "опубліковано"],
    needs_sync: ["warn", "потрібен обмін"],
    hidden: ["info", "приховано"],
    moderation: ["warn", "модерація"],
    new_order: ["warn", "нове замовлення"],
    agreed: ["info", "узгоджено"],
    invoiced: ["good", "накладна"],
    payment_expected: ["warn", "очікує оплати"],
    in_storage: ["info", "на зберіганні"],
    reported_sale: ["warn", "звіт продажу"],
    ownership_transferred: ["good", "власність перейшла"],
    available: ["good", "в наявності"],
    responsible_storage: ["info", "відп. зберігання"],
    sold: ["danger", "продано"],
    verified: ["good", "ЄРЗ перевірено"],
    pending: ["warn", "ЄРЗ очікує"],
    ok: ["good", "активно"],
    open: ["warn", "відкрито"],
    planned: ["info", "план"],
    token_needed: ["danger", "потрібен токен"],
    mapping_needed: ["warn", "мапінг"],
    pending_export: ["warn", "BAS очікує"],
    pending_import: ["warn", "імпорт"],
    exported: ["good", "BAS експорт"],
    imported: ["good", "BAS імпорт"]
  };
  const [kind, label] = map[status] || ["info", status || "стан"];
  return `<span class="pill ${kind}">${label}</span>`;
}

function navCount(view) {
  if (view === "sales") return state.invoices.length;
  if (view === "products") return state.products.length;
  if (view === "purchases") return state.purchases.length;
  if (view === "clients") return state.clients.length;
  if (view === "serials") return state.serials.length;
  if (view === "finance") return state.invoices.filter((invoice) => invoice.total > invoice.paid).length;
  if (view === "reports") return "12";
  if (view === "marketplaces") return state.marketplaceOrders.filter((order) => order.status === "new_order").length || state.marketplacePublications.filter((item) => item.status !== "published").length;
  if (view === "integrations") return state.integrations.filter((item) => item.status !== "ok").length;
  if (view === "roles") return state.employees.length;
  return "";
}

function renderShell() {
  $("#nav").innerHTML = NAV.filter(([id]) => canAccessView(id)).map(([id, label, icon]) => `
    <button data-view="${id}" class="${state.currentView === id ? "active" : ""}">
      <span class="nav-icon">${icon}</span>
      <span>${label}</span>
      <span class="nav-count">${navCount(id)}</span>
    </button>
  `).join("");

  const employee = currentEmployee();
  state.currentRole = employee?.roleName || state.currentRole;
  state.currentManager = employee?.name || state.currentManager;
  state.managers = state.employees.filter((item) => item.active).map((item) => item.name);
  $$(".toolbar .field.compact").forEach((element) => element.remove());
  if (!$("#user-badge")) {
    $(".toolbar")?.insertAdjacentHTML("afterbegin", '<div class="session-user" id="user-badge"></div><button class="secondary" id="logout-button" type="button">Змінити користувача</button>');
  }
  const badge = $("#user-badge");
  if (badge) {
    badge.innerHTML = `<strong>${escapeHtml(employee?.name || "-")}</strong><small>${escapeHtml(employee?.roleName || "-")}</small>`;
  }

  const navItem = NAV.find(([id]) => id === state.currentView);
  $("#page-title").textContent = navItem ? navItem[1] : "CRM";
}

function option(value, label, selected = false) {
  return `<option value="${escapeHtml(value)}" ${selected ? "selected" : ""}>${escapeHtml(label)}</option>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fieldSuggestions(input) {
  const key = `${input.name || ""} ${input.placeholder || ""}`.toLowerCase();
  const all = [
    ...state.clients.map((client) => client.name),
    ...state.clients.map((client) => client.phone || ""),
    ...state.clients.map((client) => client.email || ""),
    ...state.products.map((product) => product.model),
    ...state.products.map((product) => product.brand),
    ...state.products.map((product) => product.barcode),
    ...state.products.map((product) => product.supplierSku),
    ...state.products.map((product) => product.internalCode),
    ...state.settings.suppliers.map((supplier) => supplier.name),
    ...state.warehouses.map((warehouse) => warehouse.name),
    ...state.managers,
    ...state.settings.cashArticles,
    ...state.settings.expenseArticles,
    ...state.settings.delivery,
    ...state.serials.map((serial) => serial.serial),
    ...state.marketplacePublications.map((publication) => publication.sku),
    ...state.marketplaceOrders.map((order) => order.externalOrderId)
  ];
  if (key.includes("client") || key.includes("клієнт") || key.includes("покуп")) return uniqueList(state.clients.map((client) => client.name));
  if (key.includes("phone") || key.includes("тел")) return uniqueList(state.clients.map((client) => client.phone));
  if (key.includes("email")) return uniqueList(state.clients.map((client) => client.email));
  if (key.includes("supplier") || key.includes("постач")) return uniqueList(state.settings.suppliers.map((supplier) => supplier.name));
  if (key.includes("barcode") || key.includes("qr") || key.includes("штрих")) return uniqueList(state.products.map((product) => product.barcode));
  if (key.includes("sku") || key.includes("артикул")) return uniqueList([...state.products.map((product) => product.supplierSku), ...state.marketplacePublications.map((publication) => publication.sku)]);
  if (key.includes("code") || key.includes("код")) return uniqueList(state.products.map((product) => product.internalCode));
  if (key.includes("model") || key.includes("модель")) return uniqueList(state.products.map((product) => product.model));
  if (key.includes("brand") || key.includes("бренд")) return uniqueList(state.products.map((product) => product.brand));
  if (key.includes("manager") || key.includes("менедж")) return uniqueList(state.managers);
  return uniqueList(all).slice(0, 80);
}

function attachFieldSuggestions() {
  let host = $("#crm-suggestions");
  if (!host) {
    host = document.createElement("div");
    host.id = "crm-suggestions";
    document.body.appendChild(host);
  }
  const datalists = [];
  $$("input").forEach((input, index) => {
    if (["date", "number", "file", "checkbox", "radio", "password", "hidden"].includes(input.type) || input.disabled || input.readOnly) return;
    const values = fieldSuggestions(input);
    if (!values.length) return;
    const id = `crm-suggest-${index}`;
    input.setAttribute("list", id);
    datalists.push(`<datalist id="${id}">${values.map((value) => `<option value="${escapeHtml(value)}"></option>`).join("")}</datalist>`);
  });
  host.innerHTML = datalists.join("");
}

function renderLogin() {
  document.body.classList.add("auth-locked");
  $(".app-shell")?.setAttribute("aria-hidden", "true");
  let screen = $("#login-screen");
  if (!screen) {
    screen = document.createElement("main");
    screen.id = "login-screen";
    document.body.prepend(screen);
  }
  screen.innerHTML = `
    <section class="login-card">
      <div>
        <span class="brand-mark">AC</span>
        <h1>Вхід до Arms CRM</h1>
        <p class="muted">Введіть логін і пароль працівника.</p>
      </div>
      <form class="form-grid" data-action="login">
        <label class="field full"><span>Логін</span><input name="login" autocomplete="username" required autofocus></label>
        <label class="field full"><span>Пароль</span><input name="password" type="password" autocomplete="current-password" required></label>
        <button class="primary" type="submit">Увійти</button>
      </form>
      <p class="notice small">Перший demo-вхід адміністратора: логін <strong>admin</strong>, пароль <strong>admin</strong>. Після входу змініть паролі працівників у розділі “Ролі”.</p>
    </section>
  `;
}

function clearLoginScreen() {
  document.body.classList.remove("auth-locked");
  $(".app-shell")?.removeAttribute("aria-hidden");
  $("#login-screen")?.remove();
}

function render() {
  if (!isAuthenticated()) {
    authEmployeeId = "";
    sessionStorage.removeItem("arms-crm-auth-employee-id");
    renderLogin();
    saveState();
    return;
  }
  clearLoginScreen();
  activateEmployeeSession(authenticatedEmployee());
  if (!canAccessView(state.currentView)) state.currentView = "dashboard";
  renderShell();
  const viewMap = {
    dashboard: renderDashboard,
    sales: renderSales,
    products: renderProducts,
    purchases: renderPurchases,
    serials: renderSerials,
    warehouse: renderWarehouse,
    b2b: renderB2B,
    clients: renderClients,
    finance: renderFinance,
    reports: renderReports,
    marketplaces: renderMarketplaces,
    integrations: renderIntegrations,
    settings: renderSettings,
    roles: renderRoles
  };
  $("#app").innerHTML = (viewMap[state.currentView] || renderDashboard)();
  if (state.currentView === "products") renderProductPhotoPreview();
  attachFieldSuggestions();
  prepareDecimalInputs($("#app"));
  applyRoleFieldLocks($("#app"));
  saveState();
}

function totals() {
  const receivable = state.invoices.reduce((sum, invoice) => sum + Math.max(invoice.total - invoice.paid, 0), 0);
  const paid = state.payments.reduce((sum, payment) => sum + uah(payment.amount, payment.currency), 0);
  const stockValue = inventoryRows().reduce((sum, row) => sum + row.valueUAH, 0);
  const weaponAvailable = state.serials.filter((serial) => serial.status === "available").length;
  return { receivable, paid, stockValue, weaponAvailable };
}

function renderDashboard() {
  const t = totals();
  return `
    <section class="grid four section-band">
      <article class="card metric info"><span>Дебіторка</span><strong>${formatMoney(t.receivable)}</strong><small>Прив'язана до клієнтів, менеджерів та накладних.</small></article>
      <article class="card metric good"><span>Отримані оплати</span><strong>${formatMoney(t.paid)}</strong><small>Каса, банк, валютні платежі з курсом дня.</small></article>
      <article class="card metric warn"><span>Залишки у собівартості</span><strong>${formatMoney(t.stockValue)}</strong><small>Конвертація з валюти приходу у UAH.</small></article>
      <article class="card metric danger"><span>Серійні одиниці в наявності</span><strong>${t.weaponAvailable}</strong><small>Заборонено продаж зброї без серії та дозволу.</small></article>
    </section>

    <section class="grid two">
      <div class="panel">
        <div class="split">
          <h2>Контроль операцій</h2>
          <span class="pill info">Закритий день: ${state.settings.closedDay}</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Документ</th><th>Дата</th><th>Клієнт</th><th>Канал</th><th>Сума</th><th>Стан</th></tr></thead>
            <tbody>
              ${state.invoices.map((invoice) => `
                <tr>
                  <td><strong>${invoice.id}</strong><br><span class="small muted">${firmName(invoice.firmId)}</span></td>
                  <td>${invoice.date}</td>
                  <td>${clientName(invoice.clientId)}</td>
                  <td>${invoice.channel}</td>
                  <td>${formatMoney(invoice.total, invoice.currency)}<br><span class="small muted">борг ${formatMoney(invoice.total - invoice.paid, invoice.currency)}</span></td>
                  <td>${statusPill(invoice.status)} ${isLocked(invoice.date, invoice.locked) ? '<span class="pill danger">заблоковано</span>' : ""}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="panel">
        <h2>Журнал подій</h2>
        <div class="timeline">
          ${state.audit.slice(0, 8).map((item) => `
            <div class="timeline-item">
              <strong>${item.action}</strong>
              <span class="small muted">${item.at} · ${item.actor}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderSales() {
  const selectedProduct = byId(state.products, saleDraft.productId) || state.products[0];
  const modelSerials = selectedProduct.type === "weapon" ? serialsForProduct(selectedProduct) : [];
  const selectableSerials = modelSerials.filter(serialIsSelectable);
  const selectedSerialIds = saleDraft.serialIds || (saleDraft.serialId ? [saleDraft.serialId] : []);
  const canSellWeapon = selectedProduct.type !== "weapon" || role().canSellWeapon;
  const serialOptions = selectedProduct.type !== "weapon"
    ? ""
    : modelSerials.length
      ? modelSerials.map((serial) => serialOption(serial, selectedSerialIds)).join("")
      : '<option disabled>Немає серій для цієї моделі. Спочатку проведіть прихід.</option>';
  const serialNotice = selectedProduct.type === "weapon"
    ? `<div class="notice ${selectableSerials.length ? "" : "warn"} small full">
        Серії для цієї картки товару: <strong>${modelSerials.length}</strong>, доступні до продажу: <strong>${selectableSerials.length}</strong>.
        ${modelSerials.length ? "Чужі серії не показуються і не приймаються. Продані, неактуальні або без перевірки ЄРЗ заблоковані." : "Для нової зброї серійні номери з'являться тут тільки після приходу або BAS/BAF імпорту саме по цій картці товару."}
        ${selectableSerials.length < Number(saleDraft.qty || 1) ? '<br><button class="ghost" type="button" data-view="purchases">Провести прихід серій</button>' : ""}
      </div>`
    : "";
  return `
    <section class="grid two section-band">
      <div class="panel">
        <div class="split">
          <h2>Нова накладна</h2>
          <span class="pill ${canSellWeapon ? "good" : "danger"}">${canSellWeapon ? "роль дозволяє продаж" : "роль блокує зброю"}</span>
        </div>
        <form class="form-grid" data-action="create-invoice">
          <label class="field"><span>Тип документа</span><select name="documentType">${state.settings.documentTypes.map((item) => option(item, item, item === "Видаткова накладна")).join("")}</select></label>
          <label class="field"><span>Дата документа</span><input name="date" type="date" value="${today}"></label>
          <label class="field"><span>Договір / підстава</span><input name="contract" placeholder="договір, рахунок, заявка"></label>
          <label class="field"><span>Склад списання</span><select name="warehouseId">${state.warehouses.map((warehouse) => option(warehouse.id, warehouse.name, warehouse.id === "wh-store")).join("")}</select></label>
          <label class="field"><span>Фірма</span><select name="firmId">${state.settings.firms.map((firm) => option(firm.id, firm.name)).join("")}</select></label>
          <label class="field"><span>Канал</span><select name="channel">${["Магазин", "Сайт", "Rozetka", "Prom", "Epicentr", "Allo", "B2B"].map((item) => option(item, item, item === "Магазин")).join("")}</select></label>
          <label class="field wide"><span>Клієнт</span><select name="clientId">${state.clients.map((client) => option(client.id, client.name)).join("")}</select></label>
          <label class="field"><span>Прайс</span><select name="priceType">${state.settings.priceTypes.map((item) => option(item, item)).join("")}</select></label>
          <label class="field"><span>QR / штрихкод</span><input name="barcode" data-sale-barcode required value="${escapeHtml(saleDraft.barcode || selectedProduct.barcode || "")}" placeholder="скан або введення коду"></label>
          <label class="field wide"><span>Товар</span><select name="productId" data-sale-product>${state.products.map((product) => option(product.id, `${product.type === "weapon" ? "Зброя" : "Товар"} · ${product.brand} ${product.model}`, product.id === selectedProduct.id)).join("")}</select></label>
          <label class="field"><span>Кількість</span><input name="qty" type="number" min="1" value="${saleDraft.qty}"></label>
          <label class="field"><span>Ціна</span><input name="price" type="number" min="0" value="${selectedProduct.price}"></label>
          <label class="field"><span>Знижка %</span><input name="discount" type="number" min="0" max="100" value="0"></label>
          <label class="field"><span>Валюта</span><select name="currency">${Object.keys(state.settings.rates).map((currency) => option(currency, currency, currency === selectedProduct.currency)).join("")}</select></label>
          <label class="field wide"><span>Серійні номери</span><select class="serial-select" name="serialIds" multiple ${selectedProduct.type === "weapon" ? "" : "disabled"}>${serialOptions}</select></label>
          ${serialNotice}
          <label class="field"><span>Номер дозволу</span><input name="permitNumber" value="${escapeHtml(saleDraft.permitNumber)}" ${selectedProduct.type === "weapon" ? "required" : "disabled"} placeholder="обов'язково для зброї"></label>
          <label class="field"><span>Дата видачі дозволу</span><input name="permitDate" type="date" value="${escapeHtml(saleDraft.permitDate)}" ${selectedProduct.type === "weapon" ? "required" : "disabled"}></label>
          <label class="field"><span>Доставка</span><select name="delivery">${state.settings.delivery.map((item) => option(item, item)).join("")}</select></label>
          <label class="field"><span>ТТН</span><input name="ttn" placeholder="номер накладної"></label>
          <label class="field"><span>Платник доставки</span><select name="deliveryPayer"><option>Клієнт</option><option>Компанія</option><option>Маркетплейс</option></select></label>
          <label class="field"><span>Стаття коштів</span><select name="cashArticle">${state.settings.cashArticles.map((item) => option(item, item)).join("")}</select></label>
          <label class="field"><span>Оплата</span><select name="paymentMode">${["Оплачено", "Попередня оплата часткова", "Відтермінування"].map((item) => option(item, item)).join("")}</select></label>
          <label class="field"><span>До сплати</span><input name="paid" type="number" min="0" value="0"></label>
          <label class="field"><span>Відтермінування, днів</span><input name="dueDays" type="number" min="0" value="${state.settings.defaultDueDays}"></label>
          <label class="field"><span>Відповідальний</span><select name="manager">${employeeOptions(state.currentManager)}</select></label>
          <label class="field full"><span>Бухоблік</span><select name="accounting"><option value="true">Позначити для BAS/BAF</option><option value="false">Не передавати в бухоблік</option></select></label>
          <label class="field full"><span>Коментар</span><textarea name="comment" placeholder="умови, резерв, примітки до документа"></textarea></label>
          <button class="primary" type="submit">Створити накладну</button>
        </form>
        <p class="notice warn small">Для типу “Зброя” кількість у документі має дорівнювати кількості вибраних серій. Продані або неактуальні серії показані у списку, але заблоковані для повторного вибору.</p>
      </div>

      <div class="panel">
        <h2>Швидкий роздріб</h2>
        <div class="grid two">
          ${state.products.map((product) => `
            <article class="card stack">
              <div>
                <strong>${product.brand} ${product.model}</strong>
                <p class="small muted">${product.type === "weapon" ? `${product.caliber} · серійний облік` : "звичайний товар без номерного обліку"}</p>
              </div>
              <div class="split">
                <span>${formatMoney(product.price, product.currency)}</span>
                <button class="secondary" data-quick-product="${product.id}">У форму</button>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="panel">
      <h2>Накладні</h2>
      ${invoiceTable(state.invoices)}
    </section>
  `;
}

function invoiceTable(invoices) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Номер</th><th>Фірма</th><th>Клієнт</th><th>Менеджер</th><th>Канал</th><th>Сума / оплата</th><th>Доставка</th><th>Дії</th></tr></thead>
        <tbody>
          ${invoices.map((invoice) => `
            <tr>
              <td><strong>${invoice.id}</strong><br><span class="small muted">${invoice.date} · ${invoice.dueDate}</span></td>
              <td>${firmName(invoice.firmId)}<br>${invoice.accounting ? '<span class="pill info">BAS/BAF</span>' : '<span class="pill">упр. облік</span>'}</td>
              <td>${clientName(invoice.clientId)}</td>
              <td>${invoice.manager}</td>
              <td>${invoice.channel}</td>
              <td>${formatMoney(invoice.total, invoice.currency)}<br><span class="small muted">оплачено ${formatMoney(invoice.paid, invoice.currency)}</span><br>${statusPill(invoice.status)}</td>
              <td>${invoice.delivery}<br><span class="small muted">${invoice.ttn || "без ТТН"}</span></td>
              <td class="row-actions">
                <button class="ghost" data-open-invoice="${invoice.id}">Деталі</button>
                <button class="ghost" data-pay-invoice="${invoice.id}" ${invoice.total <= invoice.paid ? "disabled" : ""}>Оплата</button>
                <button class="danger" data-lock-invoice="${invoice.id}" ${isLocked(invoice.date, invoice.locked) ? "disabled" : ""}>Закрити</button>
                <button class="danger" data-cancel-invoice="${invoice.id}" ${invoice.status === "cancelled" ? "disabled" : ""}>Скасувати</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderProducts() {
  return `
    <section class="grid two section-band">
      <div class="panel">
        <h2>Додати товар</h2>
        <form class="form-grid" data-action="create-product">
          <label class="field"><span>Тип</span><select name="type"><option value="regular">Звичайний товар</option><option value="weapon">Зброя</option></select></label>
          ${dictionaryField("categories", "Категорія", "categoryValue", "newCategory", { placeholder: "нова категорія / група" })}
          ${dictionaryField("units", "Одиниця", "unitValue", "newUnit", { placeholder: "нова одиниця виміру" })}
          ${dictionaryField("brands", "Бренд", "brandValue", "newBrand", { placeholder: "новий бренд" })}
          ${dictionaryField("models", "Модель", "modelValue", "newModel", { wide: true, placeholder: "нова модель" })}
          ${dictionaryField("calibers", "Калібр", "caliberValue", "newCaliber", { required: false, selected: "без калібру", placeholder: "новий калібр для зброї" })}
          <label class="field"><span>ЄРЗ</span><select name="erzRequired"><option value="false">ні</option><option value="true">так</option></select></label>
          <div class="field wide">
            <span>Штрих / QR</span>
            <div class="input-action">
              <input name="barcode" data-product-barcode required placeholder="скануйте або створіть код">
              <button class="ghost" type="button" data-generate-product-barcode>Створити</button>
            </div>
          </div>
          ${dictionaryField("supplierSkus", "Артикул постач.", "supplierSkuValue", "newSupplierSku", { placeholder: "новий артикул постачальника" })}
          ${dictionaryField("internalCodes", "Внутр. код", "internalCodeValue", "newInternalCode", { placeholder: "новий внутрішній код" })}
          ${dictionaryField("uktzed", "УКТЗЕД", "uktzedValue", "newUktzed", { placeholder: "новий код УКТЗЕД" })}
          <label class="field"><span>Ціна</span><input name="price" type="number" min="0" value="0"></label>
          <label class="field"><span>Валюта ціни</span><select name="currency">${Object.keys(state.settings.rates).map((currency) => option(currency, currency, currency === "UAH")).join("")}</select></label>
          <label class="field"><span>Собівартість</span><input name="cost" type="number" min="0" value="0"></label>
          <label class="field"><span>Валюта приходу</span><select name="costCurrency">${Object.keys(state.settings.rates).map((currency) => option(currency, currency, currency === "USD")).join("")}</select></label>
          <label class="field"><span>Мін. залишок</span><input name="minStock" type="number" min="0" value="0"></label>
          <label class="field"><span>Поставка, днів</span><input name="leadTimeDays" type="number" min="0" value="14"></label>
          <label class="field wide"><span>SKU маркетплейсу</span><input name="marketplaceSku" placeholder="Rozetka/Prom/Epicentr/Allo"></label>
          <label class="field full"><span>Опис / характеристики</span><textarea name="description" placeholder="опис та характеристики для сайту і маркетплейсів"></textarea></label>
          <div class="field full">
            <span>Фото товару</span>
            <input type="file" name="photos" data-product-photos accept="${MARKETPLACE_IMAGE_EXTENSIONS}" multiple>
            <p class="notice small">До 6 фото з комп'ютера. Дозволені формати: JPG/JPEG або PNG. Для синхронізації фото оптимізуються у JPG з білим фоном.</p>
          </div>
          <div id="product-photo-preview" class="photo-preview full">
            <div class="photo-empty">Фото ще не додані. Дозволено до 6 файлів JPG/JPEG або PNG.</div>
          </div>
          <button class="primary" type="submit">Додати товар</button>
        </form>
      </div>
      <div class="panel">
        <h2>Правила структури</h2>
        <div class="stack">
          <p class="notice">Зброя: модель, калібр, бренд, ЄРЗ так/ні, QR/штрихкод, артикул постачальника, внутрішній код моделі, УКТЗЕД і обов'язковий серійний номер кожної одиниці.</p>
          <p class="notice">Звичайні товари: модель, бренд, QR/штрихкод, артикул постачальника, внутрішній код моделі, УКТЗЕД. Облік кількісний без серій.</p>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="split">
        <h2>Каталог</h2>
        <div class="segmented" data-filter-products>
          <button class="active" data-type="all">Усі</button>
          <button data-type="weapon">Зброя</button>
          <button data-type="regular">Звичайні</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Тип</th><th>Фото</th><th>Бренд / модель</th><th>Категорія</th><th>Калібр</th><th>Коди</th><th>Ціна</th><th>Собівартість</th><th>Залишок</th></tr></thead>
          <tbody id="products-body">${productRows(state.products)}</tbody>
        </table>
      </div>
    </section>
  `;
}

function productRows(products) {
  return products.map((product) => {
    const qty = product.type === "weapon"
      ? state.serials.filter((serial) => serial.productId === product.id && serial.status !== "sold").length
      : state.stock.filter((row) => row.productId === product.id).reduce((sum, row) => sum + row.qty, 0);
    return `
      <tr data-product-type="${product.type}">
        <td>${product.type === "weapon" ? '<span class="pill danger">зброя</span>' : '<span class="pill good">звичайний</span>'}<br>${product.erzRequired ? '<span class="pill info">ЄРЗ</span>' : ""}</td>
        <td>${productPhotoThumbs(product)}</td>
        <td><strong>${product.brand}</strong><br>${product.model}<br><span class="small muted">${product.description || ""}</span></td>
        <td>${product.category || "-"}<br><span class="small muted">мін: ${product.minStock || 0} · ${product.leadTimeDays || 0} дн.</span></td>
        <td>${product.caliber || "-"}</td>
        <td><span class="small muted">QR/штрих:</span> ${product.barcode}<br><span class="small muted">арт:</span> ${product.supplierSku}<br><span class="small muted">внутр:</span> ${product.internalCode}<br><span class="small muted">УКТЗЕД:</span> ${product.uktzed}</td>
        <td>${formatMoney(product.price, product.currency)}</td>
        <td>${formatMoney(product.cost, product.costCurrency)}<br><span class="small muted">${formatMoney(uah(product.cost, product.costCurrency))}</span></td>
        <td><strong>${qty}</strong></td>
      </tr>
    `;
  }).join("");
}

function renderPurchases() {
  const weapons = state.products.filter((product) => product.type === "weapon");
  const pendingBas = state.purchases.filter((purchase) => purchase.accounting && purchase.basStatus !== "exported").length;
  return `
    <section class="grid two section-band">
      <div class="panel">
        <div class="split">
          <h2>Прихід товару</h2>
          <span class="pill danger">серії зброї = кількість</span>
        </div>
        <form class="form-grid" data-action="create-purchase">
          <label class="field"><span>Тип документа</span><select name="documentType"><option>Прибуткова накладна</option><option>Імпорт BAS/BAF</option><option>Акт приймання</option><option>Коригування приходу</option></select></label>
          <label class="field"><span>Дата</span><input name="date" type="date" value="${today}" required></label>
          <label class="field"><span>Фірма</span><select name="firmId">${state.settings.firms.map((firm) => option(firm.id, firm.name)).join("")}</select></label>
          <label class="field"><span>Склад</span><select name="warehouseId">${state.warehouses.map((warehouse) => option(warehouse.id, warehouse.name, warehouse.id === "wh-main")).join("")}</select></label>
          <label class="field wide"><span>Постачальник</span><select name="supplierId">${supplierOptions()}</select></label>
          <label class="field wide"><span>Новий постачальник</span><input name="newSupplier" placeholder="заповнити, якщо обрано + Новий постачальник"></label>
          <label class="field"><span>Документ постач.</span><input name="supplierDoc" required placeholder="номер документа"></label>
          <label class="field"><span>QR / штрихкод</span><input name="barcode" data-purchase-barcode required placeholder="скан або введення коду"></label>
          <label class="field wide"><span>Позиція</span><select name="productId">${state.products.map((product) => option(product.id, `${product.type === "weapon" ? "Зброя" : "Товар"} · ${product.brand} ${product.model}`)).join("")}</select></label>
          <label class="field"><span>Кількість</span><input name="qty" type="number" min="1" value="1" required></label>
          <label class="field"><span>Ціна приходу</span><input name="cost" type="number" min="0" step="0.01" value="0"></label>
          <label class="field"><span>Валюта</span><select name="currency">${Object.keys(state.settings.rates).map((currency) => option(currency, currency)).join("")}</select></label>
          <label class="field"><span>ЄРЗ для серій</span><select name="erzStatus"><option value="pending">Очікує</option><option value="verified">Перевірено</option></select></label>
          <label class="field"><span>Актуальність</span><select name="actual"><option value="true">актуальні</option><option value="false">тимчасово неактуальні</option></select></label>
          <label class="field full"><span>Серійні номери зброї</span><textarea name="serials" placeholder="Для зброї: один серійний номер на рядок. Кількість рядків має дорівнювати кількості документа."></textarea></label>
          <label class="field full"><span>Бухоблік</span><select name="accounting"><option value="true">Позначити для BAS/BAF</option><option value="false">Не передавати в бухоблік</option></select></label>
          <label class="field full"><span>Коментар</span><textarea name="comment" placeholder="митна декларація, умови поставки, примітки"></textarea></label>
          <button class="primary" type="submit">Провести прихід</button>
        </form>
        <p class="notice warn small">Якщо позиція має тип “Зброя”, документ не проведеться без серій. Система перевіряє, що кількість серій дорівнює кількості, серії не дублюються в документі та не існують у CRM.</p>
      </div>

      <div class="panel">
        <h2>BAS/BAF імпорт та експорт</h2>
        <div class="grid two section-band">
          <article class="card metric info"><span>До експорту BAS</span><strong>${pendingBas}</strong><small>Приходи, позначені для бухобліку.</small></article>
          <article class="card metric good"><span>Зброя в приходах</span><strong>${state.purchases.filter((purchase) => purchase.productType === "weapon").reduce((sum, purchase) => sum + purchase.qty, 0)}</strong><small>Кожна одиниця має серію.</small></article>
        </div>
        <div class="inline-actions section-band">
          <button class="secondary" data-export-bas-purchases>Експорт BAS/BAF JSON</button>
          <button class="ghost" data-bas-import-demo>Імпорт demo BAS</button>
        </div>
        <form class="form-grid" data-action="import-bas-purchases">
          <label class="field full"><span>Імпорт із BAS/BAF JSON</span><textarea name="basPayload" placeholder='{"purchases":[{"date":"2026-05-23","supplier":"BAS supplier","supplierDoc":"BAS-1","firmId":"vat","warehouseId":"wh-main","productId":"p-100","qty":1,"cost":1500,"currency":"USD","serials":["BAS-SERIAL-001"]}]}'></textarea></label>
          <button class="primary" type="submit">Імпортувати прихід</button>
        </form>
        <p class="notice small">Production-обмін із BAS/BAF має йти через API/обробку, але тут уже закладена структура: документи, позиції, серії, склад, фірма, валюта, ознака бухобліку.</p>
      </div>
    </section>

    <section class="panel section-band">
      <h2>Проведені приходи</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Документ</th><th>Постачальник</th><th>Позиція</th><th>Склад</th><th>Кількість</th><th>Серії</th><th>Собівартість</th><th>BAS/BAF</th><th>Дії</th></tr></thead>
          <tbody>
            ${state.purchases.map((purchase) => `
              <tr>
                <td><strong>${purchase.id}</strong><br><span class="small muted">${purchase.date} · ${purchase.supplierDoc || "-"}</span></td>
                <td>${purchase.supplier}<br><span class="small muted">${firmName(purchase.firmId)}</span></td>
                <td>${productName(purchase.productId)}<br><span class="small muted">${purchase.productType === "weapon" ? "серійний облік" : "кількісний облік"}</span></td>
                <td>${warehouseName(purchase.warehouseId)}</td>
                <td>${purchase.qty}</td>
                <td>${purchase.serials?.length ? purchase.serials.map((serial) => `<span class="pill info">${serial}</span>`).join(" ") : "-"}</td>
                <td>${formatMoney(purchase.cost, purchase.currency)}<br><span class="small muted">${formatMoney(uah(purchase.cost, purchase.currency))} / од.</span></td>
                <td>${purchase.accounting ? statusPill(purchase.basStatus || "pending_export") : '<span class="pill">упр. облік</span>'}</td>
                <td class="row-actions"><button class="ghost" data-export-one-purchase="${purchase.id}">JSON</button><button class="secondary" data-mark-purchase-exported="${purchase.id}" ${purchase.basStatus === "exported" ? "disabled" : ""}>BAS ok</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <h2>Актуальні серії зброї з приходів</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Серія</th><th>Модель</th><th>Прихід</th><th>Склад</th><th>Актуальність</th><th>BAS</th><th>ЄРЗ</th></tr></thead>
          <tbody>
            ${state.serials.filter((serial) => weapons.some((product) => product.id === serial.productId)).map((serial) => `
              <tr>
                <td><strong>${serial.serial}</strong></td>
                <td>${productName(serial.productId)}</td>
                <td>${serial.purchaseId || "-"}</td>
                <td>${warehouseName(serial.warehouseId)}</td>
                <td>${serial.actual ? '<span class="pill good">актуальна</span>' : '<span class="pill danger">неактуальна</span>'}</td>
                <td>${serial.basSynced ? '<span class="pill good">BAS ok</span>' : '<span class="pill warn">BAS очікує</span>'}</td>
                <td>${statusPill(serial.erzStatus)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderSerials() {
  const weapons = state.products.filter((product) => product.type === "weapon");
  return `
    <section class="grid two section-band">
      <div class="panel">
        <h2>Ручне коригування серії</h2>
        <form class="form-grid" data-action="create-serial">
          <label class="field wide"><span>Модель зброї</span><select name="productId">${weapons.map((product) => option(product.id, `${product.brand} ${product.model}`)).join("")}</select></label>
          <label class="field"><span>Серійний номер</span><input name="serial" required></label>
          <label class="field"><span>Склад</span><select name="warehouseId">${state.warehouses.map((warehouse) => option(warehouse.id, warehouse.name)).join("")}</select></label>
          <label class="field"><span>Стан ЄРЗ</span><select name="erzStatus"><option value="pending">Очікує</option><option value="verified">Перевірено</option></select></label>
          <label class="field"><span>Статус</span><select name="status"><option value="available">В наявності</option><option value="responsible_storage">Відповідальне зберігання</option></select></label>
          <label class="field wide"><span>B2B клієнт зберігання</span><select name="clientId"><option value="">Немає</option>${state.clients.filter((client) => client.type === "B2B").map((client) => option(client.id, client.name)).join("")}</select></label>
          <button class="primary" type="submit">Додати серію</button>
        </form>
        <p class="notice warn small">Основний шлях для внесення серій зброї — розділ “Прихід”. Тут залишено ручне коригування для адміністративних виправлень.</p>
      </div>
      <div class="panel">
        <h2>Контроль серій</h2>
        <div class="grid two">
          <article class="card metric good"><span>ЄРЗ перевірено</span><strong>${state.serials.filter((serial) => serial.erzStatus === "verified").length}</strong><small>Дозволено до продажу за наявності дозволу покупця.</small></article>
          <article class="card metric warn"><span>Очікують ЄРЗ</span><strong>${state.serials.filter((serial) => serial.erzStatus === "pending").length}</strong><small>Продаж блокується до перевірки.</small></article>
        </div>
      </div>
    </section>

    <section class="panel">
      <h2>Серійний облік зброї</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Серія</th><th>Модель</th><th>Склад</th><th>Статус</th><th>ЄРЗ</th><th>Клієнт</th><th>Дозвіл</th><th>Дії</th></tr></thead>
          <tbody>
            ${state.serials.map((serial) => `
              <tr>
                <td><strong>${serial.serial}</strong></td>
                <td>${productName(serial.productId)}</td>
                <td>${warehouseName(serial.warehouseId)}</td>
                <td>${statusPill(serial.status)}</td>
                <td>${statusPill(serial.erzStatus)}</td>
                <td>${serial.clientId ? clientName(serial.clientId) : "-"}</td>
                <td>${serial.permitNumber ? `${serial.permitNumber}<br><span class="small muted">${serial.permitDate}</span>` : "-"}</td>
                <td class="row-actions">
                  <button class="ghost" data-verify-serial="${serial.id}" ${serial.erzStatus === "verified" ? "disabled" : ""}>ЄРЗ ok</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function inventoryRows() {
  const rows = [];
  state.products.forEach((product) => {
    if (product.type === "weapon") {
      const grouped = state.serials
        .filter((serial) => serial.productId === product.id && serial.status !== "sold")
        .reduce((acc, serial) => {
          const key = `${serial.warehouseId}:${serial.clientId || ""}`;
          acc[key] = acc[key] || { product, warehouseId: serial.warehouseId, clientId: serial.clientId || "", qty: 0 };
          acc[key].qty += 1;
          return acc;
        }, {});
      Object.values(grouped).forEach((row) => rows.push({ ...row, valueUAH: row.qty * uah(product.cost, product.costCurrency) }));
    } else {
      state.stock.filter((row) => row.productId === product.id).forEach((stockRow) => {
        rows.push({ product, ...stockRow, valueUAH: stockRow.qty * uah(product.cost, product.costCurrency) });
      });
    }
  });
  return rows;
}

function clientResponsibleWarehouse(clientId) {
  let warehouse = state.warehouses.find((item) => item.kind === "client_responsible" && item.clientId === clientId);
  if (!warehouse) {
    const client = byId(state.clients, clientId);
    warehouse = {
      id: uniqueId(`wh-client-${clientId}`),
      name: `Склад клієнта · ${client?.name || clientId}`,
      kind: "client_responsible",
      clientId
    };
    state.warehouses.push(warehouse);
  }
  return warehouse;
}

function isOwnStockRow(row) {
  const warehouse = byId(state.warehouses, row.warehouseId);
  return !row.clientId && !["client_responsible", "responsible"].includes(warehouse?.kind);
}

function stockQtyWhere(productId, predicate) {
  return state.stock
    .filter((row) => row.productId === productId && Number(row.qty || 0) > 0 && predicate(row))
    .reduce((sum, row) => sum + Number(row.qty || 0), 0);
}

function decrementStockWhere(productId, qty, predicate, errorMessage) {
  const amount = Number(qty || 0);
  if (stockQtyWhere(productId, predicate) < amount) {
    throw new Error(errorMessage || "Недостатньо залишку для списання.");
  }
  let remaining = amount;
  const rows = state.stock.filter((row) => row.productId === productId && Number(row.qty || 0) > 0 && predicate(row));
  for (const row of rows) {
    const take = Math.min(Number(row.qty || 0), remaining);
    row.qty -= take;
    remaining -= take;
    if (remaining <= 0) break;
  }
}

function ownAvailableSerialsForProduct(product) {
  return state.serials
    .filter((serial) => serialMatchesProduct(serial, product) && serial.status === "available" && !serial.clientId)
    .filter((serial) => !serialIsSold(serial) && serial.actual !== false)
    .sort((first, second) => first.serial.localeCompare(second.serial, "uk"));
}

function clientStorageSerials(clientId, productId = "", includeSold = false) {
  return state.serials
    .filter((serial) => serial.clientId === clientId)
    .filter((serial) => !productId || serial.productId === productId)
    .filter((serial) => includeSold || serial.status === "responsible_storage")
    .sort((first, second) => Number(first.status === "sold") - Number(second.status === "sold") || first.serial.localeCompare(second.serial, "uk"));
}

function b2bSerialOption(serial, selectedIds = [], mode = "sale") {
  const product = byId(state.products, serial.productId);
  const canSelect = mode === "shipment"
    ? serial.status === "available" && !serial.clientId && !serialIsSold(serial) && serial.actual !== false
    : serial.status === "responsible_storage" && serialIsSelectable(serial);
  const className = canSelect ? "serial-available" : serialIsSold(serial) ? "serial-sold" : "serial-blocked";
  const label = `${serial.serial} · ${product?.model || "модель"} · ${warehouseName(serial.warehouseId)} · ${serialStatusText(serial)}`;
  return `<option value="${escapeHtml(serial.id)}" ${selectedIds.includes(serial.id) ? "selected" : ""} ${canSelect ? "" : "disabled"} class="${className}">${escapeHtml(label)}</option>`;
}

function responsibleDocSoldQty(doc) {
  if (doc.soldQty !== undefined) return Number(doc.soldQty || 0);
  return (doc.serialIds || []).filter((serialId) => {
    const serial = byId(state.serials, serialId);
    return serial ? serialIsSold(serial) : false;
  }).length;
}

function responsibleDocRemainingQty(doc) {
  return Math.max(Number(doc.qty || 0) - responsibleDocSoldQty(doc), 0);
}

function responsibleDocStatus(doc) {
  const sold = responsibleDocSoldQty(doc);
  if (responsibleDocRemainingQty(doc) <= 0 && Number(doc.qty || 0) > 0) return "ownership_transferred";
  if (sold > 0) return "reported_sale";
  return doc.status || "in_storage";
}

function ownershipLabel(doc) {
  return responsibleDocStatus(doc) === "ownership_transferred"
    ? "перейшла клієнту після продажу"
    : "наша до продажу клієнтом";
}

function responsibleStorageRows(clientId = "") {
  return state.responsibleStorageDocs
    .filter((doc) => !clientId || doc.clientId === clientId)
    .map((doc) => ({
      ...doc,
      client: byId(state.clients, doc.clientId),
      product: byId(state.products, doc.productId),
      warehouse: byId(state.warehouses, doc.warehouseId),
      soldQty: responsibleDocSoldQty(doc),
      remainingQty: responsibleDocRemainingQty(doc),
      derivedStatus: responsibleDocStatus(doc)
    }));
}

function clientStorageRows(clientId) {
  return inventoryRows().filter((row) => row.clientId === clientId);
}

function serialBadges(serialIds = []) {
  if (!serialIds.length) return "-";
  return serialIds.map((serialId) => {
    const serial = byId(state.serials, serialId);
    if (!serial) return "";
    const kind = serial.status === "sold" ? "danger" : serial.status === "responsible_storage" ? "info" : "good";
    return `<span class="pill ${kind}">${escapeHtml(serial.serial)}</span>`;
  }).filter(Boolean).join(" ");
}

function productCodes(product) {
  return [product?.barcode, product?.qrCode].filter(Boolean).join(" / ") || "-";
}

function safeFilePart(value) {
  return String(value || "report").replace(/[^a-zA-Z0-9А-Яа-яІіЇїЄєҐґ_-]+/g, "-").replace(/-+/g, "-").slice(0, 80);
}

function renderWarehouse() {
  const rows = inventoryRows();
  return `
    <section class="grid three section-band">
      ${state.warehouses.map((warehouse) => {
        const whRows = rows.filter((row) => row.warehouseId === warehouse.id);
        const qty = whRows.reduce((sum, row) => sum + row.qty, 0);
        const value = whRows.reduce((sum, row) => sum + row.valueUAH, 0);
        return `<article class="card metric ${warehouse.kind === "responsible" ? "info" : "good"}"><span>${warehouse.name}</span><strong>${qty} од.</strong><small>${formatMoney(value)} в обліковій валюті</small></article>`;
      }).join("")}
    </section>

    <section class="panel section-band">
      <div class="split">
        <h2>Інвентаризація та залишки</h2>
        <button class="secondary" data-create-inventory-report>Сформувати звіт</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Товар</th><th>Тип</th><th>Склад</th><th>B2B власник</th><th>Кількість</th><th>Валюта приходу</th><th>Собівартість UAH</th></tr></thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td><strong>${row.product.brand}</strong><br>${row.product.model}</td>
                <td>${row.product.type === "weapon" ? "серійний" : "кількісний"}</td>
                <td>${warehouseName(row.warehouseId)}</td>
                <td>${row.clientId ? clientName(row.clientId) : "-"}</td>
                <td>${row.qty}</td>
                <td>${formatMoney(row.product.cost, row.product.costCurrency)}</td>
                <td>${formatMoney(row.valueUAH)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <h2>Курси валют</h2>
      <form class="form-grid" data-action="update-rates">
        ${Object.entries(state.settings.rates).map(([currency, rate]) => `
          <label class="field"><span>${currency}</span><input name="${currency}" type="number" step="0.01" min="0" value="${rate}"></label>
        `).join("")}
        <button class="primary" type="submit">Оновити курс дня</button>
      </form>
    </section>
  `;
}

function renderB2BLegacy() {
  return `
    <section class="grid three section-band">
      ${state.clients.filter((client) => client.type === "B2B").map((client) => {
        const receivable = state.invoices.filter((invoice) => invoice.clientId === client.id).reduce((sum, invoice) => sum + invoice.total - invoice.paid, 0);
        const storageQty = inventoryRows().filter((row) => row.clientId === client.id).reduce((sum, row) => sum + row.qty, 0);
        return `
          <article class="card stack">
            <div class="split">
              <div>
                <strong>${client.name}</strong>
                <p class="small muted">${client.manager} · ${client.paymentTerms}</p>
              </div>
              ${client.cabinetEnabled ? '<span class="pill good">кабінет</span>' : '<span class="pill">немає</span>'}
            </div>
            <div class="grid two">
              <div><span class="small muted">Дебіторка</span><br><strong>${formatMoney(receivable)}</strong></div>
              <div><span class="small muted">Відп. зберігання</span><br><strong>${storageQty} од.</strong></div>
            </div>
            <button class="secondary" data-open-cabinet="${client.id}">Відкрити кабінет</button>
          </article>
        `;
      }).join("")}
    </section>

    <section class="panel">
      <h2>Кабінет B2B клієнта</h2>
      <p class="notice">Клієнт може бачити власний залишок на відповідальному зберіганні, вести роздрібні продажі через наш інтерфейс, отримувати інвентаризаційний звіт та звіт проплат. Для зброї в кабінеті можна лише резервувати одиницю, продаж підтверджує менеджер із правом продажу зброї.</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Клієнт</th><th>Ліміт</th><th>Умови</th><th>Накладні</th><th>Проплати</th><th>Менеджер</th></tr></thead>
          <tbody>
            ${state.clients.filter((client) => client.type === "B2B").map((client) => {
              const invoices = state.invoices.filter((invoice) => invoice.clientId === client.id);
              const paid = invoices.reduce((sum, invoice) => sum + invoice.paid, 0);
              return `
                <tr>
                  <td><strong>${client.name}</strong></td>
                  <td>${formatMoney(client.creditLimitUAH)}</td>
                  <td>${client.paymentTerms}</td>
                  <td>${invoices.length}</td>
                  <td>${formatMoney(paid)}</td>
                  <td>${client.manager}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderB2B() {
  const b2bClients = state.clients.filter((client) => client.type === "B2B");
  const shipmentProduct = byId(state.products, b2bDraft.shipmentProductId) || state.products[0];
  const saleClient = byId(state.clients, b2bDraft.saleClientId) || b2bClients[0];
  const saleProduct = byId(state.products, b2bDraft.saleProductId) || shipmentProduct || state.products[0];
  const shipmentSerials = shipmentProduct?.type === "weapon" ? ownAvailableSerialsForProduct(shipmentProduct) : [];
  const saleSerials = saleProduct?.type === "weapon" && saleClient ? clientStorageSerials(saleClient.id, saleProduct.id, true) : [];
  const responsibleRows = responsibleStorageRows();
  const openStorageQty = responsibleRows.reduce((sum, row) => sum + row.remainingQty, 0);
  const b2bDebt = state.invoices
    .filter((invoice) => b2bClients.some((client) => client.id === invoice.clientId))
    .reduce((sum, invoice) => sum + invoice.total - invoice.paid, 0);
  const clientSaleStockQty = saleClient && saleProduct
    ? saleProduct.type === "weapon"
      ? clientStorageSerials(saleClient.id, saleProduct.id).filter(serialIsSelectable).length
      : stockQtyWhere(saleProduct.id, (row) => row.clientId === saleClient.id)
    : 0;
  const shipmentAvailableQty = shipmentProduct
    ? shipmentProduct.type === "weapon"
      ? shipmentSerials.length
      : stockQtyWhere(shipmentProduct.id, isOwnStockRow)
    : 0;

  return `
    <section class="grid four section-band">
      <article class="card metric info"><span>B2B клієнти</span><strong>${b2bClients.length}</strong><small>Кабінети, прайси, умови оплати.</small></article>
      <article class="card metric warn"><span>На відповідальному зберіганні</span><strong>${openStorageQty} од.</strong><small>Товар ще наш, але лежить на складах клієнтів.</small></article>
      <article class="card metric good"><span>Документи зберігання</span><strong>${state.responsibleStorageDocs.length}</strong><small>Передачі на склади клієнтів із датами та менеджерами.</small></article>
      <article class="card metric danger"><span>Дебіторка B2B</span><strong>${formatMoney(b2bDebt)}</strong><small>Виникає тільки після продажу клієнтом.</small></article>
    </section>

    <section class="grid two section-band">
      <div class="panel">
        <h2>Відвантаження на відповідальне зберігання</h2>
        <form class="form-grid" data-action="create-responsible-shipment">
          <label class="field"><span>Дата передачі</span><input name="date" type="date" value="${today}"></label>
          <label class="field"><span>B2B клієнт</span><select name="clientId">${b2bClients.map((client) => option(client.id, client.name, client.id === saleClient?.id)).join("")}</select></label>
          <label class="field"><span>QR / штрихкод</span><input name="barcode" data-b2b-shipment-barcode required value="${escapeHtml(b2bDraft.shipmentBarcode || shipmentProduct?.barcode || shipmentProduct?.qrCode || "")}" placeholder="скан товару"></label>
          <label class="field wide"><span>Товар</span><select name="productId" data-b2b-shipment-product>${state.products.map((product) => option(product.id, `${product.type === "weapon" ? "Зброя" : "Товар"} · ${product.brand} ${product.model}`, product.id === shipmentProduct?.id)).join("")}</select></label>
          <label class="field"><span>Кількість</span><input name="qty" type="number" min="1" value="${shipmentProduct?.type === "weapon" ? Math.min(1, shipmentSerials.length || 1) : 1}"></label>
          <label class="field"><span>Термін оплати після продажу, днів</span><input name="paymentDays" type="number" min="0" value="${state.settings.defaultDueDays}"></label>
          <label class="field full"><span>Серійні номери для передачі</span><select class="serial-select" name="serialIds" multiple ${shipmentProduct?.type === "weapon" ? "" : "disabled"}>
            ${shipmentProduct?.type === "weapon"
              ? shipmentSerials.length
                ? shipmentSerials.map((serial) => b2bSerialOption(serial, [], "shipment")).join("")
                : '<option disabled>Немає вільних серій цієї моделі на наших складах.</option>'
              : ""}
          </select></label>
          <label class="field"><span>Відповідальний менеджер</span><select name="manager">${employeeOptions()}</select></label>
          <label class="field full"><span>Коментар</span><textarea name="comment" placeholder="договір, умови зберігання, примітки"></textarea></label>
          <button class="primary" type="submit">Передати на склад клієнта</button>
        </form>
        <p class="notice small">Доступно для передачі по вибраному товару: <strong>${shipmentAvailableQty}</strong>. Для зброї кількість має дорівнювати кількості вибраних серій.</p>
      </div>

      <div class="panel">
        <h2>Звіт продажу клієнтом</h2>
        <form class="form-grid" data-action="create-b2b-client-sale">
          <label class="field"><span>Дата продажу</span><input name="date" type="date" value="${today}"></label>
          <label class="field"><span>B2B клієнт</span><select name="clientId" data-b2b-sale-client>${b2bClients.map((client) => option(client.id, client.name, client.id === saleClient?.id)).join("")}</select></label>
          <label class="field"><span>QR / штрихкод</span><input name="barcode" data-b2b-sale-barcode required value="${escapeHtml(b2bDraft.saleBarcode || saleProduct?.barcode || saleProduct?.qrCode || "")}" placeholder="скан товару"></label>
          <label class="field wide"><span>Товар зі складу клієнта</span><select name="productId" data-b2b-sale-product>${state.products.map((product) => option(product.id, `${product.type === "weapon" ? "Зброя" : "Товар"} · ${product.brand} ${product.model}`, product.id === saleProduct?.id)).join("")}</select></label>
          <label class="field"><span>Кількість продано</span><input name="qty" type="number" min="1" value="${saleProduct?.type === "weapon" ? Math.min(1, clientSaleStockQty || 1) : 1}"></label>
          <label class="field"><span>Ціна продажу</span><input name="price" type="number" min="0" step="0.01" value="${saleProduct?.price || 0}"></label>
          <label class="field"><span>Валюта</span><select name="currency">${Object.keys(state.settings.rates).map((currency) => option(currency, currency, currency === (saleProduct?.currency || "UAH"))).join("")}</select></label>
          <label class="field"><span>Термін оплати, днів</span><input name="paymentDays" type="number" min="0" value="${state.settings.defaultDueDays}"></label>
          <label class="field"><span>Джерело звіту</span><select name="reportSource"><option>Кабінет клієнта</option><option>Звіт клієнта менеджеру</option><option>Імпорт файлу</option></select></label>
          <label class="field full"><span>Серійні номери, продані клієнтом</span><select class="serial-select" name="serialIds" multiple ${saleProduct?.type === "weapon" ? "" : "disabled"}>
            ${saleProduct?.type === "weapon"
              ? saleSerials.length
                ? saleSerials.map((serial) => b2bSerialOption(serial, [], "sale")).join("")
                : '<option disabled>Немає серій цієї моделі на відповідальному зберіганні цього клієнта.</option>'
              : ""}
          </select></label>
          <label class="field"><span>Номер дозволу покупця</span><input name="permitNumber" ${saleProduct?.type === "weapon" ? "required" : "disabled"} placeholder="для зброї"></label>
          <label class="field"><span>Дата видачі дозволу</span><input name="permitDate" type="date" ${saleProduct?.type === "weapon" ? "required" : "disabled"}></label>
          <label class="field"><span>Менеджер</span><select name="manager">${employeeOptions()}</select></label>
          <label class="field full"><span>Коментар</span><textarea name="comment" placeholder="номер звіту клієнта, кінцевий покупець, примітки"></textarea></label>
          <button class="primary" type="submit">Списати продаж клієнта</button>
        </form>
        <p class="notice small">Доступно на складі вибраного клієнта: <strong>${clientSaleStockQty}</strong>. Після проведення створюється накладна і дебіторка з датою оплати.</p>
      </div>
    </section>

    <section class="panel section-band">
      <div class="split">
        <h2>Звіт по відповідальному зберіганню</h2>
        <span class="pill info">власність наша до продажу клієнтом</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Документ</th><th>Дата</th><th>Клієнт / склад</th><th>Товар</th><th>Передано</th><th>Продано</th><th>Залишок</th><th>Серії</th><th>Оплата після продажу</th><th>Статус</th></tr></thead>
          <tbody>
            ${responsibleRows.map((row) => `
              <tr>
                <td><strong>${row.id}</strong><br><span class="small muted">${escapeHtml(row.manager || "-")}</span></td>
                <td>${row.date}</td>
                <td><strong>${row.client?.name || clientName(row.clientId)}</strong><br><span class="small muted">${row.warehouse?.name || warehouseName(row.warehouseId)}</span></td>
                <td>${productName(row.productId)}<br><span class="small muted">${productCodes(row.product)}</span></td>
                <td>${row.qty}</td>
                <td>${row.soldQty}</td>
                <td><strong>${row.remainingQty}</strong></td>
                <td>${serialBadges(row.serialIds)}</td>
                <td>${row.paymentDays || state.settings.defaultDueDays} днів</td>
                <td>${statusPill(row.derivedStatus)}<br><span class="small muted">${ownershipLabel(row)}</span></td>
              </tr>
            `).join("") || '<tr><td colspan="10" class="muted">Документів відповідального зберігання ще немає.</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <h2>Кабінети клієнтів</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Клієнт</th><th>Ліміт</th><th>Умови</th><th>На зберіганні</th><th>Дебіторка</th><th>Менеджер</th><th>Дії</th></tr></thead>
          <tbody>
            ${b2bClients.map((client) => {
              const invoices = state.invoices.filter((invoice) => invoice.clientId === client.id);
              const debt = invoices.reduce((sum, invoice) => sum + invoice.total - invoice.paid, 0);
              const storageQty = clientStorageRows(client.id).reduce((sum, row) => sum + row.qty, 0);
              return `
                <tr>
                  <td><strong>${client.name}</strong><br><span class="small muted">${client.edrpou || "без ЄДРПОУ"} · ${client.address || "адреса не внесена"}</span></td>
                  <td>${formatMoney(client.creditLimitUAH)}</td>
                  <td>${client.paymentTerms}</td>
                  <td>${storageQty} од.</td>
                  <td>${formatMoney(debt)}</td>
                  <td>${client.manager}</td>
                  <td><button class="secondary" data-open-cabinet="${client.id}">Відкрити кабінет</button></td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderClients() {
  return `
    <section class="grid two section-band">
      <div class="panel">
        <h2>Новий клієнт</h2>
        <form class="form-grid" data-action="create-client">
          <label class="field wide"><span>Назва</span><input name="name" required placeholder="юридична або торгова назва"></label>
          <label class="field"><span>Тип</span><select name="type"><option value="B2B">B2B</option><option value="Retail">Роздріб</option><option value="Marketplace">Маркетплейс</option></select></label>
          <label class="field"><span>ЄДРПОУ / ІПН</span><input name="edrpou"></label>
          <label class="field"><span>Телефон</span><input name="phone"></label>
          <label class="field"><span>Email</span><input name="email" type="email"></label>
          <label class="field"><span>Менеджер</span><select name="manager">${employeeOptions()}</select></label>
          <label class="field"><span>Умови оплат</span><select name="paymentTerms"><option>Попередня оплата</option><option>Відтермінування 7 днів</option><option>Відтермінування 14 днів</option><option>Відтермінування 30 днів</option><option>Оплата при продажу</option></select></label>
          <label class="field"><span>Кредитний ліміт</span><input name="creditLimitUAH" type="number" min="0" value="0"></label>
          <label class="field"><span>Валюта</span><select name="currency">${Object.keys(state.settings.rates).map((currency) => option(currency, currency, currency === "UAH")).join("")}</select></label>
          <label class="field"><span>Прайс</span><select name="priceType">${state.settings.priceTypes.map((item) => option(item, item)).join("")}</select></label>
          <label class="field"><span>Податки</span><select name="taxMode"><option>ПДВ</option><option>без ПДВ</option><option>роздріб</option></select></label>
          <label class="field"><span>Кабінет</span><select name="cabinetEnabled"><option value="true">увімкнути</option><option value="false">не створювати</option></select></label>
          <label class="field"><span>Відп. зберігання</span><select name="responsibleStorage"><option value="true">так</option><option value="false">ні</option></select></label>
          <label class="field full"><span>Адреса / доставка</span><textarea name="address" placeholder="адреса, контакт складу, правила відвантаження"></textarea></label>
          <button class="primary" type="submit">Створити клієнта</button>
        </form>
      </div>
      <div class="panel">
        <h2>Контроль клієнтів</h2>
        <div class="grid two">
          <article class="card metric info"><span>B2B клієнти</span><strong>${state.clients.filter((client) => client.type === "B2B").length}</strong><small>Із кабінетами, прайсами та умовами оплат.</small></article>
          <article class="card metric warn"><span>Кредитний ліміт</span><strong>${formatMoney(state.clients.reduce((sum, client) => sum + Number(client.creditLimitUAH || 0), 0))}</strong><small>Контроль відтермінування й дебіторки.</small></article>
        </div>
        <p class="notice small">Клієнтські картки вже містять менеджера, прайс, податковий режим, валюту, кредитний ліміт, кабінет і ознаку відповідального зберігання.</p>
      </div>
    </section>

    <section class="panel">
      <h2>Клієнти</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Клієнт</th><th>Тип</th><th>Контакти</th><th>Менеджер</th><th>Умови</th><th>Прайс / податки</th><th>Кабінет</th></tr></thead>
          <tbody>
            ${state.clients.map((client) => `
              <tr>
                <td><strong>${client.name}</strong><br><span class="small muted">${client.edrpou || "без ЄДРПОУ"} · ${client.address || "адреса не внесена"}</span></td>
                <td>${client.type}</td>
                <td>${client.phone || "-"}<br><span class="small muted">${client.email || "-"}</span></td>
                <td>${client.manager}</td>
                <td>${client.paymentTerms}<br><span class="small muted">ліміт ${formatMoney(client.creditLimitUAH, client.currency || "UAH")}</span></td>
                <td>${client.priceType || "-"}<br><span class="small muted">${client.taxMode || "-"}</span></td>
                <td>${client.cabinetEnabled ? '<span class="pill good">кабінет</span>' : '<span class="pill">немає</span>'} ${client.responsibleStorage ? '<span class="pill info">зберігання</span>' : ""}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderSettings() {
  const canEdit = role().canEditSettings || isAdmin();
  const disabled = canEdit ? "" : "disabled";
  return `
    <section class="grid three section-band">
      <article class="card metric info"><span>Фірми</span><strong>${state.settings.firms.length}</strong><small>ПДВ / без ПДВ, окремий бухоблік.</small></article>
      <article class="card metric good"><span>Склади</span><strong>${state.warehouses.length}</strong><small>Магазин, основний, відповідальне зберігання.</small></article>
      <article class="card metric warn"><span>Статті руху коштів</span><strong>${state.settings.cashArticles.length + state.settings.expenseArticles.length}</strong><small>Для фінансових звітів та витрат.</small></article>
    </section>

    <section class="grid two section-band">
      <div class="panel">
        <h2>Додати склад</h2>
        <form class="form-grid" data-action="create-warehouse">
          <label class="field wide"><span>Назва</span><input name="name" required></label>
          <label class="field"><span>Тип</span><select name="kind"><option value="own">Основний</option><option value="retail">Магазин</option><option value="responsible">Відповідальне зберігання</option></select></label>
          <button class="primary" type="submit" ${disabled}>Додати</button>
        </form>
        <p class="notice ${canEdit ? "" : "warn"} small">${canEdit ? "Поточна роль може змінювати налаштування." : "Налаштування змінює лише адміністратор."}</p>
      </div>
      <div class="panel">
        <h2>Курси та параметри</h2>
        <form class="form-grid" data-action="update-rates">
          ${Object.entries(state.settings.rates).map(([currency, rate]) => `
            <label class="field"><span>${currency}</span><input name="${currency}" type="number" step="0.01" min="0" value="${rate}" ${disabled}></label>
          `).join("")}
          <button class="primary" type="submit" ${disabled}>Оновити</button>
        </form>
      </div>
    </section>

    <section class="grid two">
      <div class="panel">
        <h2>Статті руху коштів</h2>
        <form class="form-grid" data-action="create-cash-article">
          <label class="field wide"><span>Нова стаття</span><input name="article" required ${disabled}></label>
          <button class="primary" type="submit" ${disabled}>Додати</button>
        </form>
        <div class="inline-actions">${state.settings.cashArticles.map((item) => `<span class="pill info">${item}</span>`).join("")}</div>
      </div>
      <div class="panel">
        <h2>Статті витрат</h2>
        <form class="form-grid" data-action="create-expense-article">
          <label class="field wide"><span>Нова стаття</span><input name="article" required ${disabled}></label>
          <button class="primary" type="submit" ${disabled}>Додати</button>
        </form>
        <div class="inline-actions">${state.settings.expenseArticles.map((item) => `<span class="pill warn">${item}</span>`).join("")}</div>
      </div>
    </section>
  `;
}

function cashMovementRows() {
  const inflow = state.payments.map((payment) => ({
    date: payment.date,
    article: state.invoices.find((invoice) => invoice.id === payment.invoiceId)?.cashArticle || "Продаж товарів",
    method: payment.method,
    currency: payment.currency,
    inflow: payment.amount,
    outflow: 0,
    manager: state.invoices.find((invoice) => invoice.id === payment.invoiceId)?.manager || "-"
  }));
  const outflow = state.expenses.map((expense) => ({
    date: expense.date,
    article: expense.article,
    method: expense.method,
    currency: expense.currency,
    inflow: 0,
    outflow: expense.amount,
    manager: expense.manager
  }));
  return [...inflow, ...outflow].sort((a, b) => b.date.localeCompare(a.date));
}

function salesReportRows() {
  const grouped = {};
  state.invoices.forEach((invoice) => {
    invoice.lines.forEach((line) => {
      const product = byId(state.products, line.productId);
      const key = `${line.productId}:${invoice.clientId}:${invoice.manager}`;
      grouped[key] = grouped[key] || { invoiceId: invoice.id, date: invoice.date, product, client: clientName(invoice.clientId), manager: invoice.manager, qty: 0, revenue: 0, cost: 0 };
      grouped[key].qty += Number(line.qty || 0);
      grouped[key].revenue += Number(line.qty || 0) * Number(line.price || 0);
      grouped[key].cost += Number(line.qty || 0) * uah(product?.cost || 0, product?.costCurrency || "UAH");
    });
  });
  return Object.values(grouped);
}

function stockAnalysisRows() {
  return state.products.map((product) => {
    const ending = inventoryRows().filter((row) => row.product.id === product.id).reduce((sum, row) => sum + row.qty, 0);
    const sold = state.invoices.flatMap((invoice) => invoice.lines).filter((line) => line.productId === product.id).reduce((sum, line) => sum + Number(line.qty || 0), 0);
    const receipt = Math.max(Number(product.minStock || 0) + sold - ending, 0);
    const beginning = ending + sold - receipt;
    const monthlySales = Math.max(sold, product.type === "weapon" ? 1 : 4);
    const months = monthlySales ? ending / monthlySales : 0;
    const rop = Math.ceil(monthlySales / 30 * Number(product.leadTimeDays || 14));
    const recommended = Math.max(rop + Number(product.minStock || 0) - ending, 0);
    const status = ending <= rop ? "Замовити" : ending <= Number(product.minStock || 0) ? "Низький" : "ОК";
    return { product, beginning, receipt, sold, ending, monthlySales, months, status, rop, recommended };
  });
}

function reportDefinitions() {
  const arRows = state.invoices.filter((invoice) => invoice.total > invoice.paid).map((invoice) => ({
    date: invoice.dueDate,
    client: clientName(invoice.clientId),
    manager: invoice.manager,
    currency: invoice.currency,
    debt: invoice.total - invoice.paid,
    invoice: invoice.id
  }));
  const stockRows = inventoryRows().map((row) => ({
    date: today,
    product: `${row.product.brand} ${row.product.model}`,
    warehouse: warehouseName(row.warehouseId),
    qty: row.qty,
    value: row.valueUAH,
    owner: row.clientId ? clientName(row.clientId) : "-"
  }));
  const marketplaceRows = state.marketplaceStats.map((row) => {
    const revenue = row.price * row.sold;
    const cost = uah(row.cost, row.costCurrency) * row.sold;
    const profit = revenue - cost - row.commission - row.logistics - row.otherCosts;
    return {
      date: today,
      marketplace: row.marketplace,
      sku: row.sku,
      price: row.price,
      sold: row.sold,
      revenue,
      commission: row.commission,
      logistics: row.logistics,
      otherCosts: row.otherCosts,
      cost,
      profit,
      profitUnit: row.sold ? profit / row.sold : 0,
      margin: revenue ? Math.round(profit / revenue * 1000) / 10 : 0
    };
  });
  return {
    cash: {
      title: "Рух коштів",
      rows: cashMovementRows(),
      columns: [
        ["date", "Дата"],
        ["article", "Стаття"],
        ["method", "Метод"],
        ["currency", "Валюта"],
        ["inflow", "Надходження", (value, row) => value ? formatMoney(value, row.currency) : "-"],
        ["outflow", "Витрати", (value, row) => value ? formatMoney(value, row.currency) : "-"],
        ["manager", "Менеджер"]
      ]
    },
    expenses: {
      title: "Розшифровка витрат",
      rows: state.expenses,
      columns: [
        ["date", "Дата"],
        ["article", "Стаття"],
        ["supplier", "Постачальник"],
        ["amount", "Сума", (value, row) => formatMoney(value, row.currency)],
        ["currency", "Валюта"],
        ["method", "Метод"],
        ["manager", "Менеджер"],
        ["comment", "Коментар"]
      ]
    },
    ar: {
      title: "Дебіторська заборгованість",
      rows: arRows,
      columns: [
        ["date", "Дата оплати"],
        ["client", "Клієнт"],
        ["manager", "Менеджер"],
        ["currency", "Валюта"],
        ["debt", "Борг", (value, row) => formatMoney(value, row.currency)],
        ["invoice", "Накладна"]
      ]
    },
    warehouse: {
      title: "Відомість по товарах на складах",
      rows: stockRows,
      columns: [
        ["product", "Товар"],
        ["warehouse", "Склад"],
        ["qty", "Кількість"],
        ["value", "Вартість", (value) => formatMoney(value)],
        ["owner", "Власник"]
      ]
    },
    sales: {
      title: "Звіт з продажу",
      rows: salesReportRows().map((row) => ({
        date: row.date || today,
        product: `${row.product?.brand || ""} ${row.product?.model || ""}`.trim(),
        client: row.client,
        manager: row.manager,
        qty: row.qty,
        revenue: row.revenue,
        cost: row.cost,
        markup: row.revenue - row.cost
      })),
      columns: [
        ["date", "Дата"],
        ["product", "Товар"],
        ["client", "Клієнт"],
        ["manager", "Менеджер"],
        ["qty", "Кількість"],
        ["revenue", "Вартість", (value) => formatMoney(value)],
        ["cost", "Собівартість", (value) => formatMoney(value)],
        ["markup", "Націнка", (value) => formatMoney(value)]
      ]
    },
    stock: {
      title: "Аналіз товарних запасів",
      rows: stockAnalysisRows().map((row) => ({ date: today, product: `${row.product.brand} ${row.product.model}`, ...row })),
      columns: [
        ["product", "Товар"],
        ["beginning", "Залишок на початок"],
        ["receipt", "Прихід"],
        ["sold", "Продаж"],
        ["ending", "Залишок кінцевий"],
        ["monthlySales", "Продаж/міс"],
        ["months", "Запас, міс", (value) => Number(value || 0).toFixed(1)],
        ["status", "Статус"],
        ["rop", "ROP"],
        ["recommended", "Рекоменд. замовлення"]
      ]
    },
    marketplaces: {
      title: "Аналітика маркетплейсів",
      rows: marketplaceRows,
      columns: [
        ["marketplace", "Маркетплейс"],
        ["sku", "SKU"],
        ["price", "Ціна", (value) => formatMoney(value)],
        ["sold", "Продано"],
        ["revenue", "Сума", (value) => formatMoney(value)],
        ["commission", "Комісія", (value) => formatMoney(value)],
        ["logistics", "Логістика", (value) => formatMoney(value)],
        ["otherCosts", "Інші витрати", (value) => formatMoney(value)],
        ["cost", "Собівартість", (value) => formatMoney(value)],
        ["profit", "Прибуток", (value) => formatMoney(value)],
        ["profitUnit", "Прибуток/шт", (value) => formatMoney(value)],
        ["margin", "Маржа %", (value) => `${value}%`]
      ]
    }
  };
}

function renderReportBuilder() {
  const reports = reportDefinitions();
  const config = state.reportBuilder;
  const report = reports[config.reportId] || reports.sales;
  const selectedColumns = config.columns?.length ? config.columns.filter((key) => report.columns.some(([columnKey]) => columnKey === key)) : report.columns.map(([key]) => key);
  const visibleColumns = selectedColumns.length ? selectedColumns : report.columns.map(([key]) => key);
  const columns = report.columns.filter(([key]) => visibleColumns.includes(key));
  const from = config.from || "2026-05-01";
  const to = config.to || today;
  const filtered = report.rows.filter((row) => !row.date || (row.date >= from && row.date <= to));
  const sortColumn = config.sortBy || columns[0]?.[0] || "date";
  const sorted = [...filtered].sort((a, b) => {
    const first = a[sortColumn] ?? "";
    const second = b[sortColumn] ?? "";
    const result = typeof first === "number" && typeof second === "number"
      ? first - second
      : String(first).localeCompare(String(second), "uk", { numeric: true });
    return config.sortDir === "asc" ? result : -result;
  });
  const groupColumn = config.groupBy;
  const bodyRows = [];
  let currentGroup = "";
  sorted.forEach((row) => {
    const groupValue = groupColumn ? String(row[groupColumn] ?? "-") : "";
    if (groupColumn && groupValue !== currentGroup) {
      currentGroup = groupValue;
      bodyRows.push(`<tr class="group-row"><td colspan="${columns.length}">${escapeHtml(report.columns.find(([key]) => key === groupColumn)?.[1] || groupColumn)}: ${escapeHtml(groupValue)}</td></tr>`);
    }
    bodyRows.push(`<tr>${columns.map(([key, , renderValue]) => `<td>${renderValue ? renderValue(row[key], row) : escapeHtml(row[key] ?? "-")}</td>`).join("")}</tr>`);
  });

  return `
    <section class="panel section-band">
      <div class="split">
        <h2>Конструктор звітів</h2>
        <span class="pill info">${filtered.length} рядків</span>
      </div>
      <form class="form-grid report-builder" data-report-builder>
        <label class="field"><span>Звіт</span><select name="reportId">${Object.entries(reports).map(([id, item]) => option(id, item.title, id === config.reportId)).join("")}</select></label>
        <label class="field"><span>Дата з</span><input name="from" type="date" value="${from}"></label>
        <label class="field"><span>Дата по</span><input name="to" type="date" value="${to}"></label>
        <label class="field"><span>Сортувати по</span><select name="sortBy">${report.columns.map(([key, label]) => option(key, label, key === sortColumn)).join("")}</select></label>
        <label class="field"><span>Напрям</span><select name="sortDir">${option("asc", "від меншого / А-Я", config.sortDir === "asc")}${option("desc", "від більшого / Я-А", config.sortDir !== "asc")}</select></label>
        <label class="field"><span>Групування</span><select name="groupBy">${option("", "без групування", !groupColumn)}${report.columns.map(([key, label]) => option(key, label, key === groupColumn)).join("")}</select></label>
        <label class="field full"><span>Стовпці</span><select name="columns" multiple>${report.columns.map(([key, label]) => option(key, label, visibleColumns.includes(key))).join("")}</select></label>
      </form>
      <div class="table-wrap">
        <table>
          <thead><tr>${columns.map(([, label]) => `<th>${escapeHtml(label)}</th>`).join("")}</tr></thead>
          <tbody>${bodyRows.join("") || `<tr><td colspan="${columns.length || 1}">Немає даних за вибраний період.</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderReports() {
  if (!(role().canViewReports || isAdmin())) {
    return `<section class="panel"><h2>Звіти</h2><p class="notice warn">Поточна роль не має доступу до блоку звітів. Доступ відкриває адміністратор у ролях працівників.</p></section>`;
  }
  const cashRows = cashMovementRows();
  const salesRows = salesReportRows();
  const stockRows = inventoryRows();
  const arRows = state.invoices.filter((invoice) => invoice.total > invoice.paid);
  const balanceAssets = stockRows.reduce((sum, row) => sum + row.valueUAH, 0) + arRows.reduce((sum, invoice) => sum + uah(invoice.total - invoice.paid, invoice.currency), 0);
  const balanceLiabilities = state.payables.reduce((sum, item) => sum + uah(item.amount, item.currency), 0);

  return `
    ${renderReportBuilder()}

    <section class="grid four section-band">
      <article class="card metric info"><span>Активи</span><strong>${formatMoney(balanceAssets)}</strong><small>Залишки + дебіторка.</small></article>
      <article class="card metric warn"><span>Зобов'язання</span><strong>${formatMoney(balanceLiabilities)}</strong><small>Кредиторка у валюті обліку.</small></article>
      <article class="card metric good"><span>Продажі</span><strong>${formatMoney(salesRows.reduce((sum, row) => sum + row.revenue, 0))}</strong><small>Кількість, вартість, націнка.</small></article>
      <article class="card metric danger"><span>Товарні ризики</span><strong>${stockAnalysisRows().filter((row) => row.status !== "ОК").length}</strong><small>Позиції нижче ROP або мін. залишку.</small></article>
    </section>

    <section class="panel section-band">
      <h2>Рух коштів</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Дата</th><th>Стаття</th><th>Метод</th><th>Валюта</th><th>Надходження</th><th>Витрати</th><th>Менеджер</th></tr></thead>
        <tbody>${cashRows.map((row) => `<tr><td>${row.date}</td><td>${row.article}</td><td>${row.method}</td><td>${row.currency}</td><td>${row.inflow ? formatMoney(row.inflow, row.currency) : "-"}</td><td>${row.outflow ? formatMoney(row.outflow, row.currency) : "-"}</td><td>${row.manager}</td></tr>`).join("")}</tbody>
      </table></div>
    </section>

    <section class="grid two section-band">
      <div class="panel">
        <h2>Розшифровка витрат</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Дата</th><th>Стаття</th><th>Постачальник</th><th>Сума</th><th>Метод</th><th>Коментар</th></tr></thead>
          <tbody>${state.expenses.map((expense) => `<tr><td>${expense.date}</td><td>${expense.article}</td><td>${expense.supplier}</td><td>${formatMoney(expense.amount, expense.currency)}</td><td>${expense.method}</td><td>${expense.comment}</td></tr>`).join("")}</tbody>
        </table></div>
      </div>
      <div class="panel">
        <h2>Графік оплат</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Дата</th><th>Клієнт</th><th>Накладна</th><th>Борг</th><th>Менеджер</th></tr></thead>
          <tbody>${arRows.map((invoice) => `<tr><td>${invoice.dueDate}</td><td>${clientName(invoice.clientId)}</td><td>${invoice.id}</td><td>${formatMoney(invoice.total - invoice.paid, invoice.currency)}</td><td>${invoice.manager}</td></tr>`).join("")}</tbody>
        </table></div>
      </div>
    </section>

    <section class="grid two section-band">
      <div class="panel">
        <h2>Баланс</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Показник</th><th>Сума</th></tr></thead>
          <tbody>
            <tr><td>Товарні залишки</td><td>${formatMoney(stockRows.reduce((sum, row) => sum + row.valueUAH, 0))}</td></tr>
            <tr><td>Дебіторська заборгованість</td><td>${formatMoney(arRows.reduce((sum, invoice) => sum + uah(invoice.total - invoice.paid, invoice.currency), 0))}</td></tr>
            <tr><td>Кредиторська заборгованість</td><td>${formatMoney(balanceLiabilities)}</td></tr>
            <tr><td><strong>Чистий баланс</strong></td><td><strong>${formatMoney(balanceAssets - balanceLiabilities)}</strong></td></tr>
          </tbody>
        </table></div>
      </div>
      <div class="panel">
        <h2>Дебіторка клієнтів та менеджерів</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Клієнт</th><th>Менеджер</th><th>Валюта</th><th>Борг</th><th>Накладна</th></tr></thead>
          <tbody>${arRows.map((invoice) => `<tr><td>${clientName(invoice.clientId)}</td><td>${invoice.manager}</td><td>${invoice.currency}</td><td>${formatMoney(invoice.total - invoice.paid, invoice.currency)}</td><td>${invoice.id}</td></tr>`).join("")}</tbody>
        </table></div>
      </div>
    </section>

    <section class="grid two section-band">
      <div class="panel">
        <h2>Кредиторська заборгованість</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Постачальник</th><th>Стаття</th><th>Менеджер</th><th>Сума</th><th>Дата</th><th>Статус</th></tr></thead>
          <tbody>${state.payables.map((item) => `<tr><td>${item.supplier}</td><td>${item.article}</td><td>${item.manager}</td><td>${formatMoney(item.amount, item.currency)}</td><td>${item.dueDate}</td><td>${statusPill(item.status)}</td></tr>`).join("")}</tbody>
        </table></div>
      </div>
      <div class="panel">
        <h2>Відомість по складах</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Товар</th><th>Склад</th><th>Кількість</th><th>Вартість</th><th>Власник</th></tr></thead>
          <tbody>${stockRows.map((row) => `<tr><td>${row.product.brand} ${row.product.model}</td><td>${warehouseName(row.warehouseId)}</td><td>${row.qty}</td><td>${formatMoney(row.valueUAH)}</td><td>${row.clientId ? clientName(row.clientId) : "-"}</td></tr>`).join("")}</tbody>
        </table></div>
      </div>
    </section>

    <section class="panel section-band">
      <h2>Звіт з продажу</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Товар</th><th>Клієнт</th><th>Менеджер</th><th>Кількість</th><th>Вартість</th><th>Собівартість</th><th>Націнка</th><th>План-факт</th></tr></thead>
        <tbody>${salesRows.map((row) => {
          const plan = state.salesPlans.find((item) => item.manager === row.manager)?.plan || 0;
          const fact = plan ? Math.round(row.revenue / plan * 100) : 0;
          return `<tr><td>${row.product?.brand || ""} ${row.product?.model || ""}</td><td>${row.client}</td><td>${row.manager}</td><td>${row.qty}</td><td>${formatMoney(row.revenue)}</td><td>${formatMoney(row.cost)}</td><td>${formatMoney(row.revenue - row.cost)}</td><td>${fact}%</td></tr>`;
        }).join("")}</tbody>
      </table></div>
    </section>

    <section class="panel section-band">
      <h2>Аналіз товарних запасів</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Товар</th><th>Залишок на початок</th><th>Прихід</th><th>Продаж</th><th>Залишок кінцевий</th><th>Продаж/міс</th><th>Запас, міс</th><th>Статус</th><th>ROP</th><th>Рекоменд. замовлення</th></tr></thead>
        <tbody>${stockAnalysisRows().map((row) => `<tr><td>${row.product.brand} ${row.product.model}</td><td>${row.beginning}</td><td>${row.receipt}</td><td>${row.sold}</td><td>${row.ending}</td><td>${row.monthlySales}</td><td>${row.months.toFixed(1)}</td><td>${row.status === "ОК" ? '<span class="pill good">ОК</span>' : '<span class="pill warn">' + row.status + '</span>'}</td><td>${row.rop}</td><td>${row.recommended}</td></tr>`).join("")}</tbody>
      </table></div>
    </section>

    <section class="panel">
      <h2>Аналітика маркетплейсів</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Маркетплейс</th><th>SKU</th><th>Ціна</th><th>Продано</th><th>Сума</th><th>Комісія</th><th>Логістика</th><th>Інші витрати</th><th>Собівартість</th><th>Прибуток</th><th>Прибуток/шт</th><th>Маржа %</th></tr></thead>
        <tbody>${state.marketplaceStats.map((row) => {
          const revenue = row.price * row.sold;
          const cost = uah(row.cost, row.costCurrency) * row.sold;
          const profit = revenue - cost - row.commission - row.logistics - row.otherCosts;
          const margin = revenue ? Math.round(profit / revenue * 1000) / 10 : 0;
          return `<tr><td>${row.marketplace}</td><td>${row.sku}</td><td>${formatMoney(row.price, row.currency)}</td><td>${row.sold}</td><td>${formatMoney(revenue, row.currency)}</td><td>${formatMoney(row.commission, row.currency)}</td><td>${formatMoney(row.logistics, row.currency)}</td><td>${formatMoney(row.otherCosts, row.currency)}</td><td>${formatMoney(cost)}</td><td>${formatMoney(profit)}</td><td>${formatMoney(profit / row.sold)}</td><td>${margin}%</td></tr>`;
        }).join("")}</tbody>
      </table></div>
    </section>
  `;
}

function renderFinance() {
  const receivableByManager = state.managers.map((manager) => ({
    manager,
    amount: state.invoices
      .filter((invoice) => invoice.manager === manager)
      .reduce((sum, invoice) => sum + Math.max(invoice.total - invoice.paid, 0), 0)
  }));
  return `
    <section class="grid two section-band">
      <div class="panel">
        <h2>Внести оплату</h2>
        <form class="form-grid" data-action="create-payment">
          <label class="field wide"><span>Накладна</span><select name="invoiceId">${state.invoices.map((invoice) => option(invoice.id, `${invoice.id} · ${clientName(invoice.clientId)} · борг ${formatMoney(invoice.total - invoice.paid, invoice.currency)}`)).join("")}</select></label>
          <label class="field"><span>Дата</span><input name="date" type="date" value="${today}"></label>
          <label class="field"><span>Сума</span><input name="amount" type="number" min="0" value="0"></label>
          <label class="field"><span>Валюта</span><select name="currency">${Object.keys(state.settings.rates).map((currency) => option(currency, currency)).join("")}</select></label>
          <label class="field"><span>Курс дня</span><input name="rate" type="number" step="0.01" min="0" value="1"></label>
          <label class="field"><span>Метод</span><select name="method">${["Каса", "Безготівка", "Банк API", "Конвертація"].map((item) => option(item, item)).join("")}</select></label>
          <label class="field"><span>Референс</span><input name="bankRef" placeholder="банк / каса / swift"></label>
          <button class="primary" type="submit">Прив'язати оплату</button>
        </form>
      </div>
      <div class="panel">
        <h2>Дебіторка менеджерів</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Менеджер</th><th>Дебіторка</th><th>Клієнти</th></tr></thead>
            <tbody>
              ${receivableByManager.map((row) => `
                <tr>
                  <td>${row.manager}</td>
                  <td>${formatMoney(row.amount)}</td>
                  <td>${state.clients.filter((client) => client.manager === row.manager).length}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="grid two section-band">
      <div class="panel">
        <h2>Внести витрату</h2>
        <form class="form-grid" data-action="create-expense">
          <label class="field"><span>Дата</span><input name="date" type="date" value="${today}"></label>
          <label class="field"><span>Стаття</span><select name="article">${state.settings.expenseArticles.map((item) => option(item, item)).join("")}</select></label>
          <label class="field"><span>Сума</span><input name="amount" type="number" min="0" value="0"></label>
          <label class="field"><span>Валюта</span><select name="currency">${Object.keys(state.settings.rates).map((currency) => option(currency, currency)).join("")}</select></label>
          <label class="field"><span>Метод</span><select name="method">${["Каса", "Безготівка", "Банк API", "Конвертація"].map((item) => option(item, item)).join("")}</select></label>
          <label class="field"><span>Постачальник</span><input name="supplier" placeholder="контрагент"></label>
          <label class="field"><span>Менеджер</span><select name="manager">${employeeOptions()}</select></label>
          <label class="field wide"><span>Коментар</span><input name="comment" placeholder="призначення витрати"></label>
          <button class="primary" type="submit">Додати витрату</button>
        </form>
      </div>
      <div class="panel">
        <h2>Створити кредиторку</h2>
        <form class="form-grid" data-action="create-payable">
          <label class="field wide"><span>Постачальник</span><input name="supplier" required></label>
          <label class="field"><span>Стаття</span><select name="article">${state.settings.expenseArticles.map((item) => option(item, item)).join("")}</select></label>
          <label class="field"><span>Сума</span><input name="amount" type="number" min="0" value="0"></label>
          <label class="field"><span>Валюта</span><select name="currency">${Object.keys(state.settings.rates).map((currency) => option(currency, currency)).join("")}</select></label>
          <label class="field"><span>Дата оплати</span><input name="dueDate" type="date" value="${today}"></label>
          <label class="field"><span>Менеджер</span><select name="manager">${employeeOptions()}</select></label>
          <button class="primary" type="submit">Додати борг</button>
        </form>
      </div>
    </section>

    <section class="grid two">
      <div class="panel">
        <h2>Оплати</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Дата</th><th>Накладна</th><th>Сума</th><th>UAH екв.</th><th>Метод</th><th>Референс</th></tr></thead>
            <tbody>
              ${state.payments.map((payment) => `
                <tr>
                  <td>${payment.date}</td>
                  <td>${payment.invoiceId}</td>
                  <td>${formatMoney(payment.amount, payment.currency)}</td>
                  <td>${formatMoney(payment.amount * payment.rate)}</td>
                  <td>${payment.method}</td>
                  <td>${payment.bankRef || "-"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel">
        <h2>Звірка каси</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Зміна</th><th>Менеджер</th><th>Очікувано</th><th>Факт</th><th>Різниця</th><th>Стан</th></tr></thead>
            <tbody>
              ${state.cashShifts.map((shift) => `
                <tr>
                  <td>${shift.date}</td>
                  <td>${shift.manager}</td>
                  <td>${formatMoney(shift.expected)}</td>
                  <td>${formatMoney(shift.actual)}</td>
                  <td>${formatMoney(shift.actual - shift.expected)}</td>
                  <td>${shift.closed ? '<span class="pill good">закрито</span>' : '<span class="pill warn">відкрита</span>'}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function marketplaceNames() {
  return state.integrations
    .filter((integration) => ["rozetka", "prom", "epicentr", "allo"].includes(integration.id))
    .map((integration) => integration.name);
}

function productAvailableQty(productId) {
  const product = byId(state.products, productId);
  if (!product) return 0;
  if (product.type === "weapon") return serialsForProduct(product).filter(serialIsSelectable).length;
  return state.stock.filter((row) => row.productId === productId).reduce((sum, row) => sum + Number(row.qty || 0), 0);
}

function publicationPayload(publication) {
  const product = byId(state.products, publication.productId);
  return {
    marketplace: publication.marketplace,
    sku: publication.sku,
    externalId: publication.externalId,
    title: publication.title,
    product: product ? {
      id: product.id,
      type: product.type,
      brand: product.brand,
      model: product.model,
      category: product.category,
      barcode: product.barcode,
      supplierSku: product.supplierSku,
      internalCode: product.internalCode,
      uktzed: product.uktzed,
      description: product.description,
      photos: (product.photos || []).map((photo) => ({ name: photo.name, type: photo.type, width: photo.width, height: photo.height, dataUrl: photo.dataUrl }))
    } : null,
    price: publication.price,
    currency: publication.currency,
    stockQty: publication.stockQty,
    status: publication.status
  };
}

function renderMarketplaces() {
  const names = marketplaceNames();
  const newOrders = state.marketplaceOrders.filter((order) => order.status === "new_order").length;
  const needsSync = state.marketplacePublications.filter((publication) => publication.status !== "published").length;
  return `
    <section class="grid four section-band">
      <article class="card metric info"><span>Публікації</span><strong>${state.marketplacePublications.length}</strong><small>Окремі SKU, ціни, фото та статуси для кожного маркетплейсу.</small></article>
      <article class="card metric warn"><span>Потребують обміну</span><strong>${needsSync}</strong><small>Товари, ціни або залишки не синхронізовані.</small></article>
      <article class="card metric danger"><span>Нові замовлення</span><strong>${newOrders}</strong><small>Після імпорту менеджер отримує подію у журналі.</small></article>
      <article class="card metric good"><span>Канали</span><strong>${names.length}</strong><small>Rozetka, Prom, Epicentr, Allo.</small></article>
    </section>

    <section class="grid two section-band">
      <div class="panel">
        <h2>Створити публікацію</h2>
        <form class="form-grid" data-action="create-marketplace-publication">
          <label class="field"><span>Маркетплейс</span><select name="marketplace">${names.map((name) => option(name, name)).join("")}</select></label>
          <label class="field wide"><span>Товар</span><select name="productId">${state.products.map((product) => option(product.id, `${product.brand} ${product.model}`)).join("")}</select></label>
          <label class="field"><span>SKU каналу</span><input name="sku" required placeholder="SKU маркетплейсу"></label>
          <label class="field"><span>Зовнішній ID</span><input name="externalId" placeholder="id з маркетплейсу"></label>
          <label class="field wide"><span>Назва публікації</span><input name="title" required placeholder="назва для картки маркетплейсу"></label>
          <label class="field"><span>Ціна</span><input name="price" type="number" min="0" value="0"></label>
          <label class="field"><span>Валюта</span><select name="currency">${Object.keys(state.settings.rates).map((currency) => option(currency, currency, currency === "UAH")).join("")}</select></label>
          <label class="field"><span>Менеджер</span><select name="manager">${employeeOptions()}</select></label>
          <button class="primary" type="submit">Додати публікацію</button>
        </form>
      </div>
      <div class="panel">
        <h2>Обмін даними</h2>
        <div class="stack">
          <div class="row-actions">
            ${names.map((name) => `<button class="secondary" data-export-marketplace="${escapeHtml(name)}">Експорт ${escapeHtml(name)}</button>`).join("")}
          </div>
          <div class="row-actions">
            <button class="ghost" data-sync-marketplace-stocks>Оновити залишки</button>
            <button class="ghost" data-sync-marketplace-prices>Оновити ціни по курсу</button>
            <button class="ghost" data-import-marketplace-orders>Імпорт demo замовлення</button>
          </div>
          <form class="form-grid" data-action="import-marketplace-catalog">
            <label class="field full"><span>Імпорт JSON з маркетплейсу</span><textarea name="payload" placeholder='{"publications":[{"marketplace":"Prom","sku":"...","productId":"p-200","price":5400}]}'></textarea></label>
            <button class="primary" type="submit">Імпортувати публікації</button>
          </form>
        </div>
      </div>
    </section>

    <section class="panel section-band">
      <h2>Список публікацій</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Маркетплейс</th><th>SKU / зовн. ID</th><th>Товар</th><th>Фото</th><th>Ціна</th><th>Залишок CRM / канал</th><th>Менеджер</th><th>Статус</th><th>Дії</th></tr></thead>
          <tbody>
            ${state.marketplacePublications.map((publication) => {
              const product = byId(state.products, publication.productId);
              const crmQty = productAvailableQty(publication.productId);
              return `
                <tr>
                  <td>${publication.marketplace}<br><span class="small muted">${publication.lastSync || "не синхронізовано"}</span></td>
                  <td><strong>${publication.sku}</strong><br><span class="small muted">${publication.externalId || "без зовн. ID"}</span></td>
                  <td>${product ? `${product.brand} ${product.model}` : "Товар не знайдено"}<br><span class="small muted">${publication.title}</span></td>
                  <td>${product?.photos?.length ? `<span class="pill good">${product.photos.length} фото</span>` : '<span class="pill warn">немає фото</span>'}</td>
                  <td>${formatMoney(publication.price, publication.currency)}</td>
                  <td>${crmQty} / ${publication.stockQty}</td>
                  <td>${publication.manager}</td>
                  <td>${statusPill(publication.status)}</td>
                  <td class="row-actions">
                    <button class="ghost" data-edit-publication="${publication.id}">Редагувати</button>
                    <button class="secondary" data-sync-publication="${publication.id}">Синхр.</button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <h2>Замовлення маркетплейсів</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Замовлення</th><th>Покупець</th><th>Товар</th><th>Доставка</th><th>Оплата</th><th>Менеджер</th><th>Статус</th><th>Дії</th></tr></thead>
          <tbody>
            ${state.marketplaceOrders.map((order) => {
              const product = byId(state.products, order.productId);
              return `
                <tr>
                  <td><strong>${order.externalOrderId}</strong><br><span class="small muted">${order.marketplace} · ${order.date}</span></td>
                  <td>${order.buyer.name}<br><span class="small muted">${order.buyer.phone || "-"} · ${order.clientId ? clientName(order.clientId) : "клієнт ще не створений"}</span></td>
                  <td>${product ? `${product.brand} ${product.model}` : order.sku}<br><span class="small muted">${order.qty} од. × ${formatMoney(order.price, order.currency)}</span></td>
                  <td>${order.delivery.service}<br><span class="small muted">${order.delivery.city || ""} ${order.delivery.warehouse || ""} ${order.delivery.ttn || ""}</span></td>
                  <td>${order.payment.status === "paid" ? '<span class="pill good">оплачено</span>' : '<span class="pill warn">очікує</span>'}<br><span class="small muted">${order.payment.source}</span></td>
                  <td>${order.manager}</td>
                  <td>${statusPill(order.status)}</td>
                  <td class="row-actions">
                    <button class="ghost" data-notify-marketplace-order="${order.id}">Повідомити</button>
                    <button class="ghost" data-create-client-from-order="${order.id}">Клієнт</button>
                    <button class="ghost" data-agree-marketplace-order="${order.id}">Узгоджено</button>
                    <button class="secondary" data-invoice-marketplace-order="${order.id}">Накладна</button>
                    <button class="secondary" data-pull-marketplace-payment="${order.id}">Оплата</button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderIntegrations() {
  const accountingDocs = state.invoices.filter((invoice) => invoice.accounting);
  return `
    <section class="grid three section-band">
      ${state.integrations.map((integration) => `
        <article class="card stack">
          <div class="split">
            <strong>${integration.name}</strong>
            ${statusPill(integration.status)}
          </div>
          <p class="small muted">${integration.scope}</p>
          <span class="small">Останній обмін: ${integration.lastSync}</span>
          <button class="secondary" data-sync="${integration.id}">Запустити обмін</button>
        </article>
      `).join("")}
    </section>

    <section class="grid two">
      <div class="panel">
        <h2>Двосторонній API обмін</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Об'єкт</th><th>CRM → канал</th><th>Канал → CRM</th><th>Ключ синхронізації</th></tr></thead>
            <tbody>
              <tr><td>Товари</td><td>назва, опис, фото, характеристики, УКТЗЕД</td><td>помилки модерації, зовнішні ID</td><td>internalCode + marketplaceSku</td></tr>
              <tr><td>Замовлення</td><td>статус, ТТН, відміни</td><td>нові замовлення, клієнт, доставка</td><td>externalOrderId</td></tr>
              <tr><td>Залишки</td><td>доступна кількість без резервів</td><td>резерви каналів</td><td>productId + warehouseId</td></tr>
              <tr><td>Ціни</td><td>прайс, акції, валюта</td><td>помилки прийому</td><td>priceListId + productId</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel">
        <h2>BAS/BAF документи</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Документ</th><th>Фірма</th><th>Сума</th><th>Статус</th></tr></thead>
            <tbody>
              ${accountingDocs.map((invoice) => `
                <tr>
                  <td>${invoice.id}</td>
                  <td>${firmName(invoice.firmId)}</td>
                  <td>${formatMoney(invoice.total, invoice.currency)}</td>
                  <td><span class="pill info">готовий до обміну</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function renderRolesLegacy() {
  const canManage = isAdmin();
  const disabled = canManage ? "" : "disabled";
  return `
    <section class="grid two section-band">
      <div class="panel">
        <h2>Працівники та доступи</h2>
        <form class="form-grid" data-action="create-employee">
          <label class="field wide"><span>ПІБ</span><input name="name" required ${disabled}></label>
          <label class="field"><span>Роль</span><select name="roleName" ${disabled}>${state.roles.map((item) => option(item.name, item.name)).join("")}</select></label>
          <label class="field"><span>Відділ</span><input name="department" value="Продажі" ${disabled}></label>
          <label class="field"><span>Телефон</span><input name="phone" ${disabled}></label>
          <label class="field"><span>Email</span><input name="email" type="email" ${disabled}></label>
          <button class="primary" type="submit" ${disabled}>Додати працівника</button>
        </form>
        <p class="notice ${canManage ? "" : "warn"} small">${canManage ? "Поточний користувач має права адміністратора." : "Зміна ролей і внесення працівників доступні тільки адміністратору."}</p>
      </div>
      <div class="panel">
        <h2>Закриття дня</h2>
        <form class="form-grid" data-action="update-closed-day">
          <label class="field"><span>Дата блокування</span><input name="closedDay" type="date" value="${state.settings.closedDay}"></label>
          <button class="primary" type="submit" ${role().canEditClosedDay ? "" : "disabled"}>Оновити</button>
        </form>
        <p class="notice ${role().canEditClosedDay ? "" : "warn"} small">Поточна роль: ${state.currentRole}. ${role().canEditClosedDay ? "Може змінювати закриті дні." : "Не може змінювати документи до закритої дати."}</p>
      </div>
    </section>

    <section class="panel section-band">
      <h2>Працівники</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Працівник</th><th>Відділ</th><th>Контакти</th><th>Роль</th><th>Стан</th></tr></thead>
          <tbody>
            ${state.employees.map((employee) => `
              <tr>
                <td><strong>${employee.name}</strong>${employee.id === state.currentEmployeeId ? '<br><span class="pill info">активний користувач</span>' : ""}</td>
                <td>${employee.department || "-"}</td>
                <td>${employee.phone || "-"}<br><span class="small muted">${employee.email || "-"}</span></td>
                <td><select data-employee-role="${employee.id}" ${disabled}>${state.roles.map((item) => option(item.name, item.name, item.name === employee.roleName)).join("")}</select></td>
                <td>${employee.active ? '<span class="pill good">активний</span>' : '<span class="pill danger">вимкнено</span>'}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>

    <section class="grid two">
      <div class="panel">
        <h2>Матриця ролей</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Роль</th><th>Закритий день</th><th>Зброя</th><th>Ціни</th><th>BAS/BAF</th><th>Кредит</th><th>Працівники</th><th>Звіти</th><th>Налаштування</th></tr></thead>
            <tbody>
              ${state.roles.map((item) => `
                <tr>
                  <td><strong>${item.name}</strong></td>
                  <td>${boolPill(item.canEditClosedDay)}</td>
                  <td>${boolPill(item.canSellWeapon)}</td>
                  <td>${boolPill(item.canChangePrices)}</td>
                  <td>${boolPill(item.canExportAccounting)}</td>
                  <td>${boolPill(item.canApproveCredit)}</td>
                  <td>${boolPill(item.canManageUsers)}</td>
                  <td>${boolPill(item.canViewReports)}</td>
                  <td>${boolPill(item.canEditSettings)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel">
        <h2>Заборони продажу зброї</h2>
        <p class="notice danger">Система не дозволяє продаж типу “Зброя” без серійного номера, дублювання серій, продаж неперевіреної ЄРЗ одиниці, або проведення без номера дозволу на покупку та дати видачі.</p>
        <p class="notice warn">Редагування ролей та створення працівників заблоковані для всіх ролей, крім адміністратора.</p>
      </div>
    </section>
  `;
}

function permissionCheckbox(roleItem, group, key, checked, disabled) {
  return `<input type="checkbox" data-role-permission="${escapeHtml(key)}" data-role-group="${escapeHtml(group)}" data-role-name="${escapeHtml(roleItem.name)}" ${checked ? "checked" : ""} ${disabled}>`;
}

function renderPermissionMatrix(title, group, definitions, disabled) {
  return `
    <div class="panel">
      <h2>${title}</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Роль</th>${definitions.map(([, label]) => `<th>${escapeHtml(label)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${state.roles.map((roleItem) => `
              <tr>
                <td><strong>${escapeHtml(roleItem.name)}</strong></td>
                ${definitions.map(([key]) => {
                  const checked = group === "basic" ? roleItem[key] === true : roleItem.access?.[group]?.[key] !== false;
                  return `<td>${permissionCheckbox(roleItem, group, key, checked, disabled)}</td>`;
                }).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderRoles() {
  const canManage = isAdmin();
  const disabled = canManage ? "" : "disabled";
  return `
    <section class="grid two section-band">
      <div class="panel">
        <h2>Додати працівника</h2>
        <form class="form-grid" data-action="create-employee">
          <label class="field wide"><span>ПІБ</span><input name="name" required ${disabled}></label>
          <label class="field"><span>Роль</span><select name="roleName" ${disabled}>${state.roles.map((item) => option(item.name, item.name)).join("")}</select></label>
          <label class="field"><span>Відділ</span><input name="department" value="Продажі" ${disabled}></label>
          <label class="field"><span>Телефон</span><input name="phone" ${disabled}></label>
          <label class="field"><span>Email</span><input name="email" type="email" ${disabled}></label>
          <label class="field"><span>Логін</span><input name="login" required ${disabled}></label>
          <label class="field"><span>Пароль</span><input name="password" type="password" required ${disabled}></label>
          <button class="primary" type="submit" ${disabled}>Додати працівника</button>
        </form>
        <p class="notice ${canManage ? "" : "warn"} small">${canManage ? "Адміністратор може створювати працівників, змінювати логіни, паролі та ролі." : "Працівників і ролі змінює тільки адміністратор."}</p>
      </div>
      <div class="panel">
        <h2>Закриття дня</h2>
        <form class="form-grid" data-action="update-closed-day">
          <label class="field"><span>Дата блокування</span><input name="closedDay" type="date" value="${state.settings.closedDay}"></label>
          <button class="primary" type="submit" ${role().canEditClosedDay ? "" : "disabled"}>Оновити</button>
        </form>
        <p class="notice ${role().canEditClosedDay ? "" : "warn"} small">Поточна роль: ${escapeHtml(state.currentRole)}.</p>
      </div>
    </section>

    <section class="panel section-band">
      <h2>Працівники</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ПІБ</th><th>Відділ</th><th>Контакти</th><th>Логін / пароль</th><th>Роль</th><th>Стан</th><th>Дії</th></tr></thead>
          <tbody>
            ${state.employees.map((employee) => `
              <tr data-employee-row="${escapeHtml(employee.id)}">
                <td><input name="name" value="${escapeHtml(employee.name)}" ${disabled}>${employee.id === state.currentEmployeeId ? '<br><span class="pill info">активний користувач</span>' : ""}</td>
                <td><input name="department" value="${escapeHtml(employee.department || "")}" ${disabled}></td>
                <td>
                  <input name="phone" value="${escapeHtml(employee.phone || "")}" placeholder="телефон" ${disabled}>
                  <input name="email" type="email" value="${escapeHtml(employee.email || "")}" placeholder="email" ${disabled}>
                </td>
                <td>
                  <input name="login" value="${escapeHtml(employee.login || "")}" ${disabled}>
                  <input name="password" type="password" value="${escapeHtml(employee.password || "")}" ${disabled}>
                </td>
                <td><select name="roleName" ${disabled}>${state.roles.map((item) => option(item.name, item.name, item.name === employee.roleName)).join("")}</select></td>
                <td><select name="active" ${disabled}>${option("true", "Активний", employee.active !== false)}${option("false", "Вимкнено", employee.active === false)}</select></td>
                <td><button class="secondary" type="button" data-save-employee="${escapeHtml(employee.id)}" ${disabled}>Зберегти</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>

    <section class="section-band">
      ${renderPermissionMatrix("Базові права ролей", "basic", ROLE_BASIC_PERMISSIONS, disabled)}
    </section>

    <section class="section-band">
      ${renderPermissionMatrix("Доступ до модулів", "views", NAV.map(([id, label]) => [id, label]), disabled)}
    </section>

    <section class="section-band">
      ${renderPermissionMatrix("Дозволи на створення документів", "documents", ROLE_DOCUMENT_PERMISSIONS, disabled)}
    </section>

    <section>
      ${renderPermissionMatrix("Дозволи на поля документів", "fields", ROLE_FIELD_PERMISSIONS, disabled)}
    </section>
  `;
}

function boolPill(value) {
  return value ? '<span class="pill good">так</span>' : '<span class="pill danger">ні</span>';
}

function formData(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  Object.keys(data).forEach((key) => {
    if (isDecimalFieldName(key)) data[key] = normalizeDecimalText(data[key]);
  });
  return data;
}

function loginUser(form) {
  const data = formData(form);
  const login = String(data.login || "").trim().toLowerCase();
  const password = String(data.password || "");
  const employee = state.employees.find((item) => item.active !== false && String(item.login || "").trim().toLowerCase() === login && String(item.password || "") === password);
  if (!employee) {
    alert("Невірний логін або пароль.");
    return;
  }
  activateEmployeeSession(employee);
  addAudit(`Вхід користувача ${employee.name}`, "system");
  render();
}

function logoutUser() {
  const employee = currentEmployee();
  sessionStorage.removeItem("arms-crm-auth-employee-id");
  authEmployeeId = "";
  addAudit(`Вихід користувача ${employee?.name || "-"}`, "system");
  render();
}

function addAudit(action, actor = state.currentManager) {
  state.audit.unshift({
    at: `${today} ${new Date().toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}`,
    actor,
    action
  });
}

function validateInvoice(data, product, serialIds = []) {
  const codeError = validateScannedCode(data.barcode, product);
  if (codeError) return codeError;
  if (product.type !== "weapon") return "";
  if (!role().canSellWeapon) return "Поточна роль не має права продавати зброю.";
  const qty = Math.max(Number(data.qty || 1), 1);
  if (!serialIds.length) return "Для зброї потрібно вибрати серійні номери.";
  if (serialIds.length !== qty) return `Кількість (${qty}) має дорівнювати кількості вибраних серій (${serialIds.length}).`;
  const duplicates = duplicateValues(serialIds);
  if (duplicates.length) return "Одна й та сама серія вибрана більше одного разу.";
  if (!data.permitNumber || !data.permitDate) return "Потрібно внести номер дозволу на покупку та дату його видачі.";
  for (const serialId of serialIds) {
    const serial = byId(state.serials, serialId);
    if (!serial) return "Серійний номер не знайдено.";
    if (!serialMatchesProduct(serial, product)) return `Серія ${serial.serial} не належить вибраній моделі.`;
    if (serialIsSold(serial)) return `Серія ${serial.serial} вже продана. Повторний продаж заблоковано.`;
    if (!serialIsOnStock(serial)) return `Серія ${serial.serial} не є доступною на складі.`;
    if (serial.actual === false) return `Серія ${serial.serial} неактуальна.`;
    if (serial.erzStatus !== "verified") return `ЄРЗ для серії ${serial.serial} не перевірено.`;
  }
  return "";
}

function createInvoice(form) {
  if (!canCreateDocument("salesInvoice")) return alert("Поточна роль не має права створювати накладні продажу.");
  const data = formData(form);
  const product = byId(state.products, data.productId);
  if (!product) return alert("Товар не знайдено.");
  const serialIds = product.type === "weapon" ? selectedValues(form.elements.serialIds) : [];
  const validation = validateInvoice(data, product, serialIds);
  if (validation) {
    alert(validation);
    if (!data.permitNumber) form.elements.permitNumber?.focus();
    else if (!data.permitDate) form.elements.permitDate?.focus();
    form.elements.permitDate?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const qty = Math.max(Number(data.qty || 1), 1);
  const price = Number(data.price || product.price);
  const discount = Math.min(Math.max(Number(data.discount || 0), 0), 100);
  const total = Math.round(qty * price * (1 - discount / 100) * 100) / 100;
  const paid = Math.min(Number(data.paid || 0), total);
  const invoice = {
    id: `inv-${String(Date.now()).slice(-8)}`,
    date: data.date || today,
    documentType: data.documentType,
    contract: data.contract,
    warehouseId: data.warehouseId,
    firmId: data.firmId,
    channel: data.channel,
    clientId: data.clientId,
    manager: data.manager || state.currentManager,
    priceType: data.priceType,
    currency: data.currency,
    total,
    paid,
    discount,
    dueDate: data.paymentMode === "Відтермінування" ? addDays(data.date || today, data.dueDays || state.settings.defaultDueDays) : (data.date || today),
    cashArticle: data.cashArticle,
    accounting: data.accounting === "true",
    locked: false,
    status: paid >= total ? "paid" : paid > 0 ? "partial" : "draft",
    lines: product.type === "weapon"
      ? serialIds.map((serialId) => {
          const serial = byId(state.serials, serialId);
          return { productId: product.id, qty: 1, price, serialId, previousSerialStatus: serial?.status || "available", permitNumber: data.permitNumber || "", permitDate: data.permitDate || "" };
        })
      : [{ productId: product.id, qty, price, serialId: "", permitNumber: "", permitDate: "" }],
    delivery: data.delivery,
    deliveryPayer: data.deliveryPayer,
    ttn: data.ttn,
    comment: data.comment
  };

  if (product.type === "weapon") {
    serialIds.forEach((serialId) => {
      const serial = byId(state.serials, serialId);
      serial.status = "sold";
      serial.clientId = data.clientId;
      serial.permitNumber = data.permitNumber;
      serial.permitDate = data.permitDate;
    });
  } else {
    decrementStock(product.id, qty);
  }

  if (paid > 0) {
    state.payments.unshift({
      id: `pay-${String(Date.now()).slice(-6)}`,
      invoiceId: invoice.id,
      date: today,
      amount: paid,
      currency: data.currency,
      rate: state.settings.rates[data.currency] || 1,
      method: data.paymentMode === "Оплачено" ? "Каса" : "Безготівка",
      bankRef: "sale-form"
    });
  }

  state.invoices.unshift(invoice);
  addAudit(`Створено накладну ${invoice.id} на ${formatMoney(total, data.currency)}`);
  saleDraft = { productId: product.id, qty: 1, serialIds: [], permitNumber: "", permitDate: "", barcode: product.barcode || "" };
  render();
}

function validateResponsibleShipment(data, product, client, serialIds) {
  if (!client || client.type !== "B2B") return "Оберіть B2B клієнта.";
  const codeError = validateScannedCode(data.barcode, product);
  if (codeError) return codeError;
  const qty = Number(data.qty || 0);
  if (qty <= 0) return "Кількість передачі має бути більшою за нуль.";
  if (product.type !== "weapon") {
    if (stockQtyWhere(product.id, isOwnStockRow) < qty) return "Недостатньо залишку на наших складах для передачі клієнту.";
    return "";
  }
  if (serialIds.length !== qty) return `Для зброї кількість (${qty}) має дорівнювати кількості вибраних серій (${serialIds.length}).`;
  const duplicates = duplicateValues(serialIds);
  if (duplicates.length) return "Одна й та сама серія вибрана більше одного разу.";
  for (const serialId of serialIds) {
    const serial = byId(state.serials, serialId);
    if (!serial) return "Серійний номер не знайдено.";
    if (!serialMatchesProduct(serial, product)) return `Серія ${serial.serial} не належить вибраному товару.`;
    if (serial.clientId) return `Серія ${serial.serial} уже прив'язана до клієнта ${clientName(serial.clientId)}.`;
    if (serial.status !== "available") return `Серія ${serial.serial} не є вільною для передачі.`;
    if (serialIsSold(serial)) return `Серія ${serial.serial} уже продана.`;
    if (serial.actual === false) return `Серія ${serial.serial} неактуальна.`;
  }
  return "";
}

function createResponsibleShipment(form) {
  if (!canCreateDocument("responsibleShipment")) return alert("Поточна роль не має права створювати передачу на відповідальне зберігання.");
  try {
    const data = formData(form);
    const client = byId(state.clients, data.clientId);
    const product = byId(state.products, data.productId);
    if (!product) throw new Error("Товар не знайдено.");
    const qty = Number(data.qty || 0);
    const serialIds = product.type === "weapon" ? selectedValues(form.elements.serialIds) : [];
    const validation = validateResponsibleShipment(data, product, client, serialIds);
    if (validation) throw new Error(validation);

    const warehouse = clientResponsibleWarehouse(client.id);
    const doc = {
      id: uniqueId("rs"),
      date: data.date || today,
      clientId: client.id,
      warehouseId: warehouse.id,
      productId: product.id,
      qty,
      serialIds,
      manager: data.manager || state.currentManager,
      paymentDays: Number(data.paymentDays || state.settings.defaultDueDays),
      status: "in_storage",
      ownership: "ours_until_client_sale",
      barcode: data.barcode || product.barcode || product.qrCode || "",
      soldQty: 0,
      invoiceIds: [],
      comment: data.comment || ""
    };

    if (product.type === "weapon") {
      serialIds.forEach((serialId) => {
        const serial = byId(state.serials, serialId);
        serial.status = "responsible_storage";
        serial.clientId = client.id;
        serial.warehouseId = warehouse.id;
        serial.responsibleStorageDocId = doc.id;
      });
    } else {
      decrementStockWhere(product.id, qty, isOwnStockRow, "Недостатньо залишку на наших складах для передачі клієнту.");
      incrementStock(product.id, warehouse.id, qty, client.id);
    }

    state.responsibleStorageDocs.unshift(doc);
    b2bDraft = { ...b2bDraft, saleClientId: client.id, saleProductId: product.id, shipmentProductId: product.id, shipmentBarcode: product.barcode || "", saleBarcode: product.barcode || "" };
    addAudit(`Передано на відповідальне зберігання ${doc.id}: ${productName(product.id)} · ${qty} од. · ${client.name}`);
    render();
  } catch (error) {
    alert(error.message);
  }
}

function validateB2BClientSale(data, product, client, serialIds) {
  if (!client || client.type !== "B2B") return "Оберіть B2B клієнта.";
  const codeError = validateScannedCode(data.barcode, product);
  if (codeError) return codeError;
  const qty = Number(data.qty || 0);
  if (qty <= 0) return "Кількість продажу має бути більшою за нуль.";
  if (product.type !== "weapon") {
    if (stockQtyWhere(product.id, (row) => row.clientId === client.id) < qty) return "Недостатньо залишку на відповідальному зберіганні цього клієнта.";
    return "";
  }
  if (!role().canSellWeapon) return "Поточна роль не має права підтверджувати продаж зброї.";
  if (!data.permitNumber || !data.permitDate) return "Для зброї потрібно внести номер дозволу покупця та дату його видачі.";
  if (serialIds.length !== qty) return `Кількість (${qty}) має дорівнювати кількості вибраних серій (${serialIds.length}).`;
  const duplicates = duplicateValues(serialIds);
  if (duplicates.length) return "Одна й та сама серія вибрана більше одного разу.";
  for (const serialId of serialIds) {
    const serial = byId(state.serials, serialId);
    if (!serial) return "Серійний номер не знайдено.";
    if (!serialMatchesProduct(serial, product)) return `Серія ${serial.serial} не належить вибраній моделі.`;
    if (serial.clientId !== client.id) return `Серія ${serial.serial} належить іншому клієнту.`;
    if (serial.status !== "responsible_storage") return `Серія ${serial.serial} не перебуває на відповідальному зберіганні цього клієнта.`;
    if (serialIsSold(serial)) return `Серія ${serial.serial} уже продана. Повторний продаж заблоковано.`;
    if (serial.actual === false) return `Серія ${serial.serial} неактуальна.`;
    if (serial.erzStatus !== "verified") return `ЄРЗ для серії ${serial.serial} не перевірено.`;
  }
  return "";
}

function applyResponsibleStorageSale(clientId, productId, qty, serialIds, invoiceId) {
  let remaining = Number(qty || 0);
  const docs = state.responsibleStorageDocs
    .filter((doc) => doc.clientId === clientId && doc.productId === productId)
    .sort((first, second) => String(first.date).localeCompare(String(second.date)));

  if (serialIds.length) {
    docs.forEach((doc) => {
      const soldFromDoc = (doc.serialIds || []).filter((serialId) => serialIds.includes(serialId)).length;
      if (!soldFromDoc) return;
      doc.soldQty = Math.min(Number(doc.qty || 0), Number(doc.soldQty || 0) + soldFromDoc);
      doc.invoiceIds = uniqueList([...(doc.invoiceIds || []), invoiceId]);
      doc.status = responsibleDocStatus(doc);
      doc.ownership = doc.status === "ownership_transferred" ? "transferred_to_client" : "ours_until_client_sale";
    });
    return;
  }

  for (const doc of docs) {
    const available = responsibleDocRemainingQty(doc);
    if (available <= 0) continue;
    const take = Math.min(available, remaining);
    doc.soldQty = Number(doc.soldQty || 0) + take;
    doc.invoiceIds = uniqueList([...(doc.invoiceIds || []), invoiceId]);
    doc.status = responsibleDocStatus(doc);
    doc.ownership = doc.status === "ownership_transferred" ? "transferred_to_client" : "ours_until_client_sale";
    remaining -= take;
    if (remaining <= 0) break;
  }
}

function createB2BClientSale(form) {
  if (!canCreateDocument("b2bSaleReport")) return alert("Поточна роль не має права створювати звіт продажу B2B.");
  try {
    const data = formData(form);
    const client = byId(state.clients, data.clientId);
    const product = byId(state.products, data.productId);
    if (!product) throw new Error("Товар не знайдено.");
    const qty = Number(data.qty || 0);
    const serialIds = product.type === "weapon" ? selectedValues(form.elements.serialIds) : [];
    const validation = validateB2BClientSale(data, product, client, serialIds);
    if (validation) throw new Error(validation);

    const price = Number(data.price || product.price || 0);
    const total = Math.round(qty * price * 100) / 100;
    const warehouse = clientResponsibleWarehouse(client.id);
    const invoice = {
      id: `inv-${String(Date.now()).slice(-8)}`,
      date: data.date || today,
      documentType: "Звіт реалізації B2B / перехід власності",
      contract: data.reportSource || "B2B відповідальне зберігання",
      warehouseId: warehouse.id,
      firmId: "vat",
      channel: "B2B відповідальне зберігання",
      clientId: client.id,
      manager: data.manager || state.currentManager,
      priceType: client.priceType || "B2B базова",
      currency: data.currency || product.currency || "UAH",
      total,
      paid: 0,
      discount: 0,
      dueDate: addDays(data.date || today, data.paymentDays || state.settings.defaultDueDays),
      cashArticle: "Продаж товарів",
      accounting: true,
      locked: false,
      status: "draft",
      responsibleStorage: true,
      paymentDays: Number(data.paymentDays || state.settings.defaultDueDays),
      lines: product.type === "weapon"
        ? serialIds.map((serialId) => ({ productId: product.id, qty: 1, price, serialId, previousSerialStatus: "responsible_storage", permitNumber: data.permitNumber || "", permitDate: data.permitDate || "" }))
        : [{ productId: product.id, qty, price, serialId: "", permitNumber: "", permitDate: "" }],
      delivery: "Склад клієнта",
      deliveryPayer: "Клієнт",
      ttn: "",
      comment: data.comment || ""
    };

    if (product.type === "weapon") {
      serialIds.forEach((serialId) => {
        const serial = byId(state.serials, serialId);
        serial.status = "sold";
        serial.permitNumber = data.permitNumber;
        serial.permitDate = data.permitDate;
        serial.ownershipTransferredAt = data.date || today;
      });
    } else {
      decrementStockWhere(product.id, qty, (row) => row.clientId === client.id, "Недостатньо залишку на складі цього B2B клієнта.");
    }

    state.invoices.unshift(invoice);
    applyResponsibleStorageSale(client.id, product.id, qty, serialIds, invoice.id);
    b2bDraft = { ...b2bDraft, saleClientId: client.id, saleProductId: product.id, saleBarcode: product.barcode || "" };
    addAudit(`Проведено продаж клієнта зі зберігання: ${invoice.id} · ${client.name} · ${formatMoney(total, invoice.currency)}`);
    render();
  } catch (error) {
    alert(error.message);
  }
}

function rollbackResponsibleStorageSale(invoice) {
  if (!invoice?.responsibleStorage) return;
  const grouped = invoice.lines.reduce((acc, line) => {
    acc[line.productId] = (acc[line.productId] || 0) + Number(line.qty || 1);
    return acc;
  }, {});

  Object.entries(grouped).forEach(([productId, qty]) => {
    let remaining = qty;
    const docs = state.responsibleStorageDocs
      .filter((doc) => doc.clientId === invoice.clientId && doc.productId === productId && (doc.invoiceIds || []).includes(invoice.id))
      .sort((first, second) => String(second.date).localeCompare(String(first.date)));
    for (const doc of docs) {
      const take = Math.min(Number(doc.soldQty || 0), remaining);
      doc.soldQty = Math.max(Number(doc.soldQty || 0) - take, 0);
      doc.invoiceIds = (doc.invoiceIds || []).filter((docInvoiceId) => docInvoiceId !== invoice.id);
      doc.status = responsibleDocStatus(doc);
      doc.ownership = doc.status === "ownership_transferred" ? "transferred_to_client" : "ours_until_client_sale";
      remaining -= take;
      if (remaining <= 0) break;
    }
  });
}

function cancelInvoice(id) {
  const invoice = byId(state.invoices, id);
  if (!invoice || invoice.status === "cancelled") return;
  if (!confirm(`Скасувати накладну ${invoice.id} і повернути її серійні номери/залишки на склад?`)) return;

  rollbackResponsibleStorageSale(invoice);
  invoice.lines.forEach((line) => {
    const product = byId(state.products, line.productId);
    if (line.serialId) {
      const serial = byId(state.serials, line.serialId);
      if (serial) {
        if (invoice.responsibleStorage) {
          serial.status = "responsible_storage";
          serial.clientId = invoice.clientId;
          serial.warehouseId = invoice.warehouseId || serial.warehouseId;
        } else {
          serial.status = line.previousSerialStatus || "available";
          if (serial.clientId === invoice.clientId) serial.clientId = "";
        }
        if (serial.permitNumber === line.permitNumber) serial.permitNumber = "";
        if (serial.permitDate === line.permitDate) serial.permitDate = "";
      }
    } else if (product?.type !== "weapon") {
      if (invoice.responsibleStorage) {
        incrementStock(line.productId, invoice.warehouseId || clientResponsibleWarehouse(invoice.clientId).id, line.qty || 0, invoice.clientId);
      } else {
        incrementStock(line.productId, invoice.warehouseId || "wh-main", line.qty || 0);
      }
    }
  });

  invoice.status = "cancelled";
  invoice.locked = true;
  invoice.paid = 0;
  addAudit(`Скасовано накладну ${invoice.id}, серії/залишки повернено`);
  render();
}

function decrementStock(productId, qty) {
  let remaining = qty;
  const rows = state.stock.filter((row) => row.productId === productId && row.qty > 0);
  for (const row of rows) {
    const take = Math.min(row.qty, remaining);
    row.qty -= take;
    remaining -= take;
    if (remaining <= 0) break;
  }
}

function incrementStock(productId, warehouseId, qty, clientId = "") {
  let row = state.stock.find((item) => item.productId === productId && item.warehouseId === warehouseId && (item.clientId || "") === clientId);
  if (!row) {
    row = { productId, warehouseId, qty: 0 };
    if (clientId) row.clientId = clientId;
    state.stock.push(row);
  }
  row.qty += Number(qty || 0);
}

function parseSerialLines(text) {
  return String(text || "")
    .split(/[\n,;]+/)
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean);
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  values.forEach((value) => {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  });
  return [...duplicates];
}

function validateWeaponRequisites(product) {
  const missing = [];
  if (!product.model) missing.push("модель");
  if (!product.caliber) missing.push("калібр");
  if (!product.brand) missing.push("бренд");
  if (!product.barcode) missing.push("QR/штрихкод");
  if (!product.supplierSku) missing.push("артикул постачальника");
  if (!product.internalCode) missing.push("внутрішній код");
  if (!product.uktzed) missing.push("УКТЗЕД");
  return missing;
}

function buildPurchase(raw, source = "manual") {
  const product = byId(state.products, raw.productId);
  if (!product) throw new Error("Позиція приходу не знайдена.");
  const qty = Number(raw.qty || 0);
  if (qty <= 0) throw new Error("Кількість приходу має бути більшою за нуль.");
  const supplier = resolveSupplier(raw);
  if (!raw.supplierDoc) throw new Error("Вкажіть документ постачальника.");
  if (!raw.warehouseId) throw new Error("Вкажіть склад приходу.");
  const scannedCode = String(raw.barcode || raw.qrCode || "").trim();
  if (!scannedCode && !product.barcode && !product.qrCode) throw new Error("QR або штрихкод обов'язковий у приході або картці товару.");
  if (scannedCode && state.products.some((item) => item.id !== product.id && item.barcode && String(item.barcode).trim().toLowerCase() === scannedCode.toLowerCase())) {
    throw new Error("Такий QR/штрихкод уже прив'язаний до іншого товару.");
  }
  if (scannedCode && product.barcode && scannedCode.toLowerCase() !== String(product.barcode).trim().toLowerCase()) {
    throw new Error(`QR/штрихкод приходу не відповідає вибраній позиції ${product.brand} ${product.model}.`);
  }

  const serials = Array.isArray(raw.serials) ? raw.serials.map((item) => String(item).trim().toUpperCase()).filter(Boolean) : parseSerialLines(raw.serials);
  if (product.type === "weapon") {
    const missing = validateWeaponRequisites(product);
    if (missing.length) throw new Error(`У картці зброї не заповнено: ${missing.join(", ")}.`);
    if (serials.length !== qty) throw new Error(`Для зброї кількість серій (${serials.length}) має дорівнювати кількості приходу (${qty}).`);
    const duplicates = duplicateValues(serials);
    if (duplicates.length) throw new Error(`Дублювання серій у документі: ${duplicates.join(", ")}.`);
    const existing = serials.filter((serial) => state.serials.some((item) => item.serial.toUpperCase() === serial));
    if (existing.length) throw new Error(`Такі серії вже існують у CRM: ${existing.join(", ")}.`);
  }

  return {
    id: raw.id || uniqueId("pin"),
    date: raw.date || today,
    documentType: raw.documentType || (source === "bas" ? "Імпорт BAS/BAF" : "Прибуткова накладна"),
    supplier,
    supplierDoc: raw.supplierDoc,
    firmId: raw.firmId || "vat",
    warehouseId: raw.warehouseId,
    productId: product.id,
    productType: product.type,
    qty,
    cost: Number(raw.cost || product.cost || 0),
    currency: raw.currency || product.costCurrency || "UAH",
    barcode: scannedCode || product.barcode || product.qrCode,
    serials: product.type === "weapon" ? serials : [],
    accounting: raw.accounting !== false && raw.accounting !== "false",
    basStatus: source === "bas" ? "imported" : (raw.accounting === false || raw.accounting === "false" ? "management" : "pending_export"),
    comment: raw.comment || ""
  };
}

function applyPurchase(purchase, options = {}) {
  const product = byId(state.products, purchase.productId);
  product.cost = purchase.cost;
  product.costCurrency = purchase.currency;
  if (!product.barcode && purchase.barcode) {
    product.barcode = purchase.barcode;
  }

  if (product.type === "weapon") {
    purchase.serials.forEach((serial, index) => {
      state.serials.unshift({
        id: uniqueId(`s-${index}`),
        productId: product.id,
        serial,
        warehouseId: purchase.warehouseId,
        status: "available",
        erzStatus: options.erzStatus || "pending",
        actual: options.actual !== false,
        basSynced: purchase.basStatus === "imported" || purchase.basStatus === "exported",
        purchaseId: purchase.id,
        clientId: "",
        permitNumber: "",
        permitDate: ""
      });
    });
  } else {
    incrementStock(product.id, purchase.warehouseId, purchase.qty);
  }

  state.purchases.unshift(purchase);
}

function createPurchase(form) {
  if (!canCreateDocument("purchase")) return alert("Поточна роль не має права створювати прихід.");
  try {
    const data = formData(form);
    const purchase = buildPurchase(data, "manual");
    applyPurchase(purchase, {
      erzStatus: data.erzStatus,
      actual: data.actual === "true"
    });
    addAudit(`Проведено прихід ${purchase.id}: ${productName(purchase.productId)} · ${purchase.qty} од.`);
    render();
  } catch (error) {
    alert(error.message);
  }
}

function createProduct(form) {
  if (!canCreateDocument("productCard")) return alert("Поточна роль не має права створювати картку товару.");
  try {
    const data = formData(form);
    const barcode = String(data.barcode || "").trim();
    if (!barcode) throw new Error("QR або штрихкод обов'язковий для створення товару.");
    if (state.products.some((product) => product.barcode && String(product.barcode).trim().toLowerCase() === barcode.toLowerCase())) {
      throw new Error("Такий QR/штрихкод уже використовується в іншому товарі.");
    }

    const type = data.type;
    let caliber = resolveDictionaryValue("calibers", data.caliberValue, data.newCaliber, "Калібр", { required: type === "weapon" });
    if (type === "weapon" && (!caliber || caliber === "без калібру")) {
      throw new Error("Для товару типу “Зброя” потрібно вказати калібр.");
    }
    if (type !== "weapon" && caliber === "без калібру") caliber = "";
    const internalCode = resolveDictionaryValue("internalCodes", data.internalCodeValue, data.newInternalCode, "Внутрішній код");
    if (state.products.some((product) => normalizedText(product.internalCode) === normalizedText(internalCode))) {
      throw new Error("Такий внутрішній код уже використовується в іншій картці товару. Для нової моделі створіть новий внутрішній код.");
    }

    const product = {
      id: `p-${String(Date.now()).slice(-6)}`,
      type,
      model: resolveDictionaryValue("models", data.modelValue, data.newModel, "Модель"),
      caliber,
      brand: resolveDictionaryValue("brands", data.brandValue, data.newBrand, "Бренд"),
      category: resolveDictionaryValue("categories", data.categoryValue, data.newCategory, "Категорія"),
      unit: resolveDictionaryValue("units", data.unitValue, data.newUnit, "Одиниця"),
      erzRequired: data.erzRequired === "true",
      barcode,
      supplierSku: resolveDictionaryValue("supplierSkus", data.supplierSkuValue, data.newSupplierSku, "Артикул постачальника"),
      internalCode,
      uktzed: resolveDictionaryValue("uktzed", data.uktzedValue, data.newUktzed, "УКТЗЕД"),
      price: Number(data.price || 0),
      currency: data.currency,
      cost: Number(data.cost || 0),
      costCurrency: data.costCurrency,
      minStock: Number(data.minStock || 0),
      leadTimeDays: Number(data.leadTimeDays || 0),
      marketplaceSku: data.marketplaceSku,
      description: data.description,
      photos: clone(productImagesDraft)
    };
    state.products.unshift(product);
    if (product.type === "regular") {
      state.stock.unshift({ productId: product.id, warehouseId: "wh-main", qty: 0 });
    }
    productImagesDraft = [];
    addAudit(`Додано товар ${product.brand} ${product.model}`);
    render();
  } catch (error) {
    alert(error.message);
  }
}

function createClient(form) {
  if (!canCreateDocument("clientCard")) return alert("Поточна роль не має права створювати клієнта.");
  const data = formData(form);
  state.clients.unshift({
    id: `c-${String(Date.now()).slice(-6)}`,
    name: data.name,
    type: data.type,
    edrpou: data.edrpou,
    phone: data.phone,
    email: data.email,
    manager: data.manager,
    paymentTerms: data.paymentTerms,
    creditLimitUAH: Number(data.creditLimitUAH || 0),
    currency: data.currency,
    priceType: data.priceType,
    taxMode: data.taxMode,
    cabinetEnabled: data.cabinetEnabled === "true",
    responsibleStorage: data.responsibleStorage === "true",
    address: data.address
  });
  addAudit(`Додано клієнта ${data.name}`);
  render();
}

function createEmployee(form) {
  if (!isAdmin()) return alert("Працівників може додавати тільки адміністратор.");
  const data = formData(form);
  state.employees.unshift({
    id: `emp-${String(Date.now()).slice(-6)}`,
    name: data.name,
    roleName: data.roleName,
    department: data.department,
    phone: data.phone,
    email: data.email,
    active: true
  });
  state.managers = state.employees.filter((employee) => employee.active).map((employee) => employee.name);
  addAudit(`Додано працівника ${data.name} з роллю ${data.roleName}`);
  render();
}

function createEmployee(form) {
  if (!isAdmin()) return alert("Працівників може додавати тільки адміністратор.");
  const data = formData(form);
  const login = String(data.login || "").trim();
  if (!login || !data.password) return alert("Вкажіть логін і пароль працівника.");
  if (state.employees.some((employee) => String(employee.login || "").trim().toLowerCase() === login.toLowerCase())) {
    return alert("Такий логін уже використовується іншим працівником.");
  }
  state.employees.unshift({
    id: `emp-${String(Date.now()).slice(-6)}`,
    name: data.name,
    roleName: data.roleName,
    department: data.department,
    phone: data.phone,
    email: data.email,
    login,
    password: data.password,
    active: true
  });
  state.managers = state.employees.filter((employee) => employee.active).map((employee) => employee.name);
  addAudit(`Додано працівника ${data.name} з роллю ${data.roleName}`);
  render();
}

function rowToForm(row) {
  const form = document.createElement("form");
  $$("input, select, textarea", row).forEach((element) => {
    if (!element.name) return;
    const input = document.createElement("input");
    input.name = element.name;
    input.value = element.value;
    form.appendChild(input);
  });
  return form;
}

function saveEmployee(id) {
  if (!isAdmin()) return alert("Дані працівників може змінювати тільки адміністратор.");
  const row = document.querySelector(`[data-employee-row="${CSS.escape(id)}"]`);
  const employee = byId(state.employees, id);
  if (!row || !employee) return;
  const data = Object.fromEntries(new FormData(rowToForm(row)).entries());
  const login = String(data.login || "").trim();
  if (!login || !data.password) return alert("Логін і пароль працівника обов'язкові.");
  if (state.employees.some((item) => item.id !== id && String(item.login || "").trim().toLowerCase() === login.toLowerCase())) {
    return alert("Такий логін уже використовується іншим працівником.");
  }
  employee.name = data.name;
  employee.department = data.department;
  employee.phone = data.phone;
  employee.email = data.email;
  employee.login = login;
  employee.password = data.password;
  employee.roleName = data.roleName;
  employee.active = data.active === "true";
  if (employee.id === state.currentEmployeeId) {
    state.currentManager = employee.name;
    state.currentRole = employee.roleName;
  }
  state.managers = state.employees.filter((item) => item.active).map((item) => item.name);
  addAudit(`Оновлено працівника ${employee.name}`);
  render();
}

function updateRolePermission(target) {
  if (!isAdmin()) {
    alert("Права ролей може змінювати тільки адміністратор.");
    render();
    return;
  }
  const roleItem = state.roles.find((item) => item.name === target.dataset.roleName);
  if (!roleItem) return;
  const group = target.dataset.roleGroup;
  const key = target.dataset.rolePermission;
  if (roleItem.name === state.currentRole && group === "basic" && key === "canManageUsers" && !target.checked) {
    alert("Не можна забрати права адміністратора у поточної активної ролі. Спочатку увійдіть під іншим адміністратором.");
    render();
    return;
  }
  if (group === "basic") {
    roleItem[key] = target.checked;
  } else {
    roleItem.access = roleItem.access || { views: {}, documents: {}, fields: {} };
    roleItem.access[group] = roleItem.access[group] || {};
    roleItem.access[group][key] = target.checked;
  }
  if (roleItem.name === state.currentRole && !canAccessView(state.currentView)) state.currentView = "dashboard";
  addAudit(`Оновлено право ролі ${roleItem.name}: ${key} = ${target.checked ? "так" : "ні"}`);
  render();
}

function createWarehouse(form) {
  if (!(role().canEditSettings || isAdmin())) return alert("Склади може змінювати тільки адміністратор.");
  const data = formData(form);
  state.warehouses.push({
    id: `wh-${String(Date.now()).slice(-6)}`,
    name: data.name,
    kind: data.kind
  });
  addAudit(`Додано склад ${data.name}`);
  render();
}

function createCashArticle(form) {
  if (!(role().canEditSettings || isAdmin())) return alert("Статті може змінювати тільки адміністратор.");
  const data = formData(form);
  if (!state.settings.cashArticles.includes(data.article)) {
    state.settings.cashArticles.push(data.article);
  }
  addAudit(`Додано статтю коштів ${data.article}`);
  render();
}

function createExpenseArticle(form) {
  if (!(role().canEditSettings || isAdmin())) return alert("Статті може змінювати тільки адміністратор.");
  const data = formData(form);
  if (!state.settings.expenseArticles.includes(data.article)) {
    state.settings.expenseArticles.push(data.article);
  }
  addAudit(`Додано статтю витрат ${data.article}`);
  render();
}

function createSerial(form) {
  if (!canCreateDocument("serialCorrection")) return alert("Поточна роль не має права змінювати серійний облік.");
  const data = formData(form);
  const normalized = data.serial.trim().toUpperCase();
  if (!normalized) return alert("Вкажіть серійний номер.");
  if (state.serials.some((serial) => serial.serial.toUpperCase() === normalized)) {
    return alert("Дублювання серійного номера заборонено.");
  }
  state.serials.unshift({
    id: `s-${String(Date.now()).slice(-6)}`,
    productId: data.productId,
    serial: normalized,
    warehouseId: data.warehouseId,
    status: data.status,
    erzStatus: data.erzStatus,
    actual: true,
    basSynced: false,
    purchaseId: "manual",
    clientId: data.clientId,
    permitNumber: "",
    permitDate: ""
  });
  addAudit(`Додано серійну одиницю ${normalized}`);
  render();
}

function createPayment(form) {
  if (!canCreateDocument("payment")) return alert("Поточна роль не має права вносити оплати.");
  const data = formData(form);
  const invoice = byId(state.invoices, data.invoiceId);
  if (!invoice) return alert("Накладна не знайдена.");
  if (isLocked(invoice.date, invoice.locked) && !role().canEditClosedDay) {
    return alert("Документ заблоковано закритим днем.");
  }
  const amount = Number(data.amount || 0);
  if (amount <= 0) return alert("Сума оплати має бути більшою за нуль.");
  const rate = Number(data.rate || state.settings.rates[data.currency] || 1);
  state.payments.unshift({
    id: `pay-${String(Date.now()).slice(-6)}`,
    invoiceId: invoice.id,
    date: data.date,
    amount,
    currency: data.currency,
    rate,
    method: data.method,
    bankRef: data.bankRef
  });
  invoice.paid = Math.min(invoice.total, invoice.paid + amount * rate / (state.settings.rates[invoice.currency] || 1));
  invoice.status = invoice.paid >= invoice.total ? "paid" : "partial";
  addAudit(`Оплату ${formatMoney(amount, data.currency)} прив'язано до ${invoice.id}`);
  render();
}

function createExpense(form) {
  if (!canCreateDocument("expense")) return alert("Поточна роль не має права створювати витрати.");
  const data = formData(form);
  const amount = Number(data.amount || 0);
  if (amount <= 0) return alert("Сума витрати має бути більшою за нуль.");
  state.expenses.unshift({
    id: `exp-${String(Date.now()).slice(-6)}`,
    date: data.date,
    article: data.article,
    amount,
    currency: data.currency,
    method: data.method,
    manager: data.manager,
    supplier: data.supplier,
    comment: data.comment
  });
  addAudit(`Додано витрату ${formatMoney(amount, data.currency)} за статтею ${data.article}`);
  render();
}

function createPayable(form) {
  if (!canCreateDocument("payable")) return alert("Поточна роль не має права створювати кредиторку.");
  const data = formData(form);
  const amount = Number(data.amount || 0);
  if (amount <= 0) return alert("Сума кредиторки має бути більшою за нуль.");
  state.payables.unshift({
    id: `ap-${String(Date.now()).slice(-6)}`,
    supplier: data.supplier,
    manager: data.manager,
    article: data.article,
    amount,
    currency: data.currency,
    dueDate: data.dueDate,
    status: "open"
  });
  addAudit(`Додано кредиторку ${data.supplier} на ${formatMoney(amount, data.currency)}`);
  render();
}

function createMarketplacePublication(form) {
  if (!canCreateDocument("marketplacePublication")) return alert("Поточна роль не має права створювати публікації маркетплейсу.");
  const data = formData(form);
  const product = byId(state.products, data.productId);
  if (!product) return alert("Товар не знайдено.");
  if (state.marketplacePublications.some((publication) => publication.marketplace === data.marketplace && publication.sku.toLowerCase() === data.sku.toLowerCase())) {
    return alert("Такий SKU вже існує на цьому маркетплейсі.");
  }
  state.marketplacePublications.unshift({
    id: uniqueId("pub"),
    marketplace: data.marketplace,
    productId: data.productId,
    sku: data.sku,
    externalId: data.externalId,
    title: data.title || `${product.brand} ${product.model}`,
    price: Number(data.price || product.price || 0),
    currency: data.currency || product.currency || "UAH",
    stockQty: productAvailableQty(product.id),
    status: "needs_sync",
    photosStatus: product.photos?.length ? "ok" : "missing",
    lastSync: "",
    manager: data.manager || state.currentManager
  });
  addAudit(`Створено публікацію ${data.marketplace} · ${data.sku}`);
  render();
}

function updateMarketplacePublication(form) {
  const data = formData(form);
  const publication = byId(state.marketplacePublications, data.id);
  if (!publication) return alert("Публікацію не знайдено.");
  publication.marketplace = data.marketplace;
  publication.productId = data.productId;
  publication.sku = data.sku;
  publication.externalId = data.externalId;
  publication.title = data.title;
  publication.price = Number(data.price || 0);
  publication.currency = data.currency;
  publication.manager = data.manager;
  publication.status = "needs_sync";
  addAudit(`Оновлено публікацію ${publication.marketplace} · ${publication.sku}`);
  document.querySelector(".modal-backdrop")?.remove();
  render();
}

function editPublication(id) {
  const publication = byId(state.marketplacePublications, id);
  if (!publication) return;
  openModal(`Редагування публікації ${publication.sku}`, `
    <form class="form-grid" data-action="update-marketplace-publication">
      <input type="hidden" name="id" value="${escapeHtml(publication.id)}">
      <label class="field"><span>Маркетплейс</span><select name="marketplace">${marketplaceNames().map((name) => option(name, name, name === publication.marketplace)).join("")}</select></label>
      <label class="field wide"><span>Товар</span><select name="productId">${state.products.map((product) => option(product.id, `${product.brand} ${product.model}`, product.id === publication.productId)).join("")}</select></label>
      <label class="field"><span>SKU</span><input name="sku" value="${escapeHtml(publication.sku)}" required></label>
      <label class="field"><span>Зовнішній ID</span><input name="externalId" value="${escapeHtml(publication.externalId || "")}"></label>
      <label class="field wide"><span>Назва</span><input name="title" value="${escapeHtml(publication.title)}" required></label>
      <label class="field"><span>Ціна</span><input name="price" type="number" min="0" value="${publication.price}"></label>
      <label class="field"><span>Валюта</span><select name="currency">${Object.keys(state.settings.rates).map((currency) => option(currency, currency, currency === publication.currency)).join("")}</select></label>
      <label class="field"><span>Менеджер</span><select name="manager">${employeeOptions(publication.manager)}</select></label>
      <button class="primary" type="submit">Зберегти</button>
    </form>
  `);
  attachFieldSuggestions();
}

function syncPublication(id) {
  const publication = byId(state.marketplacePublications, id);
  if (!publication) return;
  const product = byId(state.products, publication.productId);
  publication.stockQty = productAvailableQty(publication.productId);
  publication.photosStatus = product?.photos?.length ? "ok" : "missing";
  publication.status = "published";
  publication.lastSync = `${today} ${new Date().toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}`;
  addAudit(`${publication.marketplace}: синхронізовано публікацію ${publication.sku}`, "system");
  render();
}

function syncMarketplaceStocks() {
  state.marketplacePublications.forEach((publication) => {
    publication.stockQty = productAvailableQty(publication.productId);
    publication.status = "needs_sync";
  });
  addAudit("Оновлено залишки для відправки на маркетплейси", "system");
  render();
}

function syncMarketplacePrices() {
  state.marketplacePublications.forEach((publication) => {
    const product = byId(state.products, publication.productId);
    if (!product) return;
    publication.price = Math.round(uah(product.price, product.currency));
    publication.currency = "UAH";
    publication.status = "needs_sync";
  });
  addAudit("Оновлено ціни публікацій по поточному курсу CRM", state.currentManager);
  render();
}

function exportMarketplaceCatalog(marketplace) {
  const payload = {
    exportedAt: `${today} ${new Date().toLocaleTimeString("uk-UA")}`,
    marketplace,
    publications: state.marketplacePublications
      .filter((publication) => publication.marketplace === marketplace)
      .map(publicationPayload)
  };
  downloadJson(`marketplace-${marketplace}-${today}.json`, payload);
}

function importMarketplaceCatalog(form) {
  try {
    const data = formData(form);
    const payload = JSON.parse(data.payload || "{}");
    const rows = Array.isArray(payload) ? payload : payload.publications;
    if (!Array.isArray(rows)) throw new Error("JSON має містити масив publications.");
    rows.forEach((row) => {
      const existing = state.marketplacePublications.find((publication) => publication.marketplace === row.marketplace && publication.sku === row.sku);
      if (existing) {
        Object.assign(existing, { ...row, status: "needs_sync" });
      } else {
        state.marketplacePublications.unshift({
          id: uniqueId("pub"),
          marketplace: row.marketplace,
          productId: row.productId,
          sku: row.sku,
          externalId: row.externalId || "",
          title: row.title || row.sku,
          price: Number(row.price || 0),
          currency: row.currency || "UAH",
          stockQty: Number(row.stockQty || 0),
          status: row.status || "needs_sync",
          photosStatus: row.photosStatus || "unknown",
          lastSync: "",
          manager: row.manager || state.currentManager
        });
      }
    });
    addAudit(`Імпортовано публікацій маркетплейсів: ${rows.length}`, "system");
    render();
  } catch (error) {
    alert(`Помилка імпорту публікацій: ${error.message}`);
  }
}

function importDemoMarketplaceOrder() {
  const publication = state.marketplacePublications[0];
  if (!publication) return alert("Спочатку створіть публікацію.");
  const stamp = String(Date.now()).slice(-5);
  state.marketplaceOrders.unshift({
    id: uniqueId("mpo"),
    marketplace: publication.marketplace,
    externalOrderId: `${publication.marketplace.slice(0, 2).toUpperCase()}-${today.replaceAll("-", "")}-${stamp}`,
    date: today,
    status: "new_order",
    manager: publication.manager || state.currentManager,
    productId: publication.productId,
    sku: publication.sku,
    qty: 1,
    price: publication.price,
    currency: publication.currency,
    buyer: { name: `Покупець ${stamp}`, phone: `+38050${stamp}00`, email: `buyer${stamp}@example.com`, edrpou: "", address: "Нова пошта, відділення уточнюється" },
    delivery: { service: "Нова пошта", city: "Київ", warehouse: "відділення уточнюється", ttn: "" },
    payment: { method: "Маркетплейс", status: "expected", amount: publication.price, source: `${publication.marketplace}Pay` },
    clientId: "",
    invoiceId: ""
  });
  addAudit(`${publication.marketplace}: нове замовлення передано менеджеру ${publication.manager || state.currentManager}`, "system");
  render();
}

function ensureClientFromMarketplaceOrder(order) {
  let client = state.clients.find((item) => item.phone && item.phone === order.buyer.phone) || state.clients.find((item) => item.email && item.email === order.buyer.email);
  if (!client) {
    client = {
      id: uniqueId("c"),
      name: order.buyer.name,
      type: "Retail",
      manager: order.manager,
      paymentTerms: "Оплата через маркетплейс",
      creditLimitUAH: 0,
      cabinetEnabled: false,
      edrpou: order.buyer.edrpou || "",
      phone: order.buyer.phone || "",
      email: order.buyer.email || "",
      priceType: "Маркетплейс",
      currency: order.currency,
      taxMode: "роздріб",
      responsibleStorage: false,
      address: order.buyer.address || ""
    };
    state.clients.unshift(client);
  }
  order.clientId = client.id;
  return client;
}

function notifyMarketplaceOrder(id) {
  const order = byId(state.marketplaceOrders, id);
  if (!order) return;
  order.notifiedAt = `${today} ${new Date().toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}`;
  addAudit(`Менеджера ${order.manager} повідомлено про замовлення ${order.externalOrderId}`, "system");
  render();
}

function createClientFromOrder(id) {
  const order = byId(state.marketplaceOrders, id);
  if (!order) return;
  const client = ensureClientFromMarketplaceOrder(order);
  addAudit(`Створено/оновлено клієнта ${client.name} із замовлення ${order.externalOrderId}`);
  render();
}

function agreeMarketplaceOrder(id) {
  const order = byId(state.marketplaceOrders, id);
  if (!order) return;
  ensureClientFromMarketplaceOrder(order);
  order.status = "agreed";
  addAudit(`Замовлення ${order.externalOrderId} узгоджено з покупцем`);
  render();
}

function createInvoiceFromMarketplaceOrder(id) {
  const order = byId(state.marketplaceOrders, id);
  if (!order) return;
  if (order.invoiceId) return alert("Накладна вже створена.");
  if (order.status !== "agreed") return alert("Спочатку узгодьте асортимент, доставку та оплату з покупцем.");
  const product = byId(state.products, order.productId);
  if (!product) return alert("Товар не знайдено.");
  if (product.type === "weapon") return alert("Для зброї автоматична накладна з маркетплейсу заблокована: потрібно вибрати серії та внести дозвіл покупця у продажі.");
  if (productAvailableQty(product.id) < Number(order.qty || 1)) return alert("Недостатньо залишку для створення накладної.");
  const client = ensureClientFromMarketplaceOrder(order);
  const total = Number(order.qty || 1) * Number(order.price || 0);
  const invoice = {
    id: `inv-${String(Date.now()).slice(-8)}`,
    date: today,
    documentType: "Видаткова накладна",
    contract: order.externalOrderId,
    warehouseId: "wh-main",
    firmId: "fop",
    channel: order.marketplace,
    clientId: client.id,
    manager: order.manager,
    priceType: "Маркетплейс",
    currency: order.currency,
    total,
    paid: order.payment.status === "paid" ? total : 0,
    discount: 0,
    dueDate: today,
    cashArticle: "Продаж товарів",
    accounting: false,
    locked: false,
    status: order.payment.status === "paid" ? "paid" : "draft",
    lines: [{ productId: product.id, qty: Number(order.qty || 1), price: Number(order.price || 0), serialId: "", permitNumber: "", permitDate: "" }],
    delivery: order.delivery.service,
    deliveryPayer: "Маркетплейс",
    ttn: order.delivery.ttn,
    comment: `Маркетплейс ${order.marketplace}, замовлення ${order.externalOrderId}`
  };
  decrementStock(product.id, order.qty);
  state.invoices.unshift(invoice);
  order.invoiceId = invoice.id;
  order.status = "invoiced";
  addAudit(`Створено накладну ${invoice.id} з маркетплейс-замовлення ${order.externalOrderId}`);
  render();
}

function pullMarketplacePayment(id) {
  const order = byId(state.marketplaceOrders, id);
  if (!order) return;
  order.payment.status = "paid";
  if (order.invoiceId) {
    const invoice = byId(state.invoices, order.invoiceId);
    if (invoice && invoice.paid < invoice.total) {
      invoice.paid = invoice.total;
      invoice.status = "paid";
      state.payments.unshift({
        id: `pay-${String(Date.now()).slice(-6)}`,
        invoiceId: invoice.id,
        date: today,
        amount: invoice.total,
        currency: invoice.currency,
        rate: state.settings.rates[invoice.currency] || 1,
        method: "Маркетплейс / поштовий сервіс",
        bankRef: order.payment.source
      });
    }
  }
  addAudit(`Підтягнуто оплату по маркетплейс-замовленню ${order.externalOrderId}`, "system");
  render();
}

function updateRates(form) {
  if (!(role().canEditSettings || isAdmin())) return alert("Курси та налаштування може змінювати тільки адміністратор.");
  const data = formData(form);
  Object.keys(state.settings.rates).forEach((currency) => {
    state.settings.rates[currency] = Number(data[currency] || state.settings.rates[currency]);
  });
  addAudit("Оновлено курси валют");
  render();
}

function updateClosedDay(form) {
  if (!role().canEditClosedDay) return alert("Поточна роль не може змінювати закритий день.");
  const data = formData(form);
  state.settings.closedDay = data.closedDay;
  addAudit(`Закритий день змінено на ${data.closedDay}`);
  render();
}

function openInvoice(id) {
  const invoice = byId(state.invoices, id);
  if (!invoice) return;
  const lines = invoice.lines.map((line) => {
    const serial = line.serialId ? byId(state.serials, line.serialId) : null;
    return `
      <tr>
        <td>${productName(line.productId)}</td>
        <td>${line.qty}</td>
        <td>${formatMoney(line.price, invoice.currency)}</td>
        <td>${serial ? serial.serial : "-"}</td>
        <td>${line.permitNumber || "-"} ${line.permitDate ? `<br><span class="small muted">${line.permitDate}</span>` : ""}</td>
      </tr>
    `;
  }).join("");
  openModal(`Накладна ${invoice.id}`, `
    <div class="stack">
      <p><strong>${clientName(invoice.clientId)}</strong><br><span class="muted">${firmName(invoice.firmId)} · ${invoice.channel} · ${invoice.manager}</span></p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Товар</th><th>К-сть</th><th>Ціна</th><th>Серія</th><th>Дозвіл</th></tr></thead>
          <tbody>${lines}</tbody>
        </table>
      </div>
      <p class="notice">Сума: <strong>${formatMoney(invoice.total, invoice.currency)}</strong>. Оплачено: <strong>${formatMoney(invoice.paid, invoice.currency)}</strong>. Доставка: ${invoice.delivery}, ${invoice.ttn || "ТТН не внесено"}.</p>
    </div>
  `);
}

function openCabinetLegacy(id) {
  const client = byId(state.clients, id);
  const rows = inventoryRows().filter((row) => row.clientId === id);
  const invoices = state.invoices.filter((invoice) => invoice.clientId === id);
  openModal(`B2B кабінет · ${client.name}`, `
    <div class="grid two">
      <div class="card">
        <h3>Відповідальне зберігання</h3>
        ${rows.length ? rows.map((row) => `<p><strong>${row.product.brand} ${row.product.model}</strong><br><span class="muted">${row.qty} од. · ${warehouseName(row.warehouseId)}</span></p>`).join("") : '<p class="muted">Немає залишків.</p>'}
      </div>
      <div class="card">
        <h3>Проплати</h3>
        ${invoices.map((invoice) => `<p><strong>${invoice.id}</strong><br><span class="muted">${formatMoney(invoice.paid, invoice.currency)} з ${formatMoney(invoice.total, invoice.currency)}</span></p>`).join("") || '<p class="muted">Немає накладних.</p>'}
      </div>
    </div>
    <p class="notice">У production-версії цей кабінет матиме окремий вхід клієнта, обмеження видимості даних, роздрібний інтерфейс продажу та підтвердження менеджером.</p>
  `);
}

function openCabinet(id) {
  const client = byId(state.clients, id);
  if (!client) return;
  const rows = clientStorageRows(id);
  const docs = responsibleStorageRows(id);
  const invoices = state.invoices.filter((invoice) => invoice.clientId === id);
  const paymentDebt = invoices.reduce((sum, invoice) => sum + invoice.total - invoice.paid, 0);
  const serialRows = clientStorageSerials(id, "", true);
  openModal(`B2B кабінет · ${client.name}`, `
    <div class="stack">
      <div class="inline-actions">
        <button class="secondary" data-export-b2b-report="stock" data-client-id="${client.id}">Звіт залишків JSON</button>
        <button class="secondary" data-export-b2b-report="payments" data-client-id="${client.id}">Звіт оплат JSON</button>
        <button class="secondary" data-export-b2b-report="inventory" data-client-id="${client.id}">Інвентаризація JSON</button>
      </div>
      <div class="grid three">
        <article class="card metric warn"><span>На зберіганні</span><strong>${rows.reduce((sum, row) => sum + row.qty, 0)} од.</strong><small>Товар залишається нашим до продажу клієнтом.</small></article>
        <article class="card metric danger"><span>До оплати</span><strong>${formatMoney(paymentDebt)}</strong><small>Борг після звітів продажу клієнтом.</small></article>
        <article class="card metric info"><span>Документи</span><strong>${docs.length}</strong><small>Передачі на склад клієнта.</small></article>
      </div>

      <section class="panel">
        <h3>Що відвантажено на відповідальне зберігання</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Документ</th><th>Дата</th><th>Товар</th><th>Передано</th><th>Продано</th><th>Залишок</th><th>Серії</th><th>Оплата</th><th>Статус</th></tr></thead>
            <tbody>
              ${docs.map((row) => `
                <tr>
                  <td><strong>${row.id}</strong><br><span class="small muted">${escapeHtml(row.manager || "-")}</span></td>
                  <td>${row.date}</td>
                  <td>${productName(row.productId)}<br><span class="small muted">${productCodes(row.product)}</span></td>
                  <td>${row.qty}</td>
                  <td>${row.soldQty}</td>
                  <td><strong>${row.remainingQty}</strong></td>
                  <td>${serialBadges(row.serialIds)}</td>
                  <td>${row.paymentDays || state.settings.defaultDueDays} днів після продажу</td>
                  <td>${statusPill(row.derivedStatus)}<br><span class="small muted">${ownershipLabel(row)}</span></td>
                </tr>
              `).join("") || '<tr><td colspan="9" class="muted">Передач на відповідальне зберігання ще немає.</td></tr>'}
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel">
        <h3>Залишки клієнта та інвентаризація</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Товар</th><th>QR / штрихкод</th><th>Склад</th><th>Кількість</th><th>Собівартість</th><th>Серійні номери зброї</th></tr></thead>
            <tbody>
              ${rows.map((row) => {
                const serials = row.product.type === "weapon"
                  ? clientStorageSerials(id, row.product.id).map((serial) => serial.id)
                  : [];
                return `
                  <tr>
                    <td><strong>${row.product.brand}</strong><br>${row.product.model}</td>
                    <td>${productCodes(row.product)}</td>
                    <td>${warehouseName(row.warehouseId)}</td>
                    <td>${row.qty}</td>
                    <td>${formatMoney(row.valueUAH)}</td>
                    <td>${serialBadges(serials)}</td>
                  </tr>
                `;
              }).join("") || '<tr><td colspan="6" class="muted">Немає залишків на складі клієнта.</td></tr>'}
            </tbody>
          </table>
        </div>
        <p class="notice small">Для інвентаризації зброя перевіряється за серійними номерами, звичайні товари — по QR або штрихкодах.</p>
      </section>

      <section class="panel">
        <h3>Оплати та дебіторка</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Накладна</th><th>Дата</th><th>Сума</th><th>Оплачено</th><th>Борг</th><th>Оплатити до</th><th>Стан</th></tr></thead>
            <tbody>
              ${invoices.map((invoice) => `
                <tr>
                  <td><strong>${invoice.id}</strong><br><span class="small muted">${invoice.channel}</span></td>
                  <td>${invoice.date}</td>
                  <td>${formatMoney(invoice.total, invoice.currency)}</td>
                  <td>${formatMoney(invoice.paid, invoice.currency)}</td>
                  <td>${formatMoney(invoice.total - invoice.paid, invoice.currency)}</td>
                  <td>${invoice.dueDate || "-"}</td>
                  <td>${statusPill(invoice.status)}</td>
                </tr>
              `).join("") || '<tr><td colspan="7" class="muted">Накладних і оплат ще немає.</td></tr>'}
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel">
        <h3>Серійні номери в кабінеті</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Серія</th><th>Товар</th><th>Склад</th><th>Стан</th><th>ЄРЗ</th><th>Дозвіл</th></tr></thead>
            <tbody>
              ${serialRows.map((serial) => `
                <tr>
                  <td><strong>${serial.serial}</strong></td>
                  <td>${productName(serial.productId)}</td>
                  <td>${warehouseName(serial.warehouseId)}</td>
                  <td>${statusPill(serial.status)}</td>
                  <td>${statusPill(serial.erzStatus)}</td>
                  <td>${serial.permitNumber ? `${escapeHtml(serial.permitNumber)}<br><span class="small muted">${serial.permitDate || "-"}</span>` : "-"}</td>
                </tr>
              `).join("") || '<tr><td colspan="6" class="muted">Серійних товарів у кабінеті немає.</td></tr>'}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `);
}

function openPayment(id) {
  state.currentView = "finance";
  render();
  setTimeout(() => {
    const select = $('[name="invoiceId"]');
    if (select) select.value = id;
  });
}

function openModal(title, body) {
  const template = $("#modal-template").content.cloneNode(true);
  $(".modal-head h2", template).textContent = title;
  $(".modal-body", template).innerHTML = body;
  document.body.appendChild(template);
  prepareDecimalInputs(document.body.lastElementChild);
}

function exportB2BReport(clientId, type) {
  const client = byId(state.clients, clientId);
  if (!client) return;
  let payload;
  if (type === "payments") {
    payload = state.invoices
      .filter((invoice) => invoice.clientId === clientId)
      .map((invoice) => ({
        invoiceId: invoice.id,
        date: invoice.date,
        dueDate: invoice.dueDate,
        channel: invoice.channel,
        total: invoice.total,
        paid: invoice.paid,
        debt: invoice.total - invoice.paid,
        currency: invoice.currency,
        status: invoice.status
      }));
  } else if (type === "inventory") {
    payload = clientStorageRows(clientId).map((row) => ({
      productId: row.product.id,
      product: `${row.product.brand} ${row.product.model}`,
      type: row.product.type,
      warehouse: warehouseName(row.warehouseId),
      qty: row.qty,
      barcode: row.product.barcode || "",
      qrCode: row.product.qrCode || "",
      serials: row.product.type === "weapon" ? clientStorageSerials(clientId, row.product.id).map((serial) => serial.serial) : [],
      valueUAH: row.valueUAH
    }));
  } else {
    payload = responsibleStorageRows(clientId).map((row) => ({
      documentId: row.id,
      date: row.date,
      productId: row.productId,
      product: productName(row.productId),
      barcode: row.product?.barcode || "",
      qty: row.qty,
      soldQty: row.soldQty,
      remainingQty: row.remainingQty,
      serials: (row.serialIds || []).map((serialId) => byId(state.serials, serialId)?.serial).filter(Boolean),
      paymentDays: row.paymentDays,
      status: row.derivedStatus,
      ownership: ownershipLabel(row)
    }));
  }
  downloadJson(`b2b-${type}-${safeFilePart(client.name)}-${today}.json`, {
    client: { id: client.id, name: client.name, edrpou: client.edrpou || "" },
    reportType: type,
    generatedAt: `${today} ${new Date().toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}`,
    rows: payload
  });
}

function exportJson() {
  downloadJson(`arms-crm-export-${today}.json`, state);
}

function downloadJson(filename, value) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function basPurchasePayload(purchases) {
  return {
    exportedAt: `${today}T00:00:00+03:00`,
    source: "Arms CRM",
    target: "BAS/BAF",
    purchases: purchases.map((purchase) => {
      const product = byId(state.products, purchase.productId);
      return {
        id: purchase.id,
        date: purchase.date,
        documentType: purchase.documentType,
        supplier: purchase.supplier,
        supplierDoc: purchase.supplierDoc,
        firmId: purchase.firmId,
        warehouseId: purchase.warehouseId,
        productId: purchase.productId,
        internalCode: product?.internalCode,
        barcode: purchase.barcode || product?.barcode,
        productType: purchase.productType,
        qty: purchase.qty,
        cost: purchase.cost,
        currency: purchase.currency,
        serials: purchase.serials || [],
        uktzed: product?.uktzed,
        accounting: purchase.accounting
      };
    })
  };
}

function exportBasPurchases(purchaseIds = null) {
  const purchases = state.purchases.filter((purchase) => {
    if (purchaseIds) return purchaseIds.includes(purchase.id);
    return purchase.accounting;
  });
  if (!purchases.length) return alert("Немає приходів для BAS/BAF експорту.");
  downloadJson(`bas-baf-purchases-${today}.json`, basPurchasePayload(purchases));
  addAudit(`Сформовано BAS/BAF експорт приходів: ${purchases.length}`);
}

function markPurchaseExported(id) {
  const purchase = byId(state.purchases, id);
  if (!purchase) return;
  purchase.basStatus = "exported";
  state.serials
    .filter((serial) => serial.purchaseId === purchase.id)
    .forEach((serial) => {
      serial.basSynced = true;
    });
  addAudit(`Прихід ${purchase.id} підтверджено як експортований у BAS/BAF`);
  render();
}

function importBasPurchases(form) {
  try {
    const data = formData(form);
    const payload = JSON.parse(data.basPayload || "{}");
    const rows = Array.isArray(payload) ? payload : payload.purchases;
    if (!Array.isArray(rows) || !rows.length) throw new Error("JSON має містити масив purchases.");
    rows.forEach((row) => {
      const internalCodeMatches = row.productId ? [] : state.products.filter((product) => product.internalCode === row.internalCode);
      if (!row.productId && internalCodeMatches.length > 1) {
        throw new Error(`BAS/BAF не може однозначно знайти товар за внутрішнім кодом ${row.internalCode}: знайдено ${internalCodeMatches.length} карток.`);
      }
      const purchase = buildPurchase({
        ...row,
        accounting: true,
        productId: row.productId || internalCodeMatches[0]?.id
      }, "bas");
      applyPurchase(purchase, {
        erzStatus: row.erzStatus || "pending",
        actual: row.actual !== false
      });
    });
    addAudit(`Імпортовано BAS/BAF приходів: ${rows.length}`, "system");
    render();
  } catch (error) {
    alert(`Помилка імпорту BAS/BAF: ${error.message}`);
  }
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.id === "logout-button") {
    logoutUser();
    return;
  }
  if (target.dataset.saveEmployee) {
    saveEmployee(target.dataset.saveEmployee);
    return;
  }
  if (target.dataset.view) {
    if (!canAccessView(target.dataset.view)) return alert("Поточна роль не має доступу до цього розділу.");
    state.currentView = target.dataset.view;
    render();
  }
  if (target.dataset.quickProduct) {
    saleDraft.productId = target.dataset.quickProduct;
    const product = byId(state.products, saleDraft.productId);
    saleDraft.barcode = product?.barcode || "";
    saleDraft.serialIds = [];
    state.currentView = "sales";
    render();
  }
  if (target.dataset.generateProductBarcode !== undefined) {
    const form = target.closest('[data-action="create-product"]');
    const barcodeInput = form?.elements.barcode;
    if (barcodeInput) barcodeInput.value = generateEan13();
  }
  if (target.dataset.removeProductPhoto) {
    productImagesDraft = productImagesDraft.filter((photo) => photo.id !== target.dataset.removeProductPhoto);
    renderProductPhotoPreview();
  }
  if (target.dataset.exportMarketplace) exportMarketplaceCatalog(target.dataset.exportMarketplace);
  if (target.dataset.syncMarketplaceStocks !== undefined) syncMarketplaceStocks();
  if (target.dataset.syncMarketplacePrices !== undefined) syncMarketplacePrices();
  if (target.dataset.importMarketplaceOrders !== undefined) importDemoMarketplaceOrder();
  if (target.dataset.editPublication) editPublication(target.dataset.editPublication);
  if (target.dataset.syncPublication) syncPublication(target.dataset.syncPublication);
  if (target.dataset.notifyMarketplaceOrder) notifyMarketplaceOrder(target.dataset.notifyMarketplaceOrder);
  if (target.dataset.createClientFromOrder) createClientFromOrder(target.dataset.createClientFromOrder);
  if (target.dataset.agreeMarketplaceOrder) agreeMarketplaceOrder(target.dataset.agreeMarketplaceOrder);
  if (target.dataset.invoiceMarketplaceOrder) createInvoiceFromMarketplaceOrder(target.dataset.invoiceMarketplaceOrder);
  if (target.dataset.pullMarketplacePayment) pullMarketplacePayment(target.dataset.pullMarketplacePayment);
  if (target.dataset.openInvoice) openInvoice(target.dataset.openInvoice);
  if (target.dataset.openCabinet) openCabinet(target.dataset.openCabinet);
  if (target.dataset.exportB2bReport) exportB2BReport(target.dataset.clientId, target.dataset.exportB2bReport);
  if (target.dataset.payInvoice) openPayment(target.dataset.payInvoice);
  if (target.dataset.cancelInvoice) cancelInvoice(target.dataset.cancelInvoice);
  if (target.dataset.lockInvoice) {
    const invoice = byId(state.invoices, target.dataset.lockInvoice);
    invoice.locked = true;
    addAudit(`Накладну ${invoice.id} закрито від редагування`);
    render();
  }
  if (target.dataset.verifySerial) {
    const serial = byId(state.serials, target.dataset.verifySerial);
    serial.erzStatus = "verified";
    addAudit(`ЄРЗ підтверджено для серії ${serial.serial}`);
    render();
  }
  if (target.dataset.sync) {
    const integration = byId(state.integrations, target.dataset.sync);
    integration.status = "ok";
    integration.lastSync = `${today} ${new Date().toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}`;
    addAudit(`${integration.name}: виконано ручний двосторонній обмін`, "system");
    render();
  }
  if (target.dataset.exportBasPurchases !== undefined) {
    exportBasPurchases();
  }
  if (target.dataset.exportOnePurchase) {
    exportBasPurchases([target.dataset.exportOnePurchase]);
  }
  if (target.dataset.markPurchaseExported) {
    markPurchaseExported(target.dataset.markPurchaseExported);
  }
  if (target.dataset.basImportDemo !== undefined) {
    const demo = {
      purchases: [
        {
          date: today,
          supplier: "BAS demo supplier",
          supplierDoc: `BAS-${String(Date.now()).slice(-5)}`,
          firmId: "vat",
          warehouseId: "wh-main",
          productId: "p-100",
          qty: 1,
          cost: 1500,
          currency: "USD",
          serials: [`BAS-DEMO-${String(Date.now()).slice(-5)}`],
          erzStatus: "pending",
          actual: true
        }
      ]
    };
    const form = $('[data-action="import-bas-purchases"]');
    const textarea = form?.querySelector('[name="basPayload"]');
    if (textarea) textarea.value = JSON.stringify(demo, null, 2);
  }
  if (target.dataset.type) {
    $$(".segmented button").forEach((button) => button.classList.toggle("active", button === target));
    const type = target.dataset.type;
    $("#products-body").innerHTML = productRows(type === "all" ? state.products : state.products.filter((product) => product.type === type));
  }
  if (target.dataset.createInventoryReport !== undefined) {
    const value = formatMoney(inventoryRows().reduce((sum, row) => sum + row.valueUAH, 0));
    openModal("Інвентаризаційний звіт", `<p class="notice">Сформовано на ${today}. Загальна вартість залишків: <strong>${value}</strong>. Рядків у звіті: ${inventoryRows().length}.</p>`);
  }
  if (target.id === "export-json") exportJson();
  if (target.id === "reset-demo") {
    if (confirm("Скинути локальні demo-дані?")) {
      state = normalizeState(clone(seedState));
      saleDraft = { productId: "p-200", qty: 1, serialIds: [], permitNumber: "", permitDate: "", barcode: "" };
      b2bDraft = { shipmentProductId: "p-100", saleProductId: "p-100", saleClientId: "c-001" };
      productImagesDraft = [];
      render();
    }
  }
  if (target.dataset.closeModal !== undefined) target.closest(".modal-backdrop").remove();
});

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-product-photos]")) {
    handleProductPhotos(event.target);
  }
  const reportBuilder = event.target.closest("[data-report-builder]");
  if (reportBuilder) {
    const data = formData(reportBuilder);
    state.reportBuilder = {
      reportId: data.reportId || state.reportBuilder.reportId,
      from: data.from || "2026-05-01",
      to: data.to || today,
      columns: selectedValues(reportBuilder.elements.columns),
      sortBy: data.sortBy || "date",
      sortDir: data.sortDir || "desc",
      groupBy: data.groupBy || ""
    };
    render();
    return;
  }
  if (event.target.id === "role-select") {
    render();
  }
  if (event.target.id === "manager-select") {
    render();
  }
  if (event.target.dataset.rolePermission) {
    updateRolePermission(event.target);
    return;
  }
  if (event.target.dataset.employeeRole) {
    if (!isAdmin()) {
      alert("Ролі працівників змінює тільки адміністратор.");
      render();
      return;
    }
    const employee = byId(state.employees, event.target.dataset.employeeRole);
    if (employee) {
      employee.roleName = event.target.value;
      if (employee.id === state.currentEmployeeId) {
        state.currentRole = employee.roleName;
      }
      addAudit(`Роль працівника ${employee.name} змінено на ${employee.roleName}`);
      render();
    }
  }
  if (event.target.matches("[data-sale-product]")) {
    saleDraft.productId = event.target.value;
    const product = byId(state.products, saleDraft.productId);
    saleDraft.barcode = product?.barcode || "";
    saleDraft.serialIds = [];
    render();
  }
  if (event.target.matches("[data-sale-barcode]")) {
    const product = findProductByCode(event.target.value);
    saleDraft.barcode = event.target.value;
    if (product) {
      saleDraft.productId = product.id;
      saleDraft.serialIds = [];
      render();
    }
  }
  if (event.target.matches("[data-purchase-barcode]")) {
    const product = findProductByCode(event.target.value);
    const form = event.target.closest('[data-action="create-purchase"]');
    if (product && form?.elements.productId) {
      form.elements.productId.value = product.id;
    }
  }
  if (event.target.matches("[data-b2b-shipment-product]")) {
    const product = byId(state.products, event.target.value);
    b2bDraft = { ...b2bDraft, shipmentProductId: event.target.value, shipmentBarcode: product?.barcode || product?.qrCode || "" };
    render();
  }
  if (event.target.matches("[data-b2b-shipment-barcode]")) {
    const product = findProductByCode(event.target.value);
    b2bDraft = { ...b2bDraft, shipmentBarcode: event.target.value };
    if (product) {
      b2bDraft.shipmentProductId = product.id;
      render();
    }
  }
  if (event.target.matches("[data-b2b-sale-client]")) {
    b2bDraft = { ...b2bDraft, saleClientId: event.target.value };
    render();
  }
  if (event.target.matches("[data-b2b-sale-product]")) {
    const product = byId(state.products, event.target.value);
    b2bDraft = { ...b2bDraft, saleProductId: event.target.value, saleBarcode: product?.barcode || product?.qrCode || "" };
    render();
  }
  if (event.target.matches("[data-b2b-sale-barcode]")) {
    const product = findProductByCode(event.target.value);
    b2bDraft = { ...b2bDraft, saleBarcode: event.target.value };
    if (product) {
      b2bDraft.saleProductId = product.id;
      render();
    }
  }
  const saleForm = event.target.closest('[data-action="create-invoice"]');
  if (saleForm && !event.target.matches("[data-sale-product]")) {
    const data = formData(saleForm);
    saleDraft = {
      productId: data.productId,
      qty: data.qty,
      serialIds: selectedValues(saleForm.elements.serialIds),
      permitNumber: data.permitNumber,
      permitDate: data.permitDate,
      barcode: data.barcode
    };
  }
});

document.addEventListener("input", (event) => {
  const form = event.target.closest('[data-action="create-invoice"]');
  if (!form) return;
  const data = formData(form);
  saleDraft = {
    productId: data.productId,
    qty: data.qty,
    serialIds: selectedValues(form.elements.serialIds),
    permitNumber: data.permitNumber,
    permitDate: data.permitDate,
    barcode: data.barcode
  };
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("form[data-action]");
  if (!form) return;
  event.preventDefault();
  const action = form.dataset.action;
  if (action === "login") {
    loginUser(form);
    return;
  }
  if (action === "create-invoice") createInvoice(form);
  if (action === "create-responsible-shipment") createResponsibleShipment(form);
  if (action === "create-b2b-client-sale") createB2BClientSale(form);
  if (action === "create-purchase") createPurchase(form);
  if (action === "create-product") createProduct(form);
  if (action === "create-client") createClient(form);
  if (action === "create-employee") createEmployee(form);
  if (action === "create-warehouse") createWarehouse(form);
  if (action === "create-cash-article") createCashArticle(form);
  if (action === "create-expense-article") createExpenseArticle(form);
  if (action === "create-serial") createSerial(form);
  if (action === "create-payment") createPayment(form);
  if (action === "create-expense") createExpense(form);
  if (action === "create-payable") createPayable(form);
  if (action === "create-marketplace-publication") createMarketplacePublication(form);
  if (action === "update-marketplace-publication") updateMarketplacePublication(form);
  if (action === "import-marketplace-catalog") importMarketplaceCatalog(form);
  if (action === "import-bas-purchases") importBasPurchases(form);
  if (action === "update-rates") updateRates(form);
  if (action === "update-closed-day") updateClosedDay(form);
});

render();
