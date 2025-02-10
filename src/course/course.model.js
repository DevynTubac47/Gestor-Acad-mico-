import { Schema, model } from "mongoose";

const courseSchema = Schema({
    nameCourse: {
        type: String,
        required: [true, "Name Course is required"],
        maxLength: [50, "Name Course cannot exceed 50 characters"]
    },
    description: {
        type: String,
        maxLength: [200, "Description cannot exceed 200 characters"]
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    /*
        Es un arreglo que contiene los ID del estudiante.
        Almacena referencia a datos del usuario, facilitando el uso de populate.
        Se utilizo un arreglo para mayor flexibilidad, y permite almacenar los ID en un solo campo.

     */
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    status: {
        type: String,
        enum: ['ENABLED', 'DISABLED'],
        default: "ENABLED",
        required: true
    },
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Course", courseSchema)
