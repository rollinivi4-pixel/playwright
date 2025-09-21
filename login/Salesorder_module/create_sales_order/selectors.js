/**
 * SELECTORS AND XPATHS
 * 
 * This file contains all the element selectors and XPaths used in the tests.
 * Easy to maintain and update when UI changes.
 */

module.exports = {
  // 🔐 LOGIN SELECTORS
  login: {
    email: 'input[type="email"], input[placeholder*="email" i], input[name*="email" i]',
    password: 'input[type="password"], input[placeholder*="password" i], input[name*="password" i]',
    checkbox: 'input[type="checkbox"]',
    loginButton: 'button:has-text("Log in")'
  },

  // 🧭 NAVIGATION SELECTORS
  navigation: {
    salesOrders: 'text=Sales Orders',
    salesOrderSBModule: 'a[href="/Salesorders/salesorders"], a[href*="salesorders"], text=Sales Orders',
    createOrder: 'button:has-text("Create New Sales Order")',
    addCustomer: 'button:has-text("Add Customer")'
  },

  // 👤 CUSTOMER FORM SELECTORS
  customerForm: {
    phone: 'input[type="tel"], input[placeholder*="phone" i], input[placeholder*="mobile" i], input[name*="phone" i], input[name*="mobile" i], input[id*="phone" i], input[id*="mobile" i]',
    firstName: 'input[placeholder*="first" i], input[name*="first" i]',
    lastName: 'input[placeholder*="last" i], input[name*="last" i]',
    address: 'input[placeholder*="address" i], textarea[placeholder*="address" i]',
    pincode: 'input[placeholder*="pincode" i], input[placeholder*="zip" i]',
    saveButton: 'button:has-text("Save Customer")'
  },

  // 🔍 VERIFICATION SELECTORS
  verification: {
    searchInput: '[data-test="search-input"]',
    searchResults: '[data-test="result"]'
  },

  // 🛒 SALES ORDER SELECTORS
  create_sales_order: {
    searchInput: 'input[data-test="search-input"], input[placeholder*="Search customer" i]',
    orderFrom: 'select[name*="order"], select[name*="from"], select:first-of-type',
    location: 'select[name*="location"], select[name*="Location"], select:last-of-type',
    
    // Item form selectors
    itemForm: {
      itemInput: 'input[id*="selected_create_sales_order_item"], input[placeholder*="item" i], input[placeholder*="product" i]',
      quantityInput: 'input[id*="totalQuantity"], input[id*="quantity"], input[placeholder*="quantity" i], input[name*="quantity"]',
      sellingPriceInput: 'input[id*="totalPrice"], input[id*="price"], input[placeholder*="price" i], input[name*="price"]',
      mrpInput: 'input[id*="mrp"], input[placeholder*="mrp" i], input[name*="mrp"]',
      hsnSacInput: 'input[id*="hsn"], input[placeholder*="hsn" i], input[name*="hsn"]',
      taxTypeSelect: 'input[id*="tax_type"], select[id*="tax_type"], input[placeholder*="tax" i]',
      taxRateSelect: 'input[id*="tax_rate"], select[id*="tax_rate"], input[placeholder*="rate" i]',
      amountInput: 'input[id*="total_price"], input[id*="amount"], input[placeholder*="amount" i]',
      addItemButton: 'button:has-text("+"), button[title*="Add"], .add-item-btn, button:has-text("Add Item")',
      removeItemButton: 'button:has-text("Remove"), button[title*="Remove"], .remove-item-btn'
    }
  },

  // 📋 ORDER SUMMARY SELECTORS
  orderSummary: {
    summarySection: '[class*="order-summary"], [class*="summary"], text=Order Summary, text=Summary, [data-test="order-summary"], .order-summary, .summary-panel',
    itemName: '[class*="item-name"], [class*="product-name"], td, li',
    quantity: '[class*="quantity"], td',
    price: '[class*="price"], td',
    total: '[class*="total"], [class*="amount"], td',
    grandTotal: '[class*="grand-total"], [class*="total-amount"], text=Total:, text=Grand Total:, [data-test="grand-total"]',
    orderDetails: 'text=Order From:, text=Location:, text=Customer:, [class*="order-details"], [class*="order-info"]'
  },

  // ⚠️ WARNING AND POPUP SELECTORS
  warnings: {
    insufficientStock: [
      'text=Insufficient stock',
      'text=insufficient stock',
      'text=Stock not available',
      'text=Not enough stock',
      '[class*="warning"]:has-text("stock")',
      '[class*="error"]:has-text("stock")',
      '.alert:has-text("stock")',
      '.warning:has-text("stock")'
    ],
    expirationPopup: [
      '[class*="modal"]:has-text("expiring")',
      '[class*="modal"]:has-text("expiration")',
      '[class*="popup"]:has-text("expiring")',
      '[class*="dialog"]:has-text("expiring")',
      '.modal:has-text("Item is expiring")',
      '.popup:has-text("Item is expiring")'
    ],
    yesButton: [
      'button:has-text("Yes")',
      'button:has-text("Continue")',
      'button:has-text("Proceed")',
      'input[type="button"][value="Yes"]',
      '[class*="modal"] button:has-text("Yes")',
      '[class*="popup"] button:has-text("Yes")'
    ]
  },

  // 🔍 CUSTOMER SEARCH SELECTORS
  customerSearch: {
    searchField: [
      'input[data-test="search-input"]',
      'input[placeholder*="Search customer" i]',
      'input[placeholder*="customer" i]',
      'input[placeholder*="phone" i]',
      'input[placeholder*="name" i]',
      'input[type="text"]',
      'input[type="search"]'
    ],
    customerResults: [
      'li:has-text("${phone}")',
      'div:has-text("${phone}")',
      'tr:has-text("${phone}")',
      'td:has-text("${phone}")',
      'span:has-text("${phone}")',
      'p:has-text("${phone}")',
      'a:has-text("${phone}")',
      'button:has-text("${phone}")',
      'div[onclick]:has-text("${phone}")',
      '[data-test="customer-item"]:has-text("${phone}")',
      '[data-test="customer"]:has-text("${phone}")',
      '.customer-item:has-text("${phone}")',
      '.customer:has-text("${phone}")',
      '.search-result:has-text("${phone}")',
      '.result-item:has-text("${phone}")'
    ],
    confirmation: [
      'text=Selected Customer',
      'text=Customer Selected',
      '[data-test="selected-customer"]',
      '.selected-customer',
      '.customer-selected'
    ]
  },

  // 🛒 CREATE ORDER SELECTORS
  createOrder: {
    createButton: [
      'button:has-text("Create New Sales Order")',
      'button:has-text("Create Sales Order")',
      'button:has-text("New Sales Order")',
      'button:has-text("Create")',
      'button:has-text("New")',
      'a:has-text("Create New Sales Order")',
      'a:has-text("Create Sales Order")',
      'text=Create New Sales Order',
      'text=Create Sales Order',
      '[href*="create"]',
      '[href*="new"]'
    ],
    orderFormIndicators: [
      'text=Order Details',
      'text=Order Items',
      'text=Order Summary',
      'text=Invoice Date',
      'text=Order From',
      'text=Location',
      'select[name*="order"]',
      'select[name*="location"]'
    ]
  }
};
