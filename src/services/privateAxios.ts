import axios from "axios";
import { publicAxios } from "./publicAxios";
const privateAxios = axios.create({
  baseURL: import.meta.env.VITE_Base_Url,
});

privateAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


privateAxios.interceptors.response.use((res)=> {


    return res
}, async (error)=>{
    const originalConfig = error.config

    if (error.response){
        if (error.response.status === 401 && !originalConfig._retry){
            originalConfig._retry = true
            try {
                const currentRefreshToken = localStorage.getItem("refreshToken")

                const res = await publicAxios.post("/api/accounts/refresh/" , {
                    refresh : currentRefreshToken
                })

                const accesToken = res.data.access

                if (accesToken){
                    localStorage.setItem("accessToken" , accesToken)
                    return privateAxios(originalConfig)
                }


            }catch (err:any){
                if(err.status===401)
                {
                    window.location.href="/login"
                }

            }
        }
    }
})

export { privateAxios };
