import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { editBrand } from "../../http/deviceAPI";

const EditBrand = ({ show, onHide }) => {
    const [oldBrandName, setOldBrandName] = useState('');
    const [newBrandName, setNewBrandName] = useState('');

    const handleSubmit = () => {

        // editBrand({ id: brand.id, name: newBrandName }).then(data => {
        //     console.log(data)
        //     setCurrentName(data);
        //     onHide();
        // });
        console.log(oldBrandName)
        console.log(newBrandName)

    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Текущее название бренда</Form.Label>
                        <Form.Control type="text" placeholder="Введите старое название" value={oldBrandName} onChange={(e) => setOldBrandName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Новое название бренда</Form.Label>
                        <Form.Control type="text" placeholder="Введите новое название" value={newBrandName} onChange={(e) => setNewBrandName(e.target.value)} />
                    </Form.Group>
                    <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                    <Button variant="outline-success" onClick={handleSubmit} type="submit">Сохранить</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditBrand;
