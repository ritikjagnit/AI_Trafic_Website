# 🚦 AI Smart Traffic Control System

A modern, responsive **AI Smart Traffic Control System dashboard** built with React and Vite. The project provides a municipal-style traffic operations interface for monitoring junctions, traffic flow, signals, CCTV cameras, incidents, vehicles, analytics, and emergency response scenarios.

> **Note:** This repository currently implements a front-end traffic simulation using local/mock data and React state. It does not claim to connect to real traffic cameras, roadside sensors, or an external AI inference backend.

## ✨ Features

### 📊 Traffic Dashboard

* Real-time traffic overview dashboard
* Traffic flow, active signal, vehicle, incident, fuel-saving, and emission-reduction KPIs
* Interactive traffic map and junction status visualization
* Congested junction monitoring
* Traffic analytics charts

### 🚦 Signal Control

* AI recommendation workflow for junction signal timings
* Manual green/yellow/red signal override
* Global optimization of signal timings across junctions
* Dynamic junction density and status updates

### 📹 CCTV Monitoring

* CCTV monitoring interface for traffic surveillance
* Camera status and monitoring views powered by the application's local data model

### 🚨 Incident & Emergency Management

* Incident reporting workflow
* Incident severity, location, assigned team, and status tracking
* Emergency simulation mode
* Emergency green-corridor scenario
* Traffic rerouting simulation
* Emergency resolution workflow with state restoration
* Toast notifications for important system actions

### 🚗 Vehicle & Operations Monitoring

* Vehicle monitoring page
* Live-style vehicle count simulation
* Junction-level traffic activity tracking

### 📈 Reports & Settings

* Reports and analytics interface
* System settings page
* Responsive command-center layout

## 🛠️ Tech Stack

* **React 18** – UI development
* **Vite 5** – development server and production builds
* **React Router DOM** – client-side routing
* **Tailwind CSS** – styling and responsive layout
* **Framer Motion** – UI motion and animation
* **Lucide React** – interface icons
* **Recharts** – charts and analytics visualizations

## 🧠 Application Architecture

The application uses a React context-based state layer to manage traffic operations across the dashboard. The main `TrafficProvider` maintains junctions, incidents, CCTV cameras, KPIs, emergency state, notifications, and signal-control actions.

The app currently includes simulated real-time behavior such as:

* A live system clock
* Junction signal countdowns
* Small vehicle-count fluctuations
* Signal optimization effects
* Emergency activation and recovery
* Dynamic incident creation

## 📁 Project Structure

```text
AI_Trafic_Website/
├── dist/                    # Production build output
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/             # Global traffic state and actions
│   ├── data/                # Mock/static application data
│   ├── pages/               # Dashboard application pages
│   ├── App.jsx              # Main application routes/layout
│   ├── index.css            # Global styles
│   └── main.jsx             # React entry point
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🖥️ Main Routes

| Route             | Purpose                     |
| ----------------- | --------------------------- |
| `/`               | Traffic overview dashboard  |
| `/live-traffic`   | Live traffic monitoring     |
| `/signal-control` | Traffic signal control      |
| `/cctv`           | CCTV monitoring             |
| `/analytics`      | Traffic analytics dashboard |
| `/incidents`      | Incident management         |
| `/vehicles`       | Vehicle monitoring          |
| `/reports`        | Reports and insights        |
| `/settings`       | System settings             |

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js 18+
* npm

### Installation

```bash
git clone https://github.com/ritikjagnit/AI_Trafic_Website.git
cd AI_Trafic_Website
npm install
```

### Run in Development

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎯 Project Objective

The goal of this project is to demonstrate how a centralized traffic-control dashboard can combine traffic monitoring, adaptive signal control, incident management, emergency response, and operational analytics into a single interface.

It is especially suitable as a **prototype, academic project, UI demonstration, or proof-of-concept** for smart-city traffic management concepts.

## 🔮 Future Enhancements

The front-end simulation can be extended into a production-grade platform by integrating:

* Real CCTV/video-stream ingestion
* Computer vision for vehicle detection and classification
* Real-time IoT traffic sensors
* GPS and fleet tracking
* Backend APIs and persistent databases
* ML/AI models for congestion prediction
* Automatic signal optimization using live traffic data
* GIS/map APIs
* Role-based authentication and authorization
* WebSocket/MQTT-based real-time communication
* Audit logs and operator activity tracking

## ⚠️ Current Limitations

This version is primarily a **front-end simulation/prototype**. Traffic KPIs, junction data, incidents, CCTV data, and emergency scenarios are driven by local application state/mock data rather than a live municipal traffic infrastructure.

## 👨‍💻 Author

**Ritik Jagnit**

GitHub: [@ritikjagnit](https://github.com/ritikjagnit)

## ⭐ Support

If this project is useful for learning or prototyping, consider giving the repository a ⭐ on GitHub.
