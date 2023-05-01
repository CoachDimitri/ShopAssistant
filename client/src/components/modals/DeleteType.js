import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteType } from "../../http/deviceAPI";

const DeleteType = ({ show, onHide, typeId }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        await deleteType(typeId);
        setIsLoading(false);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>Вы уверены, что хотите удалить этот тип?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} disabled={isLoading}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? "Удаление..." : "Удалить"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteType;
