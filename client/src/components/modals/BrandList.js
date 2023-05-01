import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { deleteBrand, fetchBrands } from '../../http/deviceAPI';

const BrandList = ({ show, onHide }) => {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);

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

    const handleBrandChange = (event) => {
        const brandId = parseInt(event.target.value);
        const brand = brands.find((b) => b.id === brandId);
        setSelectedBrand(brand);
    };

    const handleDelete = async () => {
        try {
            await deleteBrand(selectedBrand.id);
            setBrands(brands.filter((b) => b.id !== selectedBrand.id));
            setSelectedBrand(null);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удаление бренда</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Выберите бренд для удаления</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedBrand ? selectedBrand.id : ''}
                            onChange={handleBrandChange}
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={!selectedBrand}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BrandList;
