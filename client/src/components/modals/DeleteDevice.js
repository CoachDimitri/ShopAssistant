import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {deleteDevice} from "../../http/deviceAPI";

const DeleteDevice = ({show, onHide, device}) => {
    const [error, setError] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteDevice(device.id);
            setError(false);
            onHide();
        } catch (e) {
            setError(true);
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить девайс</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Вы уверены, что хотите удалить девайс "{device.name}"?
                {error && <div className="text-danger mt-2">Произошла ошибка при удалении девайса</div>}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>Отмена</button>
                <button className="btn btn-danger" onClick={handleDelete}>Удалить</button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteDevice;