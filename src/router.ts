import { Router } from "express";
import { body } from "express-validator";
import { validate } from "./modules/middleware";

const router = Router();

// Products
router.get('/product', (req, res) => {
  res.send('Product list');
});
router.get('/product/:id', () => {});
router.put('/product/:id', [
  body("name")
  .exists().withMessage("Name is required")
  .isString().withMessage("Name must be a string")
  .notEmpty().withMessage("Name cannot be empty"),
  validate
], (req, res) => {
  res.send('Product updated');
});
router.post('/product', [
  body("name")
  .exists().withMessage("Name is required")
  .isString().withMessage("Name must be a string")
  .notEmpty().withMessage("Name cannot be empty"),
  validate
], (req, res) => {
  res.send('Product created');
});
router.delete('/product/:id', () => {});

// Updates
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put('/update/:id', () => {});
router.post('/update', () => {});
router.delete('/update/:id', () => {});

// Update Points
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id', () => {});
router.post('/updatepoint', () => {});
router.delete('/updatepoint/:id', () => {});

export default router;