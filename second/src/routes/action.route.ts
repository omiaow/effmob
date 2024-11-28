import { Router } from "express"
import actionController from '../controllers/action.controller'

const router = Router()

router.post('/', actionController.createAction)
router.get('/', actionController.getAction)

export default router