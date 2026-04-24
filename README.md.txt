# Garip Ticaret – Full Stack E-Commerce Platform

Garip Ticaret is a full-stack e-commerce application developed to simulate a real-world online retail system for household products. The platform provides a structured and scalable solution for managing categorized product listings and delivering a smooth user experience. The system is built using a modern client-server architecture where the frontend and backend are decoupled, improving maintainability, scalability, and enabling independent development.

---
## Features

The application includes a category-based product catalog system covering kitchen, bathroom, decoration, and dowry products, allowing scalable expansion of product groups. The frontend is built using React and TypeScript with a fully component-based architecture, ensuring reusable UI elements, efficient rendering, and maintainable code. A shopping cart module is implemented through an interactive cart drawer, enabling users to add and remove items with real-time UI updates using temporary state management. API communication is handled through a centralized Axios configuration, with modular abstraction (productApi.ts) to maintain clean separation between data fetching and presentation logic.

---
## Project Structure

garip-ticaret/
├── backend/
│ ├── routes/
│ ├── controllers/
│ └── server logic
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ │ ├── axiosInstance.ts
│ │ │ └── productApi.ts
│ │ ├── components/
│ │ │ ├── cart/CartDrawer.tsx
│ │ │ ├── products/
│ │ │ └── categories/
│ │ ├── App.tsx
│ │ └── main.tsx
│ ├── public/
│ └── dist/
└── README.md


---
## Functional Overview & Use Cases

The system is designed around core user interactions and functional flows typical of an e-commerce platform. Below are the primary use cases supported by the application:

### Product Browsing
Users can navigate through different product categories such as kitchen, bathroom, decoration, and dowry. Each category displays a structured list of products retrieved from the backend.

**System Behavior:**
- Frontend sends a request to the product API
- Backend returns categorized product data
- UI dynamically renders product cards

---

### Product Visualization
Each product is displayed with associated visual assets and structured information.

**System Behavior:**
- Static assets are loaded from organized directories
- UI components map product data into visual elements

---

### Add to Cart
Users can add products to the shopping cart through interactive UI components.

**System Behavior:**
- Product is added to local state
- Cart drawer updates instantly
- UI reflects updated cart content

---

### Remove from Cart
Users can remove items from the cart.

**System Behavior:**
- Item is removed from state
- Cart UI re-renders in real time

---

### Cart Interaction (Drawer System)
The cart is implemented as a drawer component that can be toggled without navigating away from the current page.

**System Behavior:**
- Drawer state is managed globally or at component level
- Cart contents persist during session

---

### API Communication Flow
All user actions involving data trigger API calls through a centralized Axios instance.

**System Behavior:**
- Request sent via axiosInstance
- API endpoint processes request
- JSON response returned
- UI updates accordingly

---

### Component Interaction Model
The system follows a unidirectional data flow typical of React applications.

**System Behavior:**
- Parent components pass props
- Child components render UI
- State changes trigger re-render

---

### Error Handling (Basic)
Basic error handling is implemented during API requests.

**System Behavior:**
- Failed requests are caught
- Errors logged or handled gracefully in UI

---

### Scalability Considerations
The system is designed to support future enhancements.

**Supported Extensions:**
- Authentication system
- Persistent cart (database/local storage)
- Payment integration
- Admin panel for product management
## Architecture & Data Flow

The system follows a layered architecture where the frontend (presentation layer) handles UI rendering and user interaction, while the backend (application layer) processes API requests and business logic. Data handling is structured for future database integration.


User → React UI → Axios → Backend (REST API) → JSON Response → UI Update


---

## Technologies

Frontend: React, TypeScript, Vite, Axios  
Backend: Node.js, Express.js  
Tools: Git (version control)

---

## Installation & Setup

Clone the repository:
```bash
git clone https://github.com/servenayyy/project-clean
cd project-clean

Backend setup:

cd backend
npm install
npm start

Frontend setup:

cd frontend
npm install
npm run dev
API Design

The system uses RESTful endpoints such as:

GET /products
GET /products/:id
GET /categories

All API requests are managed through a centralized Axios instance located at:

src/api/axiosInstance.ts

This ensures consistency, maintainability, and easier debugging.

Design Principles

The project follows separation of concerns, modular architecture, reusable components, scalable folder structure, and centralized API management to ensure long-term maintainability.

Development Process

The development process included project planning, backend API setup, frontend component development, API integration, testing, debugging, and performance optimization.

Challenges & Solutions

API communication consistency was solved using a centralized Axios instance. Asset management complexity was handled through category-based folder organization. UI scalability issues were addressed with a component-based architecture. Performance optimization was achieved using Vite’s efficient build system.


Future enhancements include user authentication, payment integration, database integration (MongoDB or PostgreSQL), advanced search and filtering, persistent cart functionality, and improved mobile responsiveness.

Contributors

Servenay Guc
Cagri Akdag

Repository

https://github.com/servenayyy/project-clean

License

This project is developed for academic purposes.