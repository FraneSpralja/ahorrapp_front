import styles from "../assets/style/componentes.module.css"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.paragraph}> <span>Ahorrap</span> - Manten control de tus ingresos y gastos</p>
            <p className={styles.paragraph}> <span>By Frane Spralja</span></p>
        </footer>
    )
}

export default Footer