import useGastos from "../hooks/useGastos";

// Styles
import styles from "../assets/style/componentes.module.css"

const Gasto = (gasto) => {
    const monto = gasto.gasto;

    const { setEditar, eliminarGasto } = useGastos()
    return (
        <>
            <div className={styles.monto_card}>
                <div className={styles.monto_card_head}>
                    <h3>{monto.nombre}</h3>
                    <span><strong>Fecha: </strong> {new Date(monto.fecha).toLocaleDateString()}</span>
                    
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