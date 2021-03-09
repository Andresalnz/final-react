import React,{useState} from 'react'
import {db,auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [esregistro, setEsregistro] = useState(false)
    
    const procesarDatos = e=>{
        e.preventDefault()
        if (!email.trim()){  
        setError('escribe email')
        return
    }
    
    if (!password.trim()){ 
      setError('escribe pass ')
      return
    }
    if (password.length<6){ 
        setError('escribe pass de 6 o mas caracteres ')
        return
      }

      if (esregistro){
        registrar()
      }else{
          login()
      }
    }
    const registrar = async ()=>{
        try{
            const res  = await auth.createUserWithEmailAndPassword(email, password)
            //console.log(res.user)

            await db.collection('usuarios').doc(email).set({
                email:res.user.email,
                uid:res.user.uid

            })

            setEmail('')
            setPassword('')
            setError(null)
            props.history.push('/admin')



        }catch(error){
            //console.log(error)
            if(error.code === "auth/invalid-email"){
                setError("El email es invalido")
            }
            if(error.code === "auth/email-already-in-use"){
                setError("El email existente")
            }
        }
    } 

    const login = async ()=>{
        try{
            await auth.signInWithEmailAndPassword(email, password)
            setEmail("")
            setPassword("")
            setPassword(null)
            props.history.push('/admin')
        }catch(error){
            //console.log(error)
            if(error.code === "auth/user-not-found" || error.code === "auth/wrong-password"){
                setError("El email y/o passwword mal")
            }
           

        }
    }


    
   
    
    
    
    


    return (
        <div className="mt-5">
            <h3 className="text-center">{
                esregistro?"Registro":"Login"
                  }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error && (
                                <div className="alert alert-danger">{error}</div>
                            )
                        }
                        <input 
                        type="email"
                        className="form-control mb-2"
                        placeholder="Introduce email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        />
                         <input 
                        type="password"
                        className="form-control mb-2"
                        placeholder="Introduce password"
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                        />
                        <button className="btn btn-dark w-100 mb-2" type="submit">{esregistro?"Registro":"Login"}</button>
                        <button className="btn btn-sm btn-info w-100 mb-2" onClick={()=>setEsregistro(!esregistro)} type="button">{esregistro?"¿Ya tienes cuenta?":"no tienes cuenta"}</button>

                        {
                            !esregistro && (
                                <button className="btn btn-danger btm-sm"
                                        type="button"
                                        onClick={()=>props.history.push('/reset')}
                                >
                                    Recuperar contraseña

                                </button>
                            )
                        }
                    </form>
                    {/* <button className="btn btn-dark w-100 mb-2" > Facebook </button> */}
                </div>
            </div>           
        </div>
    )
}


export default withRouter (Login)
