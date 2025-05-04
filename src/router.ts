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
router.put('/update/:id', [
  body("title")
    .exists().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .notEmpty().withMessage("Title cannot be empty"),
  body("body")
    .exists().withMessage("Body is required")
    .isString().withMessage("Body must be a string")
    .notEmpty().withMessage("Body cannot be empty"),
  body("status")
    .optional()
    .isIn(["IN_PROGRESS", "LIVE", "DEPRECATED", "ARCHIVED"])
    .withMessage("Status must be one of IN_PROGRESS, LIVE, DEPRECATED, or ARCHIVED"),
  validate
], (req, res) => {
  res.send('Update updated');
});
router.post('/update', [
  body("title")
    .exists().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .notEmpty().withMessage("Title cannot be empty"),
  body("body")
    .exists().withMessage("Body is required")
    .isString().withMessage("Body must be a string")
    .notEmpty().withMessage("Body cannot be empty"),
  body("status")
    .optional()
    .isIn(["IN_PROGRESS", "LIVE", "DEPRECATED", "ARCHIVED"])
    .withMessage("Status must be one of IN_PROGRESS, LIVE, DEPRECATED, or ARCHIVED"),
  validate
], (req, res) => {
  res.send('Update created');
});
router.delete('/update/:id', () => {});

// Update Points
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id', () => {});
router.post('/updatepoint', () => {});
router.delete('/updatepoint/:id', () => {});

export default router;