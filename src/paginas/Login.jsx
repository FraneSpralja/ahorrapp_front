import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
// Style
import styles from "../assets/style/authLayout.module.css";

const Login = () => {

    const navigate = useNavigate()

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ alerta, setAlerta ] = useState({})

    const { setAuth } = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if([email, password].includes('')) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true,
            })

            return;
        }

        try {
            const { data } = await clienteAxios.post('/user/login', { email, password })
            localStorage.setItem('ahorrapp_token_user', data.token);

            setAuth(data)

            navigate('/admin');

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
                        >Bienvenido a <span>Ahorrapp</span>, <br /> 
                        inicia sesión y empieza a ahorrar
                    </h1>
                </div>
                <div className={styles.loginBody}>
                    <form 
                        className={styles.formulario} 
                        action=""
                        onSubmit={handleSubmit}>
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
                            onChange={ e => setPassword(e.target.value) }
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
                            value="Iniciar Sesión"
                            className={styles.btnSubmit}
                            />
                        </div>
                        <div className={styles.formBox}>
                            <Link 
                            className={styles.links_submit} 
                            to="/registrar"
                            >
                                Únete a los que ahorran.
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

export default Login