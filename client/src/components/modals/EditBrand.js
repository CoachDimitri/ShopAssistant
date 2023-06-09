import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button, FormGroup} from "react-bootstrap";
import {editBrand, fetchBrands} from "../../http/deviceAPI";

const EditBrand = ({ show, onHide }) => {

    const [brands, setBrands] = useState([]);

    const [oldBrand, setOldBrand] = useState(null);
    const [newBrandName, setNewBrandName] = useState('');

    useEffect(() => {
        const getBrands = async () => {
            try {
                const data = await fetchBrands();
                setBrands(data);
            } catch (e) {
                console.error(e);
            }
        };
        getBrands();
    }, []);

    const handleSubmit = () => {
        editBrand(oldBrand.id, newBrandName).then(data => {
            console.log(data)
        });
    }

    const onOldBrandChange = (event) => {
        const brandId = parseInt(event.target.value);
        const brand = brands.find((b) => b.id === brandId);
        setOldBrand(brand);
    };

    const onNewBrandChange = (event) => {
        setNewBrandName(event.target.value)
    };

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
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Выберите бренд для удаления</Form.Label>
                        <Form.Control
                            as="select"
                            value={oldBrand ? oldBrand.id : ''}
                            onChange={onOldBrandChange}
                            custom
                        >
                            <option value="">Выберите бренд...</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Новое название бренда</Form.Label>
                        <Form.Control type="text" placeholder="Введите новое название" value={newBrandName} onChange={onNewBrandChange} />
                    </Form.Group>
                    <Button variant="outline-danger" onClick={onHide} type="submit">Закрыть</Button>
                    <Button variant="outline-success" onClick={handleSubmit} type="submit">Сохранить</Button>

                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditBrand;
