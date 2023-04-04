import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

// Style
import styles from "../assets/style/authLayout.module.css"

const ConfirmarCuenta = () => {
    const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/user/confirmar/${id}`;
                const { data } = await clienteAxios(url);

                setCuentaConfirmada(true);
                setAlerta({
                    msg: data.msg,
                })
                
            } catch (error) {
                setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            }

            setCargando(false);
        }

        confirmarCuenta();
    }, []);

    return (
        <>
            <div className={styles.loginHeader}>
                <h1 
                className={styles.loginHeader_title}
                    >Confirma tu cuenta de <span>Ahorrapp</span>
                </h1>
            </div>
            <div className={styles.loginBody}>
                {!cargando &&
                    <Alerta
                        alerta={alerta}
                    />
                }

                {
                    cuentaConfirmada &&
                    <Link 
                    className={styles.links_login} 
                    to="/"
                    >
                        Inicia sesión.
                    </Link>
                }
            </div>
        </>
    )
}

export default ConfirmarCuenta