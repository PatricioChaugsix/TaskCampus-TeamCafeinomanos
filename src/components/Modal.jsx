import Button from "./Button";

const Modal = ({ visible, mensaje, onConfirmar, onCancelar, deshabilitado }) => {
  if (!visible) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{mensaje}</p>
        <div className="modal-acciones">
          <Button label="Confirmar" variant="danger" onClick={onConfirmar} disabled={deshabilitado} />
          <Button label="Cancelar" variant="secondary" onClick={onCancelar} disabled={deshabilitado} />
        </div>
      </div>
    </div>
  );
};
export default Modal;
