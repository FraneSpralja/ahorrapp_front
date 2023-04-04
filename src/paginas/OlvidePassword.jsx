import { useState } from "react"
import { Link } from "react-router-dom"

import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"
// Style
import styles from "../assets/style/authLayout.module.css"

const OlvidePassword = () => {
    const [ email, setEmail ] = useState("");
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email === '') {
            setAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
        }

        try {
            const { data } = await clienteAxios.post('/user/cambiar-password', { email })

            setAlerta({
                msg: data.msg
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            })
        }
    } 

    const { msg } = alerta;

    return (
        <>
                <div className={styles.loginHeader}>
                    <h1 
                    className={styles.loginHeader_title}
                        >Recupera tu password <span>Ahorrapp</span>
                    </h1>
                </div>
                <div className={styles.loginBody}>
                    <form 
                    className={styles.formulario}
                    onSubmit={handleSubmit}
                    >
                        <div className={styles.formBox}>
                            <label 
                            className={styles.formBox_label}
                            >
                                Email <span className="text-red-300">*</span>
                            </label>
                            <input
                            className={styles.formBox_input}
                            type="email" 
                            placeholder="usuario@correo.com"
                            value={email}
                            onChange={ e => setEmail(e.target.value) }
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
                            value="Recuperar contraseña"
                            className={styles.btnSubmit}
                            />
                        </div>
                        <div className={styles.formBox}>
                            <Link 
                            className={styles.links_submit} 
                            to="/"
                            >
                                ¿Ya tienes tu cuenta?, inicia sesión.
                            </Link>
                            <Link 
                            className={styles.links_submit} 
                            to="/registrar"
                            >
                                Únete a los que ahorran.
                            </Link>
                        </div>
                    </form>
                </div>
        </>
    )
}

export default OlvidePassword