import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
    // es un start osea va a empezar la eliminacion
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{
        display: hasEventSelected ? "" : "none",
        // si tenemos un evento seleccionado no voy a regresar nada pero si no tenemos un evento seleccionado el display va a ser none
        // de esta manera el boton fisicamente existe solo que lo estoy oculando o no
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
