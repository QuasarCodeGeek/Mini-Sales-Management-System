# 🏢 Mini ERP – Inventory & Sales Management System

A simple **ERP-style web application** built with **Laravel, Inertia.js, React, and Tailwind CSS**.  
This project demonstrates a modern **SPA architecture** with CRUD functionality, relational database management, and a clean dashboard for quick analytics.

---

## 📌 Table of Contents
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation & Setup](#-installation--setup)
- [Current Status](#-current-status)
- [Future Improvements](#-future-improvements)

---

## 💻 Features

- **Dashboard**
  - Overview of total products, customers, and sales.
  - Recent transactions display.
- **Products Management**
  - Add, edit, delete products.
  - Track stock quantity and pricing.
- **Customers Management**
  - Manage customer information (name, contact, address).
- **Sales Management**
  - Record sales transactions.
  - Select products, input quantity, and automatically calculate total.
  - VAT (12%) computation and change calculation.
- **SPA Experience**
  - Smooth page navigation using **Inertia.js + React**.

---

## 🛠️ Technology Stack

<p>
<img src="https://img.shields.io/badge/Laravel-FF2D20?style=flat&logo=laravel&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Inertia.js-000000?style=flat&logo=inertia.js&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white" />
<img src="https://img.shields.io/badge/Composer-000000?style=flat&logo=composer&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" />
</p>

---

## ⚙️ Installation & Setup

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js >= 18
- MySQL

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/QuasarCodeGeek/Mini-Sales-Management-System.git
cd sample-erp
```

**2. Install PHP dependencies**
```bash
composer install
```

**3. Install Node dependencies**
```bash
npm install
```

**4. Configure environment**
```bash
cp .env.example .env
php artisan key:generate
```

**5. Set up your database in `.env`**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sample_erp
DB_USERNAME=root
DB_PASSWORD=
```

**6. Run migrations & seeders**
```bash
php artisan migrate --seed
```

**7. Start development server**
```bash
composer run dev
```

> This will concurrently run `php artisan serve`, `npm run dev`, and the queue worker.

---

## 📊 Current Status

- ✅ Core modules for **products, customers, and sales** are functional.
- ✅ Dashboard analytics implemented for quick insights.
- ✅ SPA navigation fully working with Inertia.js + React.
- ✅ Sales transaction with VAT computation and change calculation.
- ✅ Data table with sorting, filtering, and pagination.
- 🚧 Stock deduction on sales — in progress.

---

## 🚀 Run in Development
```bash
composer run dev
```

---

## 🔮 Future Improvements

- [ ] Stock deduction on every sales transaction
- [ ] Sales reports with date range filtering
- [ ] PDF/Excel export for reports
- [ ] Discount support (PWD, Senior Citizen)
- [ ] User authentication with role-based access (Admin, Cashier)
- [ ] Refund / Return management
- [ ] Dark mode refinements

---

## 📝 License

This project is for educational and portfolio purposes only.