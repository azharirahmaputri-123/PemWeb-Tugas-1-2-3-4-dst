import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/', updateProduct);      // id di body
router.put('/:id', updateProduct);   // id di URL (opsional)
router.delete('/:id', deleteProduct);

export default router;
