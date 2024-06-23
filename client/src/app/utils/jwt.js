import jwt from 'jsonwebtoken'

export function decodeToken (token) {
    try{
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY)
        return decoded.username
    }catch(error){
        console.log('error occured with decode token',error)
        return null
    }
}