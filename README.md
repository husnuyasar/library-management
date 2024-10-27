# Library Management System

This is a library management project that handles the management of users, books, and the situations in which these books are borrowed. In this system, each book and user is considered unique, and validators are used accordingly. Uniqueness is determined based on book and user names. Additionally, if someone else attempts to borrow a book that is already borrowed, the process is blocked by validators.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed. (used v18.12.1)
- Install [MySQL](https://www.mysql.com/) and set up a local database.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/husnuyasar/library-management.git
   cd library-management
   ```
   
2.  **Create a MySQL Database Connection**:

   Create a .env file in the root of the project with the following properties:
  
  ```env
  DB_HOST=<your-db-host>
  DB_PORT=<your-db-port>
  DB_USERNAME=<your-db-username>
  DB_PASSWORD=<your-db-password>
  DB_NAME=<your-db-name>
  ```

3. **Install Packages**:

  Run the following command to install the necessary packages:

  ```bash
  npm install
  ```

### Database Setup

  To create tables in the database, you must execute the relevant commands defined in package.json in order:

1. **Generate migration**:
  ```bash
  npm run migration:generate
  ```
2. **Run Migration**:
  ```bash
  npm run migration:run
  ```
3. **If you encounter any errors or mistakes, you can revert the last migration with**:
  ```bash
  npm run migration:revert
  ```

### Running the Project

To start the project, execute the following command. This will also automatically seed the database with users, books, and borrowing records:

```bash
npm run dev
```



