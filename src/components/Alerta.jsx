
// Styles
import styles from "../assets/style/componentes.module.css"

const Alerta = ({alerta}) => {
    return (
        <div 
        className={styles.alerta}
        data-error={alerta.error}
        >
            {alerta.msg}
        </div>
    )
}

export default Alerta