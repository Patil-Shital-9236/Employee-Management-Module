# Employee Management Backend API

A RESTful backend service developed using **Node.js**, **Express.js**, **Sequelize ORM**, and **MySQL** to manage employees, departments, and reporting managers.

This application enforces referential integrity, supports relational queries (JOINs), and includes a global request–response logging middleware.

---

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- dotenv

---

## Project Structure
Employee-Management-Module/<br>
│<br>
├── screenshots/<br>
│   ├── get-all-employees.png<br>
│   ├── employee-with-manager.png<br>
│   ├── delete-manager.png<br>
│   └── after-manager-delete.png<br>
├── README.md<br>
├── src/<br>
  │<br>
  ├── config/<br>
  │ └── database.js # Database connection configuration<br>
  │<br>
  ├── controllers/<br>
  │ ├── departmentController.js<br>
  │ └── employeeController.js<br>
  │<br>
  ├── middleware/<br>
  │ └── logger.js # Global request–response logger<br>
  │<br>
  ├── models/<br>
  │ ├── department.js<br>
  │ ├── employee.js<br>
  │ └── index.js # Model associations<br>
  │<br>
  ├── routes/<br>
  │ ├── departmentRoutes.js<br>
  │ └── employeeRoutes.js<br>
  │<br>
  ├── app.js # Application entry point<br>


---

## Business Rules & Constraints

1. Employee details are fetched along with **department name** and **manager name** using JOIN queries.
2. When a **manager is deleted**, all employees reporting to that manager automatically get `manager_id = NULL`.
3. A **department cannot be deleted** if employees are mapped to it.
4. Foreign key constraints prevent orphan records in the database.

---

##  API Endpoints

### Employee APIs

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/employees` | Create a new employee |
| GET | `/api/employees` | Fetch all employees |
| GET | `/api/employees/:id` | Fetch employee by ID |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

---

### Department APIs

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/departments` | Create a department |
| GET | `/api/departments` | Fetch all departments |
| DELETE | `/api/departments/:id` | Delete department (blocked if employees exist) |

---

## Middleware

### Request–Response Logging Middleware

A global middleware logs:
- HTTP Method
- API Endpoint
- Response Status Code
- Response Time (in milliseconds)

---

## Environment Variables

Create a `.env` file in the root directory:

DB_HOST=localhost<br>
DB_USER=root<br>
DB_PASSWORD=your_password<br>
DB_NAME=employee_db<br>
DB_DIALECT=mysql<br>
PORT=3000<br>

---

##  How to Run the Project

```bash
npm install
node src/app.js

Database Details

- Database Type: Relational (MySQL)

- ORM Used: Sequelize

- Associations implemented using Sequelize relations

- Automatic table synchronization enabled

Author

Developed as part of a backend technical assignment to demonstrate:

- REST API design

- Relational database handling

- Business rule enforcement

- Clean project architecture

- Real-world backend practices

