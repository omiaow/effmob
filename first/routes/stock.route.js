import { Router } from "express"
import stockController from "../controllers/stock.controller.js"

const router = new Router()

router.post('/', stockController.createStock)
router.put('/:id/increase', stockController.increaseStock)
router.put('/:id/decrease', stockController.decreaseStock)
router.get('/', stockController.getStocks)

export default router
