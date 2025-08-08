import express from 'express';
import dotenv from 'dotenv';
import empleadosRouter from './routes/empleados.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/empleados', empleadosRouter);

// Puedes agregar más routers para productos, clientes, etc.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
