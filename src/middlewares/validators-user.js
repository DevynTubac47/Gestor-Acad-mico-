import { body, param } from "express-validator"
import { emailExists, usernameExists, userExists } from "../helpers/db-validators.js"
import { validarCampos } from "./validate-camps.js"

export const registerValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("username").not().isEmpty().withMessage("Username is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    validarCampos
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("username").optional().isString().withMessage("Invalid username"),
    body("password").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos
]

export const deleteUserValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
]

export const updateUserValidator = [
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
]
