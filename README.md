User Management System with Role-Based Permissions (Admin / Sub-Admin / User)

## ⚙️ Backend Setup (Node.js + Prisma + MySQL)

### 📌 Prerequisites

- Node.js v18+
- MySQL server installed and running
- `.env` file configured properly

### 🔧 1. Install dependencies

```bash
cd backend
npm install

2. Setup your .env file

PORT=
DATABASE_URL="mysql://root:1234@localhost:3306/usermanagementdb"
#exmaple -> "mysql://root:1234@localhost:3306/usermanagementdb"
JWT_SECRET=thisisdesignpondsecretekey
3. Prisma Setup

npx prisma generate
npx prisma migrate dev --name init

# generate: generates Prisma client

# migrate: creates tables in your MySQL DB

4. Run the backend server
npm run dev



## frontend

1. Install dependencies
   cd frontend
   npm install
2. Start the dev server
   npm run dev

<!-- Frontend will run at http://localhost:5173 by default. -->

<!-- Features -->

User CRUD (Create, Read, Update, Delete)
JWT Authentication
Role-based access (Admin, SubAdmin, User)


```
