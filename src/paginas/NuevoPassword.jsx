import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
// Style
import styles from "../assets/style/authLayout.module.css"

const NuevoPassword = () => {

    const [ password, setPassword ] = useState("");
    const [ alerta, setAlerta ] = useState({});
    const [ tokenValido, setTokenValido ] = useState(false);
    const [ passwordModificado, setPasswordModificado ] = useState(false)

    const params = useParams();

    const { token } = params;

    useEffect(() => {
        const comprobarToken = async() => {
            try {
                await clienteAxios(`/user/cambiar-password/${token}`);
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: "Hubo un error con el enlace",
                    error: true
                })
            }
        }

        comprobarToken()
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(password.length < 6) {
            setAlerta({
                msg: "El password debe tener al menos 6 caracteres",
                error: true
            })

            return
        }

        try {
            const url = `/user/cambiar-password/${token}`;
            const { data } = await clienteAxios.post(url, { password });
            console.log(data);

            setAlerta({
                msg: data.msg
            })

            setPasswordModificado(true);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta
    return (
        <>
            <div className={styles.loginHeader}>
                <h1 
                className={styles.loginHeader_title}
                    >Define tu nuevo password <span>Ahorrapp</span>.
                </h1>
            </div>
            <div className={styles.loginBody}>
                    <form 
                    className={styles.formulario} 
                    action=""
                    onSubmit={handleSubmit}
                    >
                        {
                            tokenValido &&
                                <div className={styles.formBox}>
                                    <label 
                                    className={styles.formBox_label}
                                    >
                                        Nuevo Password <span className="text-red-300">*</span>
                                    </label>
                                    <input
                                    className={styles.formBox_input}
                                    type="password" 
                                    placeholder="Tu nuevo password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                        }
                        {
                            msg &&
                            <Alerta
                                alerta={alerta}
                            />
                        }
                        {
                            tokenValido &&
                                <div className={styles.formBox}>
                                    <input 
                                    type="submit" 
                                    value="Guardar Password"
                                    className={styles.btnSubmit}
                                    />
                                </div>
                        }
                        {
                            passwordModificado &&
                            <div className={styles.formBox}>
                                <Link 
                                className={styles.links_submit} 
                                to="/"
                                >
                                    Inicia sesión.
                                </Link>
                            </div>
                        }
                    </form>
            </div>
        </>
    )
}

export default NuevoPassword