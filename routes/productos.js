import express from 'express';
import { pool } from '../db.js'; // Ajusta la ruta si es necesario

const router = express.Router();

// GET todos los productos
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM productos');
  res.json(rows);
});

// POST nuevo producto
router.post('/', async (req, res) => {
  const { nombre, descripcion, precio, stock, imagenUrl } = req.body;
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, descripcion, precio, stock, imagenUrl) VALUES (?, ?, ?, ?, ?)',
    [nombre, descripcion, precio, stock, imagenUrl]
  );
  const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [result.insertId]);
  res.json(producto[0]);
});

// PUT actualizar producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, imagenUrl } = req.body;
  await pool.query(
    'UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, imagenUrl=? WHERE id=?',
    [nombre, descripcion, precio, stock, imagenUrl, id]
  );
  const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
  res.json(producto[0]);
});

// DELETE eliminar producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM productos WHERE id = ?', [id]);
  res.json({ mensaje: 'Producto eliminado' });
});

export default router;
