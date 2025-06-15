# ✈️ Flights Service

A structured and secure Flights microservice responsible for managing core aviation data — including CRUD operations for cities, airports, airplanes, and flights. Built using Node.js, Express, MySQL, Sequelize ORM, and follows the MVC pattern.

All sensitive endpoints are protected via role-based access control, ensuring that only authorized companies/admins can perform create, update, and delete operations.

---

## 🔐 Features

- Full **CRUD** operations for:
  - Cities
  - Airports
  - Airplanes
  - Flights
- **Role-based access control:**
  - Admins/Companies → Full access (create/update/delete)
  - Users → Read-only access to public GET endpoints
- **Flight Date Verification:**
  - Automatically validates dates/times before creating flights
  - Prevents invalid or past-date entries
- Built using **clean MVC architecture**
- Sequelize-based DB schema and migrations
- Secure, cookie-based JWT verification
- Structured logging with Winston 

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MySQL** with **Sequelize ORM**
- **Sequelize CLI** for migrations
- **JWT + cookie-parser** for authorization
- **Winston** for logs

---

## 📁 Folder Structure

<pre>
Flights/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── migrations/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── index.js
├── .env.example
├── package.json
└── README.md
</pre>

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/cipherravi/Flights.git
cd Flights
```


### 2. Install Dependencies

npm install

### 3. Setup Environment Variables
change .env.example file to .env with actual values

### 4. Run Database Migrations

cd src
npx sequelize-cli db:migrate

### 5. Start the Development Server

npm run dev

Server will start on http://localhost:PORT

### 📡 API Overview
<pre>
| Entity   | Endpoint Prefix | Description             |
| -------- | --------------- | ----------------------- |
| City     | `/cities`       | Manage city data        |
| Airport  | `/airports`     | Manage airport info     |
| Airplane | `/airplanes`    | Manage aircraft info    |
| Flight   | `/flights`      | Schedule/manage flights |

</pre>

### 🧠 Smart Validations

verifyDate utility is used before creating any new flight or schedule
Prevents:
Flights with departure date in the past
Invalid timestamp formats
Overlapping aircraft usage

### 📜 Logging

Winston is used to log:

- Request and response activity
- Errors and exceptions
- Authentication-related events
Logs are stored in the /logs/ directory with time-stamped filenames.


🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a PR.

👨‍💻 Author

Made with ❤️ by Ravi yadav
