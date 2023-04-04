import Formulario from "../components/Formulario"
import ListadoGastos from "../components/ListadoGastos"

// Style
import styles from "../assets/style/adminLayout.module.css"

const AdministrarMontos = () => {
    return (
        <div className={styles.main_admin}>
            <div className={styles.formulario_admin}>
                <Formulario />
            </div>

            <div className={styles.lista_admin}>
                <ListadoGastos />
            </div>
        </div>
    )
}

export default AdministrarMontos