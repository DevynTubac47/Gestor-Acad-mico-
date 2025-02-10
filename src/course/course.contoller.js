import Course from "./course.model.js";
import User from "../user/user.model.js";

/*
    Función flecha para crear un curso.
    Crea un nuevo curso, lo guarda a la base de datos, y lo asigna al profesor que lo creo.
*/
export const createdCourse = async (req, res) => {
    try {
        //Extrae los datos del curso del cuerpo de la solicitud.
        const { nameCourse, description } = req.body;

        //Crea un nuevo curso con los datos proporcionados.
        const newCourse = new Course({
            nameCourse,
            description,
            teacher: req.user._id
        })

        //Guarda el curso en la base de datos
        await newCourse.save();

        //Envía una respuesta exitosa.
        res.status(201).json({
            success: true,
            message: "Course created successfully",
            curso: newCourse,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "No se pudo crear el curso",
            error: err.message, //Detalles del error.
        });
    }
};

/* 
    Función para asignar curso.
    Asigna un curso al estudiate. Actualiza la lista de cursos del estudiante, al igual que la lista del curso.
*/
export const assigCourse = async (req, res) => {
    try{
        //Extrae el estudiante y el curso del objeto de la solicitud.
        const { user, course } = req;

        //Añade el ID del curso a la lista de cursos de asignados del estudiante.
        //El método PUSH se utiliza para agregar elementos a un arreglo.
        user.courses.push(course._id)
        //Guarda los cambios en la base de datos.
        await user.save()

        //Añade el ID del estudiante a la lista de estudiantes del curso.
        course.students.push(user._id);
        //Guarda los cambios en la base de datos.
        await course.save();

        //Envia una respuesta exitosa.
        res.status(200).json({
            success: true,
            message: "The course has been assigned correctly.",
            student: user.name,
            course: course.nameCourse
        })
    }catch(err){
        //Manejo de errores
        return res.status(500).json({
            success: false,
            message: "Error assigning course"
        })
    }
}

/*
    Función flecha para listar los cursos de cada estudiante.
*/
export const getAssignedCourses = async (req, res) => {
    try{
        //Obtiene el parametro, en este caso el ID del estudiante.
        const { uid } = req.params;

        //Busca al estudiante por su ID. Para listar los cursos que tiene asignado.
        //Se utiliza el método populate para rellenar el campo de courses del modelo User, con información de los cursos relacionados.
        //Populate sirvio para mostrar todos los datos del curso. Y no solamente el ID
        const user = await User.findById(uid).populate("courses","nameCourse description");

        //Verifica si el estudiante existe.
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Student not found"
            })
        }

        //Verifica si el estudiante no tiene cursos asignados.
        if(user.courses.length === 0){
            return res.status(200).json({
                sucess: true,
                message: "The student is not assigned to any courses",
            })
        }

        //Envia una respuesta exitosa.
        return res.status(200).json({
            success: true,
            message: "Courses retrieved successfully",
            studentName: user.name,
            assignedCourses: user.courses
        })
    }catch(err){
        //Manejo de errores.
        return res.status(500).json({
            success: false,
            message: "Error retrieving assigned courses"
        })
    }
}

/*
    Función para listar los cursos que tiene asignado el profesor.
 */
export const getCoursesTeacher = async (req, res) => {
    try{
        //Obtiene el parametro, en este caso el ID del profesor
        const { uid } = req.params;

        //Se buscan los cursos que tiene el profesor, por medio de su ID.
        //Se seleccionan ciertos campos a mostrar.
        //March: Se utiliza para filtrar solo los estudiantes que estan activos.
        const courses = await Course.find({teacher:uid }).select("nameCourse description status students").populate({
            path: "students", match: {status: true}, select: "name surname"});

        //Verifica si el profesor tiene cursos asignados.
        if (courses.length === 0) {
            return res.status(200).json({
                success: true,
                message: "The teacher is not assigned to any courses",
            });
        }

        //Envía una respuesta exitosa.
        return res.status(200).json({
            success: true,
            message: "Courses retrieved successfully",
            teacherId: uid,
            courses,
        });
    //Manejo de Errores
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error retrieving assigned courses"
        })
    }
}

/*
    Función para actualizar la información de un curso.
*/
export const updateCourse = async (req, res) => {
    try{
        //Obtiene el parametro, que en este caso es el ID del curso.
        const { courseId } = req.params
        //Obtiene los datos, que se van a actualizar.
        const { nameCourse, description } = req.body

        //Busca el curso por su ID, para actualizar los datos proporcionados.
        //Se utiliza la opción {new: true}, para que el método devuelva el curso actualizado.
        const course = await Course.findByIdAndUpdate(courseId,{ nameCourse, description },{new: true});
        
        //Verifica si existe el curso
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado',
            });
        }

        //Envía una respuesta exitosa.
        res.status(200).json({
            sucess: true,
            message: `Course Update`,
            course
        })
    }catch(err){
        //Manejo de Errores.
        res.status(500).json({
            success: false,
            message: "Error updating the course"
        })
    }
}

/*
    Función de flecha para eliminar el curso. Y adicionalmente, remover la referencia del curso en el arreglo del estudiante.
 */
export const deleteCourse = async (req, res) => {
    try{
        //Obtiene el parametro. En este caso el ID del curso.
        const { courseId } = req.params

        //Busca el curso en la base de datos.
        const course = await Course.findById(courseId)
        //Verifica si el curso existe.
        if(!course){
            return res.status(400).json({
                sucess: false,
                message: "Course not found"
            })
        }

        //Iterar sobre los estudiantes inscritos en el curso.
        //Recorre la lista de estudiantes del curso, se actualiza el array de cursos del estudiante, filtrando el ID del curso eliminado.
        //Se utilizo for para recorrer el arreglo de los estudiantes, y para iterar en los valores de un arreglo.
        for (const studentId of course.students) {
            //Busca el estudiante en la base de datos.
            const student = await User.findById(studentId);
            if (student) {
                //Filtra la lista de cursos del estudiante para eliminar.
                student.courses = student.courses.filter(
                    (id) => id.toString() !== courseId
                );
                //Guarda el curso de la base de datos.
                await student.save();
            }
        }

        //Elimina el curso de la base de datos.
        await Course.findByIdAndDelete(courseId)

        //Envia una respuesta exitosa.
        return res.status(200).json({
            success: true,
            message: "Course removed",
            course
        })
    }catch(err){
        //Manejo de errores.
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el Curso",
            error: err.message
        })
    }
}