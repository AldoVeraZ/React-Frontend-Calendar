// useAuthStore tiene como objetivo realizar cualquier
// interacción con la parte del Auth en nuestro store

import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  onLogoutCalendar,
} from "../store";

export const useAuthStore = () => {
  // no ucupa ningun argumento o dependencia
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Proceso de login, es un proceso que llega al backend no puede ser sincono, no es
  // una accion que suceda instantaneamente
  const starLogin = async ({ email, password }) => {
    // console.log({ email, password });
    dispatch(onChecking());

    try {
      // llegar a mi backend

      const { data } = await calendarApi.post("/auth", { email, password });
      // console.log({ resp });
      // cuando todo sale bien
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      // console.log(error);
      dispatch(onLogout("Credenciales incorrectas!"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  // startRegister
  const startRegister = async ({ email, password, name }) => {
    // console.log({ email, password });
    dispatch(onChecking());

    try {
      // llegar a mi backend

      const { data } = await calendarApi.post("/auth/new", {
        email,
        password,
        name,
      });
      // console.log({ resp });
      // cuando todo sale bien
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      // console.log(error);
      dispatch(onLogout(error.response.data?.msg || "--"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  // Funcion para verificar validez del token
  const checkAuthToken = async () => {
    // obtengo el token
    const token = localStorage.getItem("token");
    // si no existe el token
    if (!token) return dispatch(onLogout());

    // en caso de que si haya un token
    try {
      const { data } = await calendarApi.get("auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      // si algo no funciona
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,
    //* Métodos
    // acciones q las personas van a poder llamar
    // ( otros desarrolladores) para interactuar con
    // nuestro store
    checkAuthToken,
    starLogin,
    startLogout,
    startRegister,
  };
};
