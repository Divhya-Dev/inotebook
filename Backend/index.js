import connectToMongo from './db.js';   
import express from 'express';
import cors from 'cors';         
import authRoutes from './routes/auth.js';  
import notesRoutes from './routes/notes.js'; 

connectToMongo();
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

app.listen(port, () => {
  console.log(`INotebook Backend listening on port ${port}`)
})