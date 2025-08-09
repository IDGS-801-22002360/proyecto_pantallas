import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import empleadosRouter from './routes/empleados.js';
import productosRouter from './routes/productos.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//! ===== RUTAS DE LAS API's =====
app.use('/api/empleados', empleadosRouter);
app.use('/api/productos', productosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
