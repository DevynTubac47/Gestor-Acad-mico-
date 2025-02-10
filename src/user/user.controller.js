import { hash, verify } from "argon2"
import User from "./user.model.js"
import courseModel from "../course/course.model.js";

/*
    Función de linea, para eliminar el perfil del usuario y desasignarlo del curso.
*/
export const deleteUser = async (req, res) => {
    try{
        //Obtiene los parametros solicitados
        const { uid } = req.params
        
        //Busca el usuario en la base de datos.
        const user = await User.findById(uid);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //Cambio del estado del usuario.
        user.status = false;
        //Guarda los cambios en la base de datos.
        await user.save();
            
        //Elimina el usuario del curso que esta asignado.
        //Se buscan todos los cursos en los que el usuario aparece asignado.
        //Se filtran los ID del estudiante, eliminando el ID del usuario desactivado.
        const courses = await courseModel.find({students: uid})
        //For itera sobre el arreglo de cursos.
        for(const course of courses) {
            course.students = course.students.filter(
                //Verifica si el estudiante es diferente al que se va a eliminar.
                (studentId) => studentId.toString() !== uid
            )
            await course.save()
        }

        //Envía una respuesta exitosa.
        return res.status(200).json({
            success: true,
            message: "Perfil eliminado",
            user
        })
    }catch(err){
        //Manejo de errores.
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el perfil",
            error: err.message
        })
    }
}

/*
    Permite actualizar la información del usuario. Si se proporciona una contraseña la cifra antes de almacenarla.
*/
export const updateUser = async (req, res) => {
    try {
        //Obtiene el ID del usuario que se va a actualizar.
        const { uid } = req.params;
        //Parametros que se van a actualizar.
        const  { password, ...data}  = req.body;

        //Verifica si se proporciona una contraseña 
        if (password) {

            //Busca el usuario en la base de datos, si existe, se cifra la nueva contraseña, y se agrega a los datos que se van a actualizar.
            const user = await User.findById(uid);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Usuario no encontrado",
                });
            }

            data.password = await hash(password);
        }
        const userUpdate = await User.findByIdAndUpdate(uid, data, { new: true });

        //Envia una respuesta exitosa.
        res.status(200).json({
            success: true,
            menssage: 'Perfil Actualizado',
            userUpdate,
        });
    } catch (err) {
        //Manejo de Errores
        res.status(500).json({
            success: false,
            menssage: 'Error al actualizar el perfil',
            error: err.message
        });
    }
}
