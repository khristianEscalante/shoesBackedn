const express = require('express');
const swaggerDocs = require('../config/swagger');

require('dotenv').config();

//rutas
const userRoutes = require('./routes/user.router');
const categoryRoutes = require('./routes/category.router');
const productRoutes = require('./routes/product.router');
const orderRoutes = require('./routes/order.router');
const contactRoutes = require('./routes/contact.router');

//configuracion app
const app = express();

app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/contacts', contactRoutes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  swaggerDocs(app, PORT);
});
