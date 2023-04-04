import { Outlet } from "react-router-dom"

// Styles
import styles from "../assets/style/authLayout.module.css"

const AuthLayout = () => {
    return (
        <> 
            <main className={styles.mainContainer}>
                <Outlet />
            </main>
        </>
    )
}

export default AuthLayout