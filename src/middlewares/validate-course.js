import User from "../user/user.model.js"
import Course from "../course/course.model.js"

/*
    Se define una función middleware asíncrona para validar
    un curso, antes de que el el alumno se asigne a un curso.
*/
export const validateCourse = async (req, res, next) => {
    try{
        //Obtiene los parametros que se van a validar.
        const { userId, nameCourse } = req.body;

        //Verifica si el curso existe.
        const course = await Course.findOne({ nameCourse });
        if(!course){
            return res.status(404).json({
                success: false,
                message: "The cuorse is not exist"
            })
        }

        //Verifica si el estudiante existe.
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "The student is not exist"
            })
        }

        //Verifica si el estudiante ya esta en algun curso.
        //Includes: Se utiliza para comprobar si un curso ya existe en la lista del estudiante.
        if(user.courses.includes(course._id)) {
            return res.status(400).json({
                success: false,
                message: "The student is already registered in this course."
            })
        }

        //Verifica si el estudiante ya tiene mas de tres cursos asignados.
        if(user.courses.length >= 3){
            return res.status(400).json({
                success: false,
                message: "The student cannot register for more than 3 courses."
            })
        }

        //Asignan los objetos que contiene los datos del curso y el estudiante.
        req.course = course
        req.user = user
        next();
    }catch(err){
        //Manejo de errores
        return res.status(500).json({
            success: false,
            message: "Error validating course assignment."
        })
    }
}