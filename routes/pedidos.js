import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// Obtener todos los pedidos activos
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM pedidos WHERE estatus = "activo"');
  res.json(rows);
});

// Obtener un pedido por ID
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM pedidos WHERE id = ? AND estatus = "activo"', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
  res.json(rows[0]);
});

// Crear un nuevo pedido
router.post('/', async (req, res) => {
  const { producto_id, proveedor_id, cantidad, fecha_pedido, estado } = req.body;
  const [result] = await pool.query(
    'INSERT INTO pedidos (producto_id, proveedor_id, cantidad, fecha_pedido, estado) VALUES (?, ?, ?, ?, ?)',
    [producto_id, proveedor_id, cantidad, fecha_pedido, estado]
  );
  res.json({
    id: result.insertId,
    producto_id,
    proveedor_id,
    cantidad,
    fecha_pedido,
    estado,
    estatus: 'activo'
  });
});

// Editar pedido
router.put('/:id', async (req, res) => {
  const { producto_id, proveedor_id, cantidad, fecha_pedido, estado } = req.body;
  const [result] = await pool.query(
    'UPDATE pedidos SET producto_id = ?, proveedor_id = ?, cantidad = ?, fecha_pedido = ?, estado = ? WHERE id = ?',
    [producto_id, proveedor_id, cantidad, fecha_pedido, estado, req.params.id]
  );
  if (result.affectedRows === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
  res.json({ id: req.params.id, producto_id, proveedor_id, cantidad, fecha_pedido, estado });
});

// Eliminado lógico
router.delete('/:id', async (req, res) => {
  const [result] = await pool.query(
    'UPDATE pedidos SET estatus = "inactivo" WHERE id = ?',
    [req.params.id]
  );
  if (result.affectedRows === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
  res.json({ message: 'Pedido eliminado lógicamente' });
});

export default router;
