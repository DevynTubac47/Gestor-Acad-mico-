import { Router } from "express";
import { register, login } from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middlewares/validators-user.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";
import { deleteFilOnError } from "../middlewares/delete-file-on-error.js";

const router = Router()

router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    deleteFilOnError,
    register
)

router.post(
    "/login",
    loginValidator,
    deleteFilOnError,
    login
) 
export default router