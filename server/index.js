import  express  from "express";
import mongoose from "mongoose";
import cors from 'cors';
import postRoutes from './routes/posts.js';

// username : muhammadhaseebshariff   pass : gJJ95KiCIKDzgsDM


const app = express()
const port = 3000
app.use(cors());
app.use(express.json());






mongoose.connect('mongodb+srv://success:success7864@cluster0.dedczsj.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.error('MongoDB connection failed:', error);
});

app.use('/posts', postRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})