import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const GastoContext = createContext();

export const GastoProvider = ({ children }) => {

    const [ cargando, setCargando ] = useState(true); 
    const [ gastos, setGastos ] = useState([])
    const [ gasto, setGasto ] = useState({})
    const { auth } = useAuth() 

    useEffect(()=> {
        const obtenerGastos = async() => {
            try {
                const token = localStorage.getItem('ahorrapp_token_user');
                if(!token){ 
                    setCargando(false)    
                    return
                }

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/gasto-diario', config)

                setGastos(data.gastos)

            } catch (error) {
                console.log(error)
            }

            setCargando(false);
        };
        obtenerGastos()
    }, [auth])

    const guardarGasto = async (gasto) => {

        const token = localStorage.getItem('ahorrapp_token_user');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(gasto.id) {
            try {
                const { data } = await clienteAxios.put(
                    `/gasto-diario/${gasto.id}`, 
                    gasto,
                    config
                );

                console.log(data)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await clienteAxios.post(
                    '/gasto-diario', 
                    gasto,
                    config
                );
    
                const { createdAt, updateAt, _v, ...gastoAlmacenado } = data;
                setGastos([gastoAlmacenado.gastoGuardado, ...gastos]);
            } catch (error) {
                console.log(error)
            }
        }

    }

    const setEditar = (monto) => {
        setGasto(monto)
    }

    const eliminarGasto = async (monto) => {

        const printAlertaEliminar = () => {
            const app = document.getElementById('root')

            const overlayAlerta = document.createElement('DIV')
            const alertaDiv = document.createElement('DIV');
            const alertaTitle = document.createElement('H2');
            const alertaMensaje = document.createElement('P');
            const eliminarButton = document.createElement('BUTTON');
            const cancelarButton = document.createElement('BUTTON');

            overlayAlerta.classList.add('overlay-alerta')
            alertaDiv.classList.add('alerta-eliminar');
            alertaTitle.classList.add('alerta-eliminar-title');
            alertaMensaje.classList.add('alerta-eliminar-mensaje');
            eliminarButton.classList.add('button-eliminar');
            cancelarButton.classList.add('button-cancelar');

            alertaTitle.textContent = "Eliminar Monto";
            alertaMensaje.innerHTML = `
                Estas a punto de eliminar el 
                <span class="alerta-mensaje-tipo_${monto.tipo}">${monto.tipo}</span>
                <span>:</span>
                <span class="alerta-mensaje-nombre">"${monto.nombre}"</span>.<br><br>
                Haz clic en <span>"Eliminar"</span> para continuar.`;
            eliminarButton.textContent = "Eliminar";
            cancelarButton.textContent = "Cancelar";

            alertaDiv.appendChild(alertaTitle);
            alertaDiv.appendChild(alertaMensaje); 
            alertaDiv.appendChild(eliminarButton); 
            alertaDiv.appendChild(cancelarButton); 

            overlayAlerta.appendChild(alertaDiv)
            app.appendChild(overlayAlerta)
        }

        printAlertaEliminar()

        const buttonEliminar = document.querySelector('.button-eliminar')
        const buttonCancelar = document.querySelector('.button-cancelar')

        buttonEliminar.addEventListener('click', async () => {
            // setEliminarMonto(true)

            try {
                const token = localStorage.getItem('ahorrapp_token_user');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
    
                const { data } = await clienteAxios.delete(`/gasto-diario/${monto._id}`, config)
    
                const gastosActualizados = gastos.filter(gastosState => gastosState._id !== monto._id)

                setGastos(gastosActualizados);
            } catch (error) {
                console.log(error)
            }

            setTimeout(() => {
                document.querySelector('.overlay-alerta').remove()
            }, 1000)
        })
        
        buttonCancelar.addEventListener('click', () => {
            document.querySelector('.overlay-alerta').remove()
        })
    }

    return(
        <GastoContext.Provider
            value={{
                gastos,
                gasto,
                guardarGasto,
                setEditar,
                cargando,
                eliminarGasto
            }}
        >
            { children }
        </GastoContext.Provider>
    )
};

export default GastoContext