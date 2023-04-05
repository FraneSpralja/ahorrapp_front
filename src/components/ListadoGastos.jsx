import useGastos from "../hooks/useGastos"
import Gasto from "./Gasto";

// Style
import styles from "../assets/style/componentes.module.css"
import { useState, useEffect } from "react";

const ListadoGastos = () => {
    const { gastos } = useGastos();
    const [ newGasto, setNewGasto ] = useState(false)

    useEffect(() => {
        const readGastos = async () => {
            if( await gastos.length > 0) {
                setNewGasto(true)
            }
        }

        readGastos()
    }, [gastos])

    return (
        <>              
            <h2 className={styles.listado_header}>Últimos gastos</h2>
            {newGasto ? 
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