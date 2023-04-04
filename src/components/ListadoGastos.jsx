import useGastos from "../hooks/useGastos"
import Gasto from "./Gasto";

// Style
import styles from "../assets/style/componentes.module.css"

const ListadoGastos = () => {
    const { gastos } = useGastos();

    return (
        <>              
            <h2 className={styles.listado_header}>Últimos gastos</h2>
            {gastos.length ? 
                (gastos.map( (gasto) => (
                    <Gasto 
                        key={gasto._id}
                        gasto={gasto}
                    />
                )))
            
            : 
            
            (
                <>
                    <h2 className={styles.title_sin_gastos}> No cuentas con gastos o ingresos registrados </h2>
                </>
            )}
        </>
    )
}

export default ListadoGastos