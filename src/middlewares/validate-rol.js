import User from "../user/user.model.js";

/*
    Este middleware se utiliza para validar el rol del usuario.
    Valida que el rol del usuario sea igual al rol requerido.
*/
export const validarRol = (rolPermitido) => async (req, res, next) => {
    try {
        //Obtiene el ID requerido.
        const { userId } = req.body; 
        
        //Busca el usuario en la base de datos.
        const user = await User.findById(userId);
        //Valida si existe el usuario.
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }

        //Valida el rol del usuario.
        if (user.role !== rolPermitido) {
            return res.status(403).json({
                success: false,
                message: "Acceso denegado. No tienes permisos para realizar esta acción.",
            });
        }

        //Asigna el usuario al objeto req.
        req.user = user;
        next();
    } catch (err) {
        //Manejo de errores.
        return res.status(500).json({
            success: false,
            message: "Error al validar el rol",
            error: err.message,
        });
    }
}
