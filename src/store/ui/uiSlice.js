// Redux sirve para mantener la información del UI de manera centralizada, asegurando que el estado de la interfaz (como modales, loaders, temas, etc.)
//  pueda ser accedido y modificado desde cualquier componente de la aplicación.
// UI en Redux se refiere a estados de la interfaz, como modales, loaders, temas, etc.
// Reducers son funciones que modifican el estado global según las acciones.
// Slices agrupan el estado y las acciones de una parte de la app.
// Store es el almacén global donde guardamos todos los estados manejados por Redux.
// useSelector permite leer el estado global.
// useDispatch permite ejecutar acciones para modificar el estado
import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDateModalOpen: false,
  },
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
