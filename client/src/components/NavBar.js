import React, { useContext } from 'react';
import { Context } from '../index';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Button, Image } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import basketImg from '../assets/basket.png';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const history = useHistory();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    return (
        <Navbar bg='dark' variant='dark' expand='sm' style={{ height: '60px' }}>
            <Container>
                <Navbar.Brand as={NavLink} to={SHOP_ROUTE} className='ml-3'>
                    ShopAssistant
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    {user.isAuth ? (
                        <Nav className='ml-auto' style={{ color: 'white' }}>
                            <Button variant={'outline-light'} onClick={() => history.push(ADMIN_ROUTE)}>
                                Админ панель
                            </Button>
                            <Image
                                src={basketImg}
                                alt='basket'
                                onClick={() => history.push(BASKET_ROUTE)}
                                className='ml-2'
                                style={{ height: '30px', cursor: 'pointer' }}
                            />
                            <Button variant={'outline-light'} onClick={() => logOut()} className='ml-3'>
                                Выйти
                            </Button>
                        </Nav>
                    ) : (
                        <Nav className='ml-auto' style={{ color: 'white' }}>
                            <Button variant={'outline-light'} onClick={() => history.push(LOGIN_ROUTE)}>
                                Авторизация
                            </Button>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;
