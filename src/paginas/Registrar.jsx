import { useState } from "react"
import { Link } from "react-router-dom"
import clienteAxios from "../config/axios"

import Alerta from "../components/Alerta"

// Style
import styles from "../assets/style/authLayout.module.css"

const Registrar = () => {

    const [ nombre, setNombre ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ ingreso, setIngreso ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ repetirPassword, setRepetirPassword ] = useState("");

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();

        const inputs = [nombre, email, password, repetirPassword];

        if(inputs.includes("")) {
            setAlerta({
                msg: "Hay campos vacios",
                error: true
            });

            e.target.classList.add('errorSubmit')

            return;
        }

        e.target.classList.remove('errorSubmit')

        if(password !== repetirPassword) {
            setAlerta({
                msg: "Los password no son iguales", 
                error: true
            });
            e.target.classList.add('errorSubmitPassword')
            return
        }
        
        e.target.classList.remove('errorSubmitPassword')
        
        if(password.length < 6) {
            setAlerta({
                msg:"El pasword debe tener un minimo de 6 caracteres",
                error: true
            });
            e.target.classList.add('errorSubmitPassword')
            return;
        }
        e.target.classList.remove('errorSubmitPassword')
        
        
        // Crear usuario consumiendo la api
        try {
            await clienteAxios.post("/user", {
                nombre,
                email,
                ingreso,
                password
            })

            setAlerta({
                msg: "Usuario creado correctamente. Revisa tu correo y sigue las instrucciones."
            })

            setTimeout(() => {
                setAlerta({})
            }, 8000);

            console.log(respuesta);
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error: true
            })
        }

    }

    const { msg } = alerta;

    return (
        <>
                <div className={styles.loginHeader}>
                    <h1 
                    className={styles.loginHeader_title}
                        >Unete a <span>Ahorrapp</span>, <br /> 
                        se del club de los que ahorran
                    </h1>
                </div>
                <div className={styles.loginBody}>
                    <form 
                    className={styles.formulario} 
                    action=""
                    onSubmit={handleSubmit}
                    >
                        <div className={styles.formBox}>
                            <label 
                            className={styles.formBox_label}
                            >
                                Nombre <span className="text-red-300">*</span>
                            </label>
                            <input
                            className={styles.formBox_input}
                            type="text" 
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            />
                        </div>
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
                            onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.formBox}>
                            <label 
                            className={styles.formBox_label}
                            >
                                Ingreso
                            </label>
                            <input
                            className={styles.formBox_input}
                            type="text" 
                            placeholder="Ingreso principal"
                            value={ingreso}
                            onChange={e => setIngreso(e.target.value)}
                            />
                        </div>
                        <div className={styles.formBox}>
                            <label 
                            className={styles.formBox_label}
                            >
                                Password <span className="text-red-300">*</span>
                            </label>
                            <input
                            className={styles.formBox_input}
                            type="password" 
                            placeholder="Tu password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.formBox}>
                            <label 
                            className={styles.formBox_label}
                            >
                                Repetir Password <span className="text-red-300">*</span>
                            </label>
                            <input
                            className={styles.formBox_input}
                            type="password" 
                            placeholder="Repite tu password"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
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
                            value="Registrar"
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
                            to="/olvide-password"
                            >
                                Recupera tu password.
                            </Link>
                        </div>
                    </form>
                </div>
        </>
    )
}

export default Registrar