import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // <-- Usa import en vez de require
import empleadosRouter from './routes/empleados.js';

dotenv.config();

const app = express();

app.use(cors()); // <-- Aquí puedes personalizar si quieres
app.use(express.json());
app.use('/api/empleados', empleadosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
