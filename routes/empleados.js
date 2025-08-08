import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// Obtener todos los empleados activos
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM empleados WHERE estatus = "activo"');
  res.json(rows);
});

// Obtener un empleado por ID
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM empleados WHERE id = ? AND estatus = "activo"', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ message: 'Empleado no encontrado' });
  res.json(rows[0]);
});

// Crear un nuevo empleado
router.post('/', async (req, res) => {
  const { nombre, puesto, email, fecha_contratacion } = req.body;
  const [result] = await pool.query(
    'INSERT INTO empleados (nombre, puesto, email, fecha_contratacion) VALUES (?, ?, ?, ?)',
    [nombre, puesto, email, fecha_contratacion]
  );
  res.json({ id: result.insertId, nombre, puesto, email, fecha_contratacion, estatus: 'activo' });
});

// Editar empleado
router.put('/:id', async (req, res) => {
  const { nombre, puesto, email, fecha_contratacion } = req.body;
  const [result] = await pool.query(
    'UPDATE empleados SET nombre = ?, puesto = ?, email = ?, fecha_contratacion = ? WHERE id = ?',
    [nombre, puesto, email, fecha_contratacion, req.params.id]
  );
  if (result.affectedRows === 0) return res.status(404).json({ message: 'Empleado no encontrado' });
  res.json({ id: req.params.id, nombre, puesto, email, fecha_contratacion });
});

// Eliminado lógico
router.delete('/:id', async (req, res) => {
  const [result] = await pool.query(
    'UPDATE empleados SET estatus = "inactivo" WHERE id = ?',
    [req.params.id]
  );
  if (result.affectedRows === 0) return res.status(404).json({ message: 'Empleado no encontrado' });
  res.json({ message: 'Empleado eliminado lógicamente' });
});

export default router;
