import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useGastos from "../hooks/useGastos"

// Styles
import styles from "../assets/style/componentes.module.css"

const ResumenMontos = () => {
    const { gastos } = useGastos();
    const { auth, mainIngreso } = useAuth();

    const { main_ingreso } = auth;

    const [ totalGasto, setTotalGasto ] = useState("")
    const [ totalIngreso, setTotalIngreso ] = useState("")
    const [ ingresoPrincipal, setIngresoPrincipal ] = useState("")
    const [ verSaldo, setVerSaldo ] = useState(false)

    const toggleVerSaldo = () => {
        setVerSaldo(!verSaldo)
    }

    useEffect(() => {
        const montoTotalDeGastos = () => {
            const newArrGatos = gastos
                .map(({_id, nombre, createdAt, etiqueta, fecha, updatedAt, user, __v, ...gasto }) => {
                    if(gasto.tipo === "gasto") {
                        return Number(gasto.monto)
                    }
                })
                .filter((gasto) => gasto != undefined)
                .reduce((a,b) => a + b, 0 )

            setTotalGasto(newArrGatos)
        }

        const montoTotalIngreso = () => {
            const newArrIngresos = gastos
                .map(({_id, nombre, createdAt, etiqueta, fecha, updatedAt, user, __v, ...ingreso }) => {
                    if(ingreso.tipo === "ingreso") {
                        return Number(ingreso.monto)
                    }
                })
                .filter((ingreso) => ingreso != undefined)
                .reduce((a,b) => a + b, 0 )

                setTotalIngreso(newArrIngresos)
        }

        
        montoTotalDeGastos()
        montoTotalIngreso()
    }, [gastos])
    
    useEffect(() => {
        setIngresoPrincipal(mainIngreso)

    }, [mainIngreso])

    return (
        <>
        <div className={styles.resumen_container}>
            <div className={styles.resumen_total}>
                {
                    window.innerWidth < 760 ?
                    <>
                        <button
                            onClick={toggleVerSaldo}
                            className={styles.button_ver_saldo}
                        >
                            Ver Saldo
                        </button>
                        {
                            verSaldo && (
                                <>                        
                                    <div className={styles.resumen_ingresos}>
                                            <span className={styles.resumen_monto}>${ingresoPrincipal + totalIngreso}</span>
                                    </div>
                                    <div className={styles.resumen_gastos}>
                                            <span className={styles.resumen_monto}>${totalGasto}</span>
                                    </div>
                                    {
                                        ingresoPrincipal + totalIngreso - totalGasto > 0 ?
                                    <div className={styles.resumen_montoTotal_positivo}>
                                            <span className={styles.resumen_monto}>${ingresoPrincipal + totalIngreso - totalGasto}</span>
                                    </div>
                                    :
                                    <div className={styles.resumen_montoTotal_negativo}>
                                            <span className={styles.resumen_monto}>${ingresoPrincipal + totalIngreso - totalGasto}</span>
                                    </div>
                                    }
                                </>
                            )
                        }
                    </>
                    :
                    <>                        
                    <div className={styles.resumen_ingresos}>
                            <span className={styles.resumen_monto}>${ingresoPrincipal + totalIngreso}</span>
                    </div>
                    <div className={styles.resumen_gastos}>
                            <span className={styles.resumen_monto}>${totalGasto}</span>
                    </div>
                    {
                        ingresoPrincipal + totalIngreso - totalGasto > 0 ?
                    <div className={styles.resumen_montoTotal_positivo}>
                            <span className={styles.resumen_monto}>${ingresoPrincipal + totalIngreso - totalGasto}</span>
                    </div>
                    :
                    <div className={styles.resumen_montoTotal_negativo}>
                            <span className={styles.resumen_monto}>${ingresoPrincipal + totalIngreso - totalGasto}</span>
                    </div>
                    }
                </>
                }
            </div>
        </div>
        </>
    )
}

export default ResumenMontos