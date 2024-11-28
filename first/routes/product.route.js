import { Router } from "express"
import productController from "../controllers/product.controller.js"

const router = new Router()

router.post('/', productController.createProduct)
router.get('/', productController.getProducts)

export default router
