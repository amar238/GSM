const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./src/config/mongoose');
const userRoutes = require('./src/routes/userRoutes');
// const clientRoutes = require('./src/routes/clientRoutes');
// const rawMaterialRoutes = require('./src/routes/rawMaterialRoutes');
// const stockRoutes = require('./src/routes/stockRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
// app.use('/api/clients', clientRoutes);
// app.use('/api/raw-materials', rawMaterialRoutes);
// app.use('/api/stocks', stockRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
