import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

// GET todos los clientes
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM clientes');
  res.json(rows);
});

// POST nuevo cliente
router.post('/', async (req, res) => {
  const { nombre, email, telefono, direccion, estatus = 'activo' } = req.body;
  const [result] = await pool.query(
    'INSERT INTO clientes (nombre, email, telefono, direccion, estatus) VALUES (?, ?, ?, ?, ?)',
    [nombre, email, telefono, direccion, estatus]
  );
  const [cliente] = await pool.query('SELECT * FROM clientes WHERE id = ?', [result.insertId]);
  res.json(cliente[0]);
});

// PUT actualizar cliente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, direccion, estatus } = req.body;
  await pool.query(
    'UPDATE clientes SET nombre=?, email=?, telefono=?, direccion=?, estatus=? WHERE id=?',
    [nombre, email, telefono, direccion, estatus, id]
  );
  const [cliente] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
  res.json(cliente[0]);
});

// DELETE eliminar cliente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
  res.json({ mensaje: 'Cliente eliminado' });
});

export default router;
