// Custom Hook
// es un hook que me va a servir para manejar y hacer dispatch de acciones y controlar propiamente todo lo que
// está relacionado a mi UI Store o a mi UI en el store

import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {
  // dentro del mismo tengo acceso al store

  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  // Toggle si esta abierta se cierra y si esta cerrado se abra
  const toggleDateModal = () => {
    // basado en isDateModalOpen
    isDateModalOpen ? openDateModal() : closeDateModal();
  };

  return {
    //* regresar ciertas propiedades Properties
    isDateModalOpen,

    //* Métodos
    closeDateModal,
    openDateModal,
    toggleDateModal,
  };
};
