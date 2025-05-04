import { Router } from "express";
import { body } from "express-validator";
import { validate } from "./modules/middleware";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "./handlers/product";
import { createUpdate, deleteUpdate, getUpdateById, getUpdates, updateUpdate } from "./handlers/update";

const router = Router();

// Products
router.get('/product', getProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id', [
  body("name")
  .exists().withMessage("Name is required")
  .isString().withMessage("Name must be a string")
  .notEmpty().withMessage("Name cannot be empty"),
  validate
], updateProduct);
router.post('/product', [
  body("name")
  .exists().withMessage("Name is required")
  .isString().withMessage("Name must be a string")
  .notEmpty().withMessage("Name cannot be empty"),
  validate
], createProduct);
router.delete('/product/:id', deleteProduct);

// Updates
router.get('/update', getUpdates);
router.get('/update/:id', getUpdateById);
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
], updateUpdate);
router.post('/update', [
  body("title")
    .exists().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .notEmpty().withMessage("Title cannot be empty"),
  body("body")
    .exists().withMessage("Body is required")
    .isString().withMessage("Body must be a string")
    .notEmpty().withMessage("Body cannot be empty"),
    body("productId")
    .exists().withMessage("Product ID is required")
    .isString().withMessage("Product ID must be a string")
    .notEmpty().withMessage("Product ID cannot be empty"),
  body("status")
    .optional()
    .isIn(["IN_PROGRESS", "LIVE", "DEPRECATED", "ARCHIVED"])
    .withMessage("Status must be one of IN_PROGRESS, LIVE, DEPRECATED, or ARCHIVED"),
  validate
], createUpdate);
router.delete('/update/:id', deleteUpdate);

// Update Points
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id', [
  body("title")
    .exists().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .notEmpty().withMessage("Title cannot be empty"),
  body("description")
    .exists().withMessage("Body is required")
    .isString().withMessage("Body must be a string")
    .notEmpty().withMessage("Body cannot be empty"),
  validate
], (req, res) => {
  res.send('Update point updated');
});
router.post('/updatepoint', [
  body("title")
    .exists().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .notEmpty().withMessage("Title cannot be empty"),
  body("description")
    .exists().withMessage("Body is required")
    .isString().withMessage("Body must be a string")
    .notEmpty().withMessage("Body cannot be empty"),
  validate
], (req, res) => {
  res.send('UpdatePoint created');
});
router.delete('/updatepoint/:id', () => {});

export default router;