import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Styles
import styles from "../assets/style/componentes.module.css"

const Header = () => {
    const [ burger, setBurgerMenu ] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(true);

    const handleToggle = () => {
        setToggleMenu(!toggleMenu)
    }

    useEffect(() => {
        const handleBurguerMenu = () => {
            if(window.innerWidth > 760) {
                setBurgerMenu(false)
            } else {
                setBurgerMenu(true)
            }
        }
        
        window.addEventListener('resize', () => {
            handleBurguerMenu()
        });
        handleBurguerMenu()
    }, [])

    const { cerrarSesion } = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <h1>
                    <span>Ahorrap -</span> {''} 
                    Inicio
                </h1>
                {
                    !burger ?
                    <>
                        <nav className={styles.header_nav}>
                                <Link className={styles.header_nav_link} to="/admin"> Inicio </Link>
                                <Link className={styles.header_nav_link} to="/admin/perfil"> Perfil </Link>

                            <button
                                type="button"
                                className={styles.btn_logout}
                                onClick={cerrarSesion}
                            >
                                Cerrar sesión
                            </button>
                        </nav>
                    </>
                    :
                    <>
                        <button
                            type='button'
                            onClick={handleToggle}
                            className={styles.menu_bars}
                        >
                        </button>
                        {
                            toggleMenu ?
                            <></>
                            :
                            <nav className={styles.header_nav_mobile}>
                                    <Link className={styles.header_nav_link} to="/admin"> Inicio </Link>
                                    <Link className={styles.header_nav_link} to="/admin/perfil"> Perfil </Link>

                                <button
                                    type="button"
                                    className={styles.btn_logout}
                                    onClick={cerrarSesion}
                                >
                                    Cerrar sesión
                                </button>
                            </nav>
                        }
                    </>
                }
            </div>
        </header>
    )
}

export default Header