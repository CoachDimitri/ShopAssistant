import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
import BrandList from '../components/modals/BrandList';
import TypeList from "../components/modals/TypeList";
import EditType from "../components/modals/UpdateType";
import EditBrand from "../components/modals/EditBrand";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [deleteBrandVisible, setDeleteBrandVisible] = useState(false);
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);
    const [editBrandVisible, setEditBrandVisible] = useState(false);
    const [editTypeVisible, setEditTypeVisible] = useState(false);

    const showBrandDeleteModal = () => {
        setDeleteBrandVisible(true);
    };

    const hideBrandDeleteModal = () => {
        setDeleteBrandVisible(false);
    };

    const showTypeDeleteModal = () => {
        setDeleteTypeVisible(true);
    };

    const hideTypeDeleteModal = () => {
        setDeleteTypeVisible(false);
    };

    const showEditBrandModal = () => {
        setEditBrandVisible(true);
    };

    const hideEditBrandModal = () => {
        setEditBrandVisible(false);
    };

    const showEditTypeModal = () => {
        setEditTypeVisible(true);
    };

    const hideEditTypeModal = () => {
        setEditTypeVisible(false);
    };

    return (
        <Container className="d-flex flex-column">
            <Button variant={'outline-dark'} className="mt-4 p-2" onClick={() => setTypeVisible(true)}>
                Добавить тип
            </Button>
            <Button variant={'outline-dark'} className="mt-4 p-2" onClick={() => setBrandVisible(true)}>
                Добавить бренд
            </Button>
            <Button variant={'outline-dark'} className="mt-4 p-2" onClick={() => setDeviceVisible(true)}>
                Добавить устройство
            </Button>
            <Button variant={'danger'} className="mt-4 p-2" onClick={showBrandDeleteModal}>
                Удалить бренд
            </Button>
            <Button variant={'danger'} className="mt-4 p-2" onClick={showTypeDeleteModal}>
                Удалить тип
            </Button>
            <Button variant={'outline-primary'} className="mt-4 p-2" onClick={showEditBrandModal}>
                Редактировать бренд
            </Button>
            <Button variant={'outline-primary'} className="mt-4 p-2" onClick={showEditTypeModal}>
                Редактировать тип
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <BrandList show={deleteBrandVisible} onHide={hideBrandDeleteModal} />
            <TypeList show={deleteTypeVisible} onHide={hideTypeDeleteModal} />
            <EditBrand show={editBrandVisible} onHide={hideEditBrandModal}/>
            <EditType show={editTypeVisible} onHide={hideEditTypeModal} />
        </Container>
    );
};

export default Admin;

