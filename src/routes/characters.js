const express = require('express');
const pool = require('../db');

const router = express.Router();

/**
 * @openapi
 * /api/pokemon:
 *   get:
 *     summary: Lista todos los personajes Pokemon
 *     tags: [Pokemon]
 *     responses:
 *       200:
 *         description: Lista de personajes
 */
router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM characters ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('Pokemon database error:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState
    });
    next(error);
  }
});

/**
 * @openapi
 * /api/pokemon/{id}:
 *   get:
 *     summary: Obtiene un personaje Pokemon por id
 *     tags: [Pokemon]
 */
router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM characters WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Character not found' });
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/pokemon:
 *   post:
 *     summary: Crea un personaje Pokemon
 *     tags: [Pokemon]
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, species, type, ability, region, image_url } = req.body;
    if (!name || !species || !type || !ability || !region) {
      return res.status(400).json({ message: 'name, species, type, ability and region are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO characters (name, species, type, ability, region, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, species, type, ability, region, image_url || null]
    );
    const [rows] = await pool.query('SELECT * FROM characters WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/pokemon/{id}:
 *   put:
 *     summary: Actualiza un personaje Pokemon
 *     tags: [Pokemon]
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { name, species, type, ability, region, image_url } = req.body;
    const [result] = await pool.query(
      'UPDATE characters SET name = ?, species = ?, type = ?, ability = ?, region = ?, image_url = ? WHERE id = ?',
      [name, species, type, ability, region, image_url || null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Character not found' });
    const [rows] = await pool.query('SELECT * FROM characters WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/pokemon/{id}:
 *   delete:
 *     summary: Elimina un personaje Pokemon
 *     tags: [Pokemon]
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM characters WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Character not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;

