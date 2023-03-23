# MERN AMAZONA

![amazona](/frontend/public/images/amazona.png)

## Tech Used

- HTML5 and CSS3: Semantic Elements, CSS Grid, Flexbox
- React: Components, Props, Events, Hooks, Router, Axios
- Context API: Store, Reducers, Actions
- Node & Express: Web API, Body Parser, File Upload, JWT
- MongoDB: Mongoose, Aggregation
- Development: ESLint, Babel, Git, Github, VS Code Editor Extensions (ESLint, Prettier, Live Server, etc) and more ...

### 1. Clone repo

```
$ git clone git@github.com:prabhjyot009/amazona.git
$ cd amazona
```

### 2. Create .env File

- duplicate .env.example in backend folder and rename it to .env

### 3. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - In .env file update MONGODB_URI=mongodb://localhost/amazona
- OR Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - In .env file update MONGODB_URI=mongodb+srv://your-db-connection

### 4. Run Backend

```
$ cd backend
$ npm install
$ npm start
```

### 5. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 6. Seed Users and Products

- Run this on browser: http://localhost:5000/api/seed
- It returns admin email and password and 6 sample products

### 7. Admin Login

- Run http://localhost:5000/signin
- Enter admin email and password and click signin

### 8. Create Products

- Run http://localhost:5000/products
- Click Create Product

### 9. Create Orders

- Run http://localhost:5000/orders
- Click Create Order

### 10. Paypal Sandbox

- Run http://localhost:5000/paypal/clientId
- Click Get Client ID

- Run http://localhost:5000/paypal/config
- Click Get Config

- Run http://localhost:5000/paypal/create-payment

- Run http://localhost:5000/paypal/execute-payment