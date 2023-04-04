import { useEffect, useState } from "react";

import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";

// Style
import styles from "../assets/style/adminLayout.module.css"

const EditarPerfil = () => {

    const { auth, actualizarPerfil } = useAuth();
    const [perfil, setPerfil] = useState({})
    const [ alerta, setAlerta ] = useState({})

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { nombre, email } = perfil;
        if([nombre, email].includes('')) {
            setAlerta({
                msg: "Email y Nombre son obligatorios",
                error: true
            })

            e.target.classList.add('errorSubmit')

            return
        }

        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado);
    }

    const { msg } = alerta;

    return (
        <>
            <AdminNav />
            <div className={styles.header_cambiar_perfil}>
                <h2>Editar Perfil</h2>
            </div>

            <div className={styles.container_perfil}>
                <div>
                    <form 
                        className={styles.formulario}
                        onSubmit={handleSubmit}    
                    >
                        <div className={styles.formBox}>
                            <label className={styles.formBox_label}>
                                Nombre
                            </label>
                            <input 
                                name="nombre"
                                type="text"
                                className={styles.formBox_input}
                                value={perfil.nombre || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })} 
                            />
                        </div>
                        <div className={styles.formBox}>
                            <label className={styles.formBox_label}>
                                Email
                            </label>
                            <input 
                                name="email"
                                type="email"
                                className={styles.formBox_input}
                                value={perfil.email || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })} 
                            />
                        </div>
                        <div className={styles.formBox}>
                            <label className={styles.formBox_label}>
                                Ingreso
                            </label>
                            <input 
                                name="main_ingreso"
                                type="text"
                                className={styles.formBox_input}
                                value={perfil.main_ingreso || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
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
                                value="Guardar Cambios"
                                className={styles.btnSubmit}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil