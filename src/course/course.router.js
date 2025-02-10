import { Router } from "express";
import { createdCourse, assigCourse, getAssignedCourses, updateCourse, deleteCourse, getCoursesTeacher } from "./course.contoller.js";
import { validarRol } from "../middlewares/validate-rol.js";
import { validateCourse } from "../middlewares/validate-course.js";

const router = Router();

//Ruta para crear un curso. Se usa el middleware para validar el Rol, para que solo los usuarios que son profesores, puedan crear el curso.
router.post("/createdCourse", validarRol("TEACHER_ROLE"), createdCourse)
//Obtiene los cursos de cada profesor, /courses se utilizo para definir una estructura clara y organizada.
router.get("/teacher/:uid/courses", getCoursesTeacher)
router.post("/assignCourse", validateCourse, assigCourse)
router.get("/student/:uid/courses", getAssignedCourses)
router.put("/updateCourse/:courseId", updateCourse)
router.delete("/deleteCourse/:courseId", deleteCourse)

export default router;
