const express = require('express');
const env = require('dotenv');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');


const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
// environment variables
env.config();

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.hmbvj.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('Database connected successfuly')
})
.catch((error) => {
    console.log('Error connecting to database', error)
});
app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'uploads')));

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})