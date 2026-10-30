# Employee Management System

A full-stack employee management application built with **ASP.NET Core 8 Web API**, **Entity Framework Core**, **MySQL**, and **React 19 with TypeScript**. The system provides employee records, authentication, attendance tracking, performance reviews, and downloadable reports.

## Tech Stack

| Layer | Technologies |
|---|---|
| Backend | C#, ASP.NET Core 8 Web API |
| Data access | Entity Framework Core 8, Repository Pattern |
| Database | MySQL, Pomelo.EntityFrameworkCore.MySql |
| Authentication | JWT Bearer authentication, role-based authorization, BCrypt |
| Frontend | React 19, TypeScript, Vite |
| UI & API integration | Bootstrap 5, Axios, React Router, React Toastify |
| Reporting | QuestPDF, ClosedXML |
| API documentation | Swagger / OpenAPI |

## Features

- **Employee management:** Create, view, update, and delete employee records.
- **Authentication and authorization:** JWT-based authentication with Admin and User roles.
- **Employee profile:** Retrieve the employee profile associated with the authenticated user.
- **Attendance management:** Admins can record attendance; authenticated users can view attendance records.
- **Performance reviews:** Admins can create and view employee performance records.
- **Reports and analytics:** Hiring trends, department growth, attendance patterns, and performance reports.
- **Exporting reports:** Generate employee reports in PDF and Excel formats.
- **API documentation:** Swagger UI with Bearer-token authentication support.
- **Backend structure:** Controllers, DTOs, interfaces, repositories, services, middleware, and EF Core migrations.

## Repository Structure

```text
EmployeeManagementSystem/
├── BackEnd/
│   └── EmployeeManagement.API/
│       ├── Controllers/
│       ├── DTO/
│       ├── Data/
│       ├── Interfaces/
│       ├── Middleware/
│       ├── Migrations/
│       ├── Models/
│       ├── Repositories/
│       ├── Services/
│       └── Program.cs
└── FrontEnd/
    └── EmployeeManagement.UI/
        ├── src/
        │   ├── api/
        │   ├── components/
        │   ├── pages/
        │   ├── routes/
        │   └── services/
        ├── package.json
        └── vite.config.ts
```

## Getting Started

### Prerequisites

- .NET 8 SDK
- Node.js and npm
- MySQL Server

### 1. Clone the repository

```bash
git clone https://github.com/MOHAMMED-RIYAZ/EmployeeManagementSystem.git
cd EmployeeManagementSystem
```

### 2. Configure the database and JWT settings

Open `BackEnd/EmployeeManagement.API/appsettings.json` and configure:

- `ConnectionStrings:DefaultConnection` — your MySQL connection string
- `Jwt:Key` — a strong, private signing key
- `Jwt:Issuer` and `Jwt:Audience` — values used by the API's token validation

The checked-in configuration contains placeholder credentials. Use your own local values or .NET User Secrets, and never commit real passwords or signing keys.

### 3. Run the backend

```bash
cd BackEnd/EmployeeManagement.API
dotnet restore
dotnet ef database update
dotnet run
```

The API uses Entity Framework Core migrations. If the EF CLI is not installed:

```bash
dotnet tool install --global dotnet-ef
```

Swagger is enabled in the Development environment. Open the Swagger URL printed by the application when it starts.

### 4. Run the frontend

Open another terminal:

```bash
cd FrontEnd/EmployeeManagement.UI
npm install
npm run dev
```

Vite prints the local frontend URL in the terminal.

## API Overview

The API uses controller-based endpoints under `/api`.

| Controller | Example endpoints | Purpose |
|---|---|---|
| Employee | `GET /api/Employee`, `GET /api/Employee/{id}`, `POST /api/Employee`, `PUT /api/Employee/{id}`, `DELETE /api/Employee/{id}` | Employee records |
| Employee | `GET /api/Employee/my-profile`, `GET /api/Employee/download-pdf` | Current user's profile and PDF export |
| Attendance | `GET /api/Attendance`, `GET /api/Attendance/{employeeId}`, `POST /api/Attendance` | Attendance records |
| Performance | `GET /api/Performance`, `POST /api/Performance` | Performance reviews |
| Reports | `GET /api/Reports/hiring-trends`, `GET /api/Reports/department-growth` | Workforce analytics |
| Reports | `GET /api/Reports/attendance-pattern`, `GET /api/Reports/performance` | Attendance and performance analytics |
| Reports | `GET /api/Reports/employees/pdf`, `GET /api/Reports/employees/excel` | Downloadable employee reports |

Endpoints are protected according to the authorization attributes in the API. Employee listing and profile retrieval are available to authenticated users; employee create/update/delete and reporting operations are restricted to administrators. Attendance creation and performance management are also administrator-only.

## Engineering Concepts Demonstrated

- Building RESTful APIs with ASP.NET Core
- JWT authentication and role-based access control
- Repository and service abstractions with dependency injection
- Relational data access using EF Core and MySQL
- React + TypeScript frontend integration with Axios
- Database schema evolution using EF Core migrations
- Generating PDF and Excel reports from backend services

## Author

**Mohammed Riyaz**

- [GitHub](https://github.com/MOHAMMED-RIYAZ)
- [LinkedIn](https://www.linkedin.com/in/mohammedriyazba564721b/)
- [Portfolio](https://riyaz-portfolio-eight.vercel.app)
