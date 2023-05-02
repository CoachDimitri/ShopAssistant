import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button, FormGroup} from "react-bootstrap";
import {editType, fetchTypes} from "../../http/deviceAPI";

const EditType = ({ show, onHide }) => {

    const [types, setTypes] = useState([]);

    const [oldType, setOldType] = useState(null);
    const [newTypeName, setNewTypeName] = useState('');

    useEffect(() => {
        const getTypes = async () => {
            try {
                const data = await fetchTypes();
                setTypes(data);
            } catch (e) {
                console.error(e);
            }
        };
        getTypes();
    }, []);

    const handleSubmit = () => {
        editType(oldType.id, newTypeName).then(data => {
            console.log(data)
        });
    }

    const onOldTypeChange = (event) => {
        const typeId = parseInt(event.target.value);
        const type = types.find((t) => t.id === typeId);
        setOldType(type);
    };

    const onNewTypeChange = (event) => {
        setNewTypeName(event.target.value)
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Выберите тип для удаления</Form.Label>
                        <Form.Control
                            as="select"
                            value={oldType ? oldType.id : ''}
                            onChange={onOldTypeChange}
                            custom
                        >
                            <option value="">Выберите тип...</option>
                            {types.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Новое название типа</Form.Label>
                        <Form.Control type="text" placeholder="Введите новое типа" value={newTypeName} onChange={onNewTypeChange} />
                    </Form.Group>
                    <Button variant="outline-danger" onClick={onHide} type="submit">Закрыть</Button>
                    <Button variant="outline-success" onClick={handleSubmit} type="submit">Сохранить</Button>

                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditType;
