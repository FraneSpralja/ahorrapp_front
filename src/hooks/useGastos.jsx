import { useContext } from "react";
import GastoContext from "../context/GastoProvider";

const useGastos = () => {
    return useContext(GastoContext);
}

export default useGastos;