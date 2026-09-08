# Nike Lebanon Operations & Order Management System
### Enterprise Retail & Inventory Operations Hub

A zero-server, high-performance web application designed for Nike retail stores to manage customer reservations, inter-branch stock transfers, operations duties, and executive PowerBI-style performance analytics.

---

## 🚀 Key Highlights & Architecture

- **100% Zero-Server Architecture**: Runs completely in modern web browsers (Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari). Requires no backend server, database configuration, or cloud subscription fees.
- **100% Offline Capability**: All chart visualizations and spreadsheet exports are powered by bundled local libraries (`chart.umd.min.js` and `xlsx.full.min.js`). The system functions reliably even during internet outages.
- **Local Persistence**: All orders, tasks, branch registries, and staff directories persist securely within browser `localStorage`.
- **Integrated WhatsApp Messaging**: Generates pre-formatted WhatsApp Web notifications with Lebanese phone numbers (`+961`) for order arrivals and status updates.
- **Dual-Engine AI Copilot (SwooshAI)**: Operates completely offline with built-in retail intelligence rules, with an optional field to connect Google Gemini Flash API if cloud capabilities are desired.

---

## 📁 System File Structure

```
order_manager/
│
├── index.html            # Main Order Registry, table filters, search & bulk operations
├── index.css             # Core layouts, typography, badge system, and table styling
│
├── add_order.html        # Order registration & Customer Risk/VIP Intelligence form
├── add_order.css         # Form controls, branch/staff modals, and alert badges
│
├── edit_order.html       # Order modification, receipt preview & customer messaging
│
├── analytics.html        # PowerBI-style BI charts, KPIs, leaderboard & A4 PDF report
├── analytics.css         # Analytics dashboards, responsive cards & printable layout
│
├── todo.html             # Operations Duty Board, Overdue Auto-Sync & PIN security
├── todo.css              # Kanban board cards, filter horizons & priority badges
│
├── transitions.js        # Smooth page transition routing engine
├── transitions.css       # Hardware-accelerated UI transition animations
│
├── chatbot.js            # SwooshAI Copilot (Offline reasoning & Gemini integration)
├── chatbot.css           # Floating AI assistant launcher & conversation window
│
├── chart.umd.min.js      # Bundled offline Chart.js engine for analytics charts
├── xlsx.full.min.js      # Bundled offline SheetJS engine for Excel (.xlsx) export
└── README.md             # System documentation and operational user manual
```

---

## ⚡ Quick Start

1. Open the folder in File Explorer.
2. Double-click `index.html` to launch the application in your preferred web browser.
3. Click **+ Add Order** in the navigation bar to register your first customer reservation or inter-branch transfer.

---

## 📋 Module & Feature Overview

### 1. Main Dashboard (`index.html`)
- **6 Real-Time Metric Cards**: Total Orders, Pending Orders, Arrived In-Store, Unpicked / Abandoned Holds, Overdue (>48h at counter), and WhatsApp notification counts.
- **Instant Multi-Field Search**: Filters orders across customer names, phone numbers, item style codes (SKU), branches, and employees.
- **Dynamic Filter Tabs**: Filter by *All Orders*, *Arrived In-Store*, *Overdue Holds (>48h)*, *Unpicked / Abandoned*, and *Store Support Transfers*.
- **Quick Status Cycler**: Click any status pill on the table to instantly cycle through states (`Pending` → `Arrived` → `Collected` → `Unpicked`).
- **One-Click WhatsApp Dispatch**: Click the green WhatsApp icon to generate a formatted message for customer collection.
- **Thermal Receipt Printing**: Click the print icon to open a thermal-printer receipt slip (58mm/80mm).
- **Export Capabilities**: Export entire tables or filtered results to `.xlsx` (Excel) or `.csv` format.

### 2. Smart Order Entry (`add_order.html` & `edit_order.html`)
- **Dual Mode Support**:
  - **Customer Reservation**: Direct customer requests with SKU, colorway, size, branch, and staff picker.
  - **Store Support Transfer**: Inter-branch replenishment requests (source branch, transfer reason, and unit quantities).
- **Customer Risk & VIP Intelligence Engine**:
  - **High-Risk Detection**: Automatically alerts staff with a red warning banner if a customer has abandoned orders in the past, suggesting deposit collection.
  - **VIP Recognition**: Automatically tags loyal recurring customers with a gold VIP badge.
- **Branch & Staff Management**: Add, remove, or customize store branches and associate names directly from the interface.

### 3. Operations Duty Board (`todo.html`)
- **Task Management**: Create and track operational duties across *This Week*, *This Month*, or *All Tasks*.
- **Smart Overdue Auto-Sync**: Automatically scans customer orders held at the counter for more than 48 hours and creates assigned follow-up task cards in one click.
- **Role-Based PIN Protection**:
  - **Default Manager PIN**: `2026`
  - Prevents unauthorized modification or deletion of tasks by staff associates.
  - The Manager PIN can be updated at any time using the **Change PIN** button on the Duty Board.

### 4. Executive Analytics & BI Dashboard (`analytics.html`)
- **Executive KPIs**: Real-time fulfillment rate, average delivery lead time, abandonment rates, and order counts.
- **6 Chart.js Visualizations**:
  - Order volume trends (daily/weekly/monthly).
  - Category distribution (Footwear, Apparel, Accessories).
  - Branch performance comparison across all stores.
  - Sales associate order entry leaderboard.
  - Top-selling footwear models and silhouettes.
- **A4 Executive Report Generator**: Click **Print / Export A4 Report** to produce a print-optimized executive summary document suitable for management review or PDF archiving.

### 5. SwooshAI Operations Copilot (`chatbot.js`)
- Accessible via the floating black button on any page.
- **Offline Reasoner**: Answers operational questions immediately (e.g., *"What should I do today?"*, *"How many orders are overdue?"*, *"Show branch breakdown"*).
- **Direct Task Creation**: Create tasks directly from natural language (e.g., *"Create task: restock Air Force 1s for weekend"*).
- **Optional Cloud AI**: Store managers can enter an optional Google Gemini API key in the Copilot settings to enable advanced natural language chat.

---

## 🔒 Security & Data Management

- **Data Privacy**: No data leaves the local computer. Customer records, phone numbers, and order histories remain exclusively within the local browser storage.
- **Data Backup & Restore**:
  - To create a backup, click **Export Database (JSON)** from the dashboard options.
  - To restore data on another workstation, click **Import Database (JSON)** and select your saved JSON file.
- **Manager PIN**: Default is `2026`. Keep this secure or change it upon initial setup via the Duty Board.

---

## 🛠️ System Requirements

- **Operating System**: Windows 10/11, macOS, Linux, iOS, or Android.
- **Browser**: Any modern browser (Google Chrome 90+, Microsoft Edge 90+, Mozilla Firefox 88+, Safari 14+).
- **Internet**: Not required for day-to-day operations. Offline functionality is fully supported.
