import { Router } from "express"
import { deleteUser, updateUser } from "./user.controller.js"
import { deleteUserValidator, updateUserValidator } from "../middlewares/validators-user.js"

const router = Router()

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.put("/updateUser/:uid", updateUserValidator, updateUser)

export default router
