import React from 'react'
import imagen from '../images/libros.jpg'
import moment from 'moment'


const Inicio = () => {
    return (
        <div>
            <h3 className="text-center mt-3">Welcome!!</h3>
            <h3 className="text-center mt-3">Date: {moment().format('dddd MMMM Do YYYY, h:mm:ss a')}</h3>
            <img src={imagen} className="imagen_portada"/>
        </div>
    )
}

export default Inicio
