import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

// Todo: configurar interceptores
// interceptores es algo que tiene axios que nos permite
// interceptar una peticion antes o despues de que se haga
// y añadir o modificar la respuesta o añadir o modificar
// informacion a la petición
// Permiten interceptar las peticiones ya sea las que van hacia el backend o las que regresan , En ese caso, nosotros ocupamos un interceptor
//  a la hora de hacer un request, no una response a la hora de hacer un request.
// Nosotros ocupamos interceptarlo y añadir la configuración específica que ocupamos en nuestros headers del x token
// pero esto les funcionaría para modificar cualquier header en la petición.

// despues de la palabra reservada interceptors se puede escoger o request o response, en este caso request porque esoy haciendo la solicitud
// osea seri un interceptor de request, entonces antes de que se haga la solicitud quiero que uses este interceptor, osea .use()
calendarApi.interceptors.request.use((config) => {
  config.headers = {
    // esparcir todos los headers que vengan en la configuración, puede que vengan o puede que no
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  return config;
});

export default calendarApi;
