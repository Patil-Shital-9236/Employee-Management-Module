const express = require('express');
require('dotenv').config();
const sequelize = require('./config/database');
const logger = require('./middleware/logger');

const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);

sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Employee Management API running');
});

module.exports = app;
