import { Schema, model } from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"] 
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    profilePicture:{
        type:String
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ["TEACHER_ROLE","STUDENT_ROLE"],
        default: "STUDENT_ROLE"
    },
    /*
        Se utilizo un arreglo para mayor flexibilidad.
        Se utilizo para que un usuario pueda estar inscrito en varios cursos, y este arreglo tendra los ID de los cursos.
     */
    courses:[{
            type: Schema.Types.ObjectId,
            ref: "Course"
    }],
    status:{
        type:Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}


export default model("User",userSchema)