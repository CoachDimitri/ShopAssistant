import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { deleteBrand } from "../../http/deviceAPI";

const DeleteBrand = ({ show, onHide, brand }) => {
    const [error, setError] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteBrand(brand.id);
            setError(false);
            onHide();
        } catch (e) {
            setError(true);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить бренд</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Вы уверены, что хотите удалить бренд "{brand.name}"?
                {error && (
                    <div className="text-danger mt-2">
                        Произошла ошибка при удалении бренда
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>
                    Отмена
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Удалить
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBrand;
