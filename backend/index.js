import express from 'express';
import cors from 'cors';
import auth from './routes/auth.js';
import api from './routes/api.js'


const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());


app.use("/auth",auth);
app.use("/api",api);



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});