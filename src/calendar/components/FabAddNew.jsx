import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  // dispacht de ciertas acciones
  // cuando hago click en este boton quiero abrir el modal principalmente y ala vez quiero activar una nota para que la persona pueda ver la nota activa
  // Para hacer esto voy a ocupar mis dos hooks que tiene la relación al Store, y la segunda es importar los hooks.
  const { openDateModal } = useUiStore();
  // limpiar la nota anterior
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Fernando",
      },
    });
    openDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
