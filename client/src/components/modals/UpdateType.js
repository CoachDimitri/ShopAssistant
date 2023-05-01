import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { editType, fetchTypes } from "../../http/deviceAPI";

const UpdateType = ({ show, onHide, typeId }) => {
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [typeFound, setTypeFound] = useState(false);

    useEffect(() => {
        fetchType(typeId);
    }, [typeId]);

    const fetchType = async (id) => {
        if (!id) return;
        try {
            const types = await fetchTypes();
            const type = types.find((t) => t.id === id);
            setValue(type.name);
        } catch (e) {
            console.error(e);
        }
    };

    const searchTypeHandler = async () => {
        try {
            const types = await fetchTypes();
            const type = types.find((t) => t.name === searchValue);
            if (type) {
                setTypeFound(true);
            } else {
                setTypeFound(false);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const updateTypeHandler = () => {
        editType({ id: typeId, name: value }).then(() => onHide());
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!typeFound ? (
                    <Form>
                        <Form.Control
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={"Введите название типа для поиска"}
                        />
                        <Button
                            variant="outline-primary"
                            onClick={searchTypeHandler}
                            style={{ marginTop: "10px" }}
                        >
                            Поиск
                        </Button>
                    </Form>
                ) : (
                    <Form>
                        <Form.Control
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={"Введите новое название типа"}
                        />
                        <Button
                            variant="outline-success"
                            onClick={updateTypeHandler}
                            style={{ marginTop: "10px" }}
                        >
                            Изменить
                        </Button>
                    </Form>
                )}
                {searchValue && !typeFound && (
                    <p style={{ color: "red", marginTop: "10px" }}>Тип не найден</p>
                )}
                {typeFound && (
                    <p style={{ color: "green", marginTop: "10px" }}>Тип найден. Введите новое название и нажмите Изменить</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateType;
