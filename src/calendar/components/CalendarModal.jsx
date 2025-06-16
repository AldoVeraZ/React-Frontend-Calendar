import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
// codigo personalizado mio
import { useCalendarStore, useUiStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();

  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formSubmitted, setformSubmitted] = useState(false);

  const [formValues, setformValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  // Para memorizar el valor de invalid
  const titleClass = useMemo(() => {
    // si el formulario no se ha disparado se hace un return de un string vacio, regreso un string vacio en la clase y lo regreso en el input
    if (!formSubmitted) return "";

    // si ya se hizo el posteo del formulario y si la persona no ha ingresado el titulo o esta vacio, entonces muestro el error
    return formValues.title.length > 0
      ? "" // si el titulo es mayor a cero, regresamos un string vacio o el is-valid
      : "is-invalid"; // caso que no haya titulo entonces regresamos is-invalid
  }, [formValues.title, formSubmitted]); // dependencias que cambian su valor, este valor se va a memorizar unicamente si el titulo cambia o si el formsubmitted
  // cambia osea si se presiona el boton submit

  // Usamos useeffect para los cambios respectivos del modal
  useEffect(() => {
    // cuando la nota no es nula
    if (activeEvent !== null) {
      // volvemos a rellenar el formulario y le esparcimos todo el active event, se esparcen las propiedades y se crea un nuevo objeti
      setformValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChanged = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setformValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    // console.log("cerrando modal");
    closeDateModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // se intento de hacer posteo en el formulario osea true, sea q este correcto o no el titulo, el formulario a sido intentado de postear
    setformSubmitted(true);

    // console.log("Fecha inicio:", formValues.start);
    // console.log("Fecha fin:", formValues.end);

    // No se debe permitir que la fecha inicial sea menor a la fecha final es decir, la fecha final siempre tiene que ser mayor
    // crear la diferencia
    const difference = differenceInSeconds(formValues.end, formValues.start);
    // console.log({ difference });

    if (isNaN(difference) || difference <= 0) {
      // si no es un numero hago un return
      // console.log("Error en fechas");
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }

    if (formValues.title.length <= 0) return;

    console.log(formValues);

    // TODO:
    // Si todo sale bien llamo el metodo para grabar
    await startSavingEvent(formValues);
    closeDateModal();
    setformSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event) => onDateChanged(event, "start")}
            dateFormat="Pp"
            className="form-control"
            wrapperClassName="w-100"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDateChanged(event, "end")}
            dateFormat="Pp"
            className="form-control"
            wrapperClassName="w-100"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
