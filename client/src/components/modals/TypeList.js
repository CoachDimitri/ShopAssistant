import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { deleteType, fetchTypes } from '../../http/deviceAPI';

const TypeList = ({ show, onHide }) => {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

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

    const handleTypeChange = (event) => {
        const typeId = parseInt(event.target.value);
        const type = types.find((t) => t.id === typeId);
        setSelectedType(type);
    };

    const handleDelete = async () => {
        try {
            await deleteType(selectedType.id);
            setTypes(types.filter((t) => t.id !== selectedType.id));
            setSelectedType(null);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удаление типа</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Выберите тип для удаления</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedType ? selectedType.id : ''}
                            onChange={handleTypeChange}
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={!selectedType}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TypeList;
