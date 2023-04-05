import { useState, useEffect } from "react"

import Alerta from "./Alerta";
import useGastos from "../hooks/useGastos";

// Style
import styles from "../assets/style/componentes.module.css"

const Formulario = () => {
    const { guardarGasto, gasto } = useGastos();

    const [ mostrarFormulario, setMostrarFormulario ] = useState(false);
    const [ alerta, setAlerta ] = useState({});
    // state formulario
    const [ nombre, setNombre ] = useState("");
    const [ tipo, setTipo ] = useState("");
    const [ monto, setMonto ] = useState("");
    const [ etiqueta, setEtiqueta ] = useState("");
    const [ fecha, setFecha ] = useState("");
    // state editar gasto
    const [ gastoId, setGastoId ] = useState(null);
    

    const handelMostrarFormulario = () => {
        setMostrarFormulario(!mostrarFormulario) 
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if([nombre, tipo, monto, etiqueta].includes("")) {
            setAlerta({
                msg: "Los campos marcados son obligatorios",
                error: true
            })

            e.target.classList.add('errorSubmit')

            return;
        }


        setAlerta({})
        e.target.classList.remove('errorSubmit')
        guardarGasto({
            nombre,
            tipo,
            monto,
            etiqueta,
            fecha,
            id: gastoId
        })
    }

    useEffect(() => {
            if(gasto?._id) {
                setMostrarFormulario(true)

                setNombre(gasto.nombre)
                setTipo(gasto.tipo)
                setMonto(gasto.monto)
                setEtiqueta(gasto.etiqueta)
                setFecha(gasto.fecha)
                setGastoId(gasto._id)
            }
    }, [gasto])

    const { msg } = alerta;

    return (
        <>
        <div className={styles.header_formulario_admin}>
            {
                !mostrarFormulario ?
                <button
                    onClick={handelMostrarFormulario}
                    className={styles.btn_toogle_abrir}
                >
                    Agregar nuevo monto
                </button>

                :
                <button
                    onClick={handelMostrarFormulario}
                    className={styles.btn_toogle_cerrar}
                >
                    Cerrar formulario
                </button>
            }
        </div>
        {
            mostrarFormulario &&
            <form 
                className={styles.formulario_admin}
                action=""
                onSubmit={handleSubmit}
            >

                <div className={styles.form_admin_box}>
                    <label htmlFor="nombre">
                        Nombre del gasto
                    </label>
                    <input 
                        id="nombre"
                        type="text" 
                        placeholder="Nombre de gasto/ingreso"
                        className={styles.form_admin_input}
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className={styles.form_admin_box}>
                    <label htmlFor="tipo">
                        Tipo de Monto
                    </label>
                    <select 
                        id="tipo"
                        className={styles.form_admin_input}
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                    >
                        <option value="" defaultValue disabled>Tipo de monto a ingresar</option>
                        <option value="ingreso">Ingreso</option>
                        <option value="gasto">Gasto</option>
                    </select>
                </div>
                <div className={styles.form_admin_box}>
                    <label htmlFor="monto">
                        Monto para agregar <span>(sin puntos ni comas)</span>
                    </label>
                    <input 
                        id="monto"
                        type="text" 
                        placeholder="Ej. 20000"
                        className={styles.form_admin_input}
                        value={monto}
                        onChange={e => setMonto(e.target.value)}
                    />
                </div>
                <div className={styles.form_admin_box}>
                    <label htmlFor="etiqueta">
                        Etiqueta del gasto/ingreso
                    </label>
                    <select 
                        id="etiqueta"
                        className={styles.form_admin_input}
                        value={etiqueta}
                        onChange={e => setEtiqueta(e.target.value)}
                    >
                        <option value="" defaultValue disabled>Etiqueta el del gasto/ingreso</option>
                        <option value="alimento">Alimento</option>
                        <option value="bienestar">Bienestar</option>
                        <option value="educacion">Educación</option>
                        <option value="salud">Salud</option>
                        <option value="sueldo">Sueldo</option>
                        <option value="otro">Otros</option>
                    </select>
                </div>
                <div className={styles.form_admin_box}>
                    <label htmlFor="fecha">
                        Feche en que se realizo el gasto/ingreso
                    </label>
                    <input 
                        id="fecha"
                        type="date" 
                        className={styles.form_admin_input}
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                {
                    msg &&
                    <Alerta
                        alerta={alerta}
                    />
                }

                <div className={styles.form_admin_box}>
                    <input 
                        className={styles.btnSubmit}
                        type="submit"
                        value={ gastoId ? 'Editar Gasto' : 'Guardar Gasto' }
                    />
                </div>

            </form>
        }

        </>
    )
}

export default Formulario