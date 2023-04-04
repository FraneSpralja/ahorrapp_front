import { Link } from 'react-router-dom'

// Styles
import styles from "../assets/style/componentes.module.css"

const AdminNav = () => {
    return (
        <nav className={styles.nav_admin_nav}>
            <Link 
                to="/admin/perfil"
                className={styles.link_admin_nav}
            >
                Perfil
            </Link>
            <span>|</span>
            <Link 
                to="/admin/cambiar-password"
                className={styles.link_admin_nav}
            >
                Cambiar Password
            </Link>
        </nav>
    )
}

export default AdminNav