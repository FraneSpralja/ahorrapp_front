import useGastos from "../hooks/useGastos";
import { useEffect, useState } from "react";

// Styles
import styles from "../assets/style/componentes.module.css"

const Gasto = (gasto) => {
    const [ fechaNueva, setFechaNueva ] = useState("")
    const monto = gasto.gasto;

    useEffect(() => {
        const formatearFecha = (fecha) => {
            let nuevaFecha = new Date(fecha);
            nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
            const fechaCorregida = new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha);

            setFechaNueva(fechaCorregida)
            console.log(fechaNueva)
        }

        formatearFecha(monto.fecha)
    }, [])

    const { setEditar, eliminarGasto } = useGastos()
    return (
        <>
            <div className={styles.monto_card}>
                <div className={styles.monto_card_head}>
                    <h3>{monto.nombre}</h3>
                    <span><strong>Fecha: </strong> {fechaNueva}</span>
                    
                </div>
                <div className={styles.monto_card_body}>
                    <div className={styles.card_body_info}>
                        <span 
                            className={styles.monto_tipo}
                            data-type={`${monto.tipo}`}
                        >
                            {monto.tipo}
                        </span>
                        <span className={styles.monto_etiqueta}>
                            {monto.etiqueta}
                        </span>
                    </div>
                    <div className={styles.card_body_monto}>
                        <span className={styles.monto_monto}><strong>Total: </strong>${monto.monto}</span>
                    </div>
                </div>

                <div className={styles.gasto_acciones}>
                    <button 
                        className={styles.acciones_btn_editar}
                        onClick={() => setEditar(monto)}
                    >
                        Editar
                    </button>
                    
                    <button 
                        className={styles.acciones_btn_eliminar}
                        onClick={() => eliminarGasto(monto)}
                    >
                        Eliminar
                    </button>
                </div>

            </div>
        </>
    )
}

export default Gasto