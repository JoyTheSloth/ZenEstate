# ZenEstate 🏰 — Premier Architectural Real Estate & Wealth Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)](#license)

**ZenEstate** is a state-of-the-art luxury real estate and architectural compound platform built with Next.js 16, TypeScript, and TailwindCSS. It offers high-net-worth buyers, investors, and premier brokers a seamless digital experience to discover, evaluate, compare, and finance architectural sanctuaries.

---

## 🌟 Key Features

- **🏡 Architectural Portfolio & Smart Filtering**:
  - Filter luxury compounds, glass pavilions, sky penthouses, and waterfront townhomes by property type, price range, bedrooms, locality, and 42-point title clearance status.
  - **Quick Smart Filter Badges**: `🔥 Hot Deals`, `✓ Verified Title`, `🔑 Ready to Move`, and `🌊 Waterfront`.

- **💱 Live Dual Currency Engine ($ USD / ₹ INR)**:
  - Real-time conversion toggle across all listings, mortgage estimators, price/sqft analytics, and interactive map pins.

- **🗺️ Interactive Geospatial Metropolitan Map**:
  - Interactive Leaflet-powered map displaying property pins, price pill markers, and instant preview popups upon clicking any estate pin.

- **📊 EMI Mortgage & Wealth Advisory Suite (`/calculator`)**:
  - Dynamic sliders for Property Price, Down Payment %, Interest Rate, and Tenure.
  - Interactive **10-Year Loan Balance Payoff Curve** bar chart and full principal vs. interest amortization schedule.

- **⚖️ Side-by-Side Property Comparison (`/compare`)**:
  - Compare up to 4 estates side-by-side with difference highlights, price/sqft breakdowns, and amenity matrices.
  - Includes a floating **Quick-Compare Dock** across all pages.

- **🏙️ Metropolitan Enclave Analytics & Neighborhood Insights**:
  - 3-Year price/sqft appreciation charts, safety index scores, top-rated school ratings, transit connectivity, and lifestyle scores for each neighborhood.

- **✨ Ultra-Luxurious About Us & Brand Portal (`/about`)**:
  - Showcases firm philosophy, $2.4B+ track record metrics, core principles, and executive leadership profiles.

- **📱 100% Mobile Responsive & Fluid Animations**:
  - Mobile hamburger drawer, touch filter drawers, smooth spring curves (`cubic-bezier`), and card hover lift animations.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Vanilla CSS Design System, Glassmorphism
- **Icons**: Lucide React Icons
- **Mapping**: Leaflet, React-Leaflet
- **Typography**: Google Fonts (Plus Jakarta Sans)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18.0.0 or higher) and npm installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JoyTheSloth/ZenEstate.git
   cd ZenEstate
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

Developed with ❤️ for modern real estate buyers and investors.
