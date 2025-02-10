import jwt from "jsonwebtoken"

export const generateJWT = (uid = "", rolPermitido = "") =>{
    return new Promise((resolve,reject) =>{
        const payload = {uid, role: rolPermitido}

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: "1h"
            },
            (err, token) =>{
                if(err){
                    reject({
                        success: false,
                        message: err,
                    })
                }else{
                    resolve(token)
                }
            }
        )
    })
}