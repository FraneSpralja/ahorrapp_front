import { useEffect, useState } from "react";

import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";

// Style
import styles from "../assets/style/adminLayout.module.css"

const CambiarPassword = () => {
    const { editarPassword } = useAuth();

    const [ alerta, setAlerta ] = useState({});
    const [ password, setPassword ] = useState({
        password_actual: '',
        password_nuevo: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(Object.values(password).every( campo => campo === '' )) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            e.target.classList.add('errorSubmitPassword')

            return
        }

        if(password.password_nuevo.length < 6) {
            setAlerta({
                msg: 'El password debe tener mínimo 6 caracteres',
                error: true
            })

            e.target.classList.add('errorSubmitPasswordLength')

            return
        }

        const respuesta = await editarPassword(password)
        setAlerta(respuesta)
    }


    const { msg } = alerta;
    return (
        <>
            <AdminNav />
            <div className={styles.header_cambiar_perfil}>
                <h2>Cambiar Password</h2>
            </div>

            <div className={styles.container_perfil}>
                <div>
                    <form 
                        className={styles.formulario}
                        onSubmit={handleSubmit}    
                    >
                        <div className={styles.formBox}>
                            <label className={styles.formBox_label}>
                                Password actual
                            </label>
                            <input 
                                name="password_actual"
                                type="password"
                                placeholder="Tu password actual"
                                className={styles.formBox_input}
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className={styles.formBox}>
                            <label className={styles.formBox_label}>
                                Nuevo Password
                            </label>
                            <input 
                                name="password_nuevo"
                                type="password"
                                placeholder="Escribe tu nuevo password"
                                className={styles.formBox_input}
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        {
                            msg &&
                            <Alerta
                                alerta={alerta}
                            />
                        }
                        
                        <div className={styles.formBox}>
                            <input 
                                type="submit" 
                                value="Actualizar Password"
                                className={styles.btnSubmit}
                            />
                        </div>
                    </form>
                </div>
            </div>
            
        </>
    )
}

export default CambiarPassword