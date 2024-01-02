import axios from "axios";

const publicAxios=axios.create({
    baseURL:import.meta.env.VITE_Base_Url
})

export {publicAxios}