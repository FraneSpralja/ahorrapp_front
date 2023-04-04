import { useState, useEffect, createContext } from 'react';

import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = (props) => {

    const { children } = props;

    const [ cargando, setCargando ] = useState(true); 
    const [ auth, setAuth ] = useState({});

    useEffect(() => {
        const autenticarUser = async() => {
            const token = localStorage.getItem('ahorrapp_token_user')

            if(!token) {
                setCargando(false);
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }

            try {
                const { data } = await clienteAxios('/user/perfil', config)

                setAuth(data.user)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({});
            }

            setCargando(false);

        }

        autenticarUser();
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem('ahorrapp_token_user');
        setAuth({})
    }

    const actualizarPerfil = async( datos ) => {
        const token = localStorage.getItem('ahorrapp_token_user')

        if(!token) {
            setCargando(false);
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }

        try {
            const url = `/user/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config);
            console.log(data)
            return {
                msg: 'Cambios almacenados correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const editarPassword = async (datos) => {
        const token = localStorage.getItem('ahorrapp_token_user')

        if(!token) {
            setCargando(false);
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }

        try {
            const url = `/user/actualizar-password`
            const { data } = await clienteAxios.put( url, datos, config )

            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }


    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                editarPassword
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export  {
    AuthProvider
}

export default AuthContext;