require('dotenv').config()

const connectwithDB = require('./config/db');
const app = require('./app');
const cors = require('cors');


// const corsOptions ={
//     origin:'http://localhost:5000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
//     Access-Control-Allow-Credentials: true
// }
app.use(cors());

//connect MongoDB
connectwithDB();


app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`);
});

