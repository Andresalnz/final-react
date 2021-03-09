import React,{useState,useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {auth} from '../firebase'



const Admin = (props) => {

    const [user,setUser] = React.useState(null)

    React.useEffect(()=>{
        if(auth.currentUser){
            console.log('existe user')
            setUser(auth.currentUser)
        }else{
            console.log('no existe user')
            props.history.push('/login')

        }
    },[props.history])

    const [libros, setLibros] = useState([])

    const obtenerDatos =async () =>{
        const data = await fetch ('https://www.etnassoft.com/api/v1/get/?any_tags=[angular,react,html,css,javascript]')
        const result = await data.json()
        setLibros(result)
    }

    useEffect(()=>
        obtenerDatos()
    )
    return (
        <div>
            <h1>Ruta protegida</h1>

            {
                user && (
                    <p>Email: {user.email}</p>
                )
            }
            
            <h4 className="text-center">Libros sobre desarrollo web</h4>
            <table border="1" >
               <tr>
                   <td>Imagen</td>
                   <td>Id</td>
                   <td>Autor</td>
                   <td>Titulo</td>
                   <td>Resumen</td>
                   <td>Idioma</td>
                   <td>Paginas</td>
                   <td>Descarga</td>
               </tr>
            
            {
                libros.map(item=>
                <tr key={item.ID} >
                    <td><img src={item.cover} className="imagen_libro"/></td>
                    <td>{item.ID}</td>
                    <td>{item.author}</td>
                    <td>{item.title}</td>
                    <td>{item.content_short}</td>
                    <td>{item.language}</td>
                    <td>{item.pages}</td>
                    <td><a href={item.url_download}><button>Enlace para detalle</button></a></td>
                   
                    
                    </tr>)          
            }
            </table>
        </div>
    )
}

export default withRouter (Admin)
