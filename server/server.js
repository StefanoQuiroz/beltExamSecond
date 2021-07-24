require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');

//connect mongoDB with Mongoose
const connectDB = require('./config/mongo.config');
connectDB()

//middlewares
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/pyrate.routes'));


app.listen(PORT, ()=>{
    console.log(` 1 : Server Lock and Loading on PORT: ${PORT} `);
})
