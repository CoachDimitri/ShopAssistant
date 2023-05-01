import { NavLink } from "react-router-dom";
import { listBasket, fetchOneDevice } from '../http/deviceAPI';
import { useEffect, useState } from "react";
import { SHOP_ROUTE } from "../utils/consts";
import './Basket.css';
import axios from "axios";

const Basket = () => {
    const [basketItems, setBasketItems] = useState([]);
    const userId = localStorage.getItem('userId');


    useEffect(() => {
        const fetchBasketItems = async () => {
            const idCounts = listBasket.reduce((acc, id) => {
                if (id in acc) {
                    acc[id] += 1;
                } else {
                    acc[id] = 1;
                }
                return acc;
            }, {});

            const items = await Promise.all(
                Object.keys(idCounts).map(id => fetchOneDevice(id))
            );

            items.forEach(item => {
                item.count = idCounts[item.id];
            });

            setBasketItems(items);
        };
        fetchBasketItems();
    }, []);

    // Функция для увеличения количества товара в корзине
    const handleIncreaseCount = (id) => {
        // Создаем новый массив корзины с обновленным количеством товара
        const updatedItems = basketItems.map(item => {
            if (item.id === id) {
                item.count += 1;
            }
            return item;
        });
        setBasketItems(updatedItems);
    };

    const handleDecreaseCount = (id) => {
        const updatedItems = basketItems.map(item => {
            if (item.id === id) {
                item.count -= 1;
            }
            return item;
        }).filter(item => item.count > 0);
        setBasketItems(updatedItems);
    };

    const totalPrice = basketItems.reduce((acc, item) => {
        return acc + item.price * item.count;
    }, 0);


    const itemCount = basketItems.reduce((acc, item) => {
        return acc + item.count;
    }, 0);
    const handleCheckout = async () => {
        const items = basketItems.map(item => {
            return {
                productId: item.id,
                count: item.count,
                price: item.price
            };
        });
        const data = {
            items,
            userId
        };
        try {
            await axios.post('/api/basket', data);
            alert('Заказ успешно оформлен');
            setBasketItems([]);
        } catch (error) {
            alert(`Не удалось оформить заказ: ${error}`);
        }
    };

    return (
        <div className="basket-empty">
            {basketItems.length === 0 ? (
                <div className="basket-empty">
                    <p>Корзина пуста</p>
                    <p>Сложите в корзину нужные товары</p>
                    <p>А чтобы их найти, загляните в каталог товаров на главной странице <NavLink to={SHOP_ROUTE}>ShopAssistant</NavLink>.</p>
                </div>
            ) : (
                <div className="basket-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Название товара</th>
                            <th>Цена</th>
                            <th>Количество</th>
                            <th>Общая стоимость</th>
                        </tr>
                        </thead>
                        <tbody>
                        {basketItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.price} руб.</td>
                                <td>
                                    <button onClick={() => handleDecreaseCount(item.id)}>-</button>
                                    <span>{item.count}</span>
                                    <button onClick={() => handleIncreaseCount(item.id)}>+</button>
                                </td>
                                <td>{item.price * item.count} руб.</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="basket-total">
                        <p>Общее количество товаров: {itemCount}</p>
                        <p>Общая стоимость: {totalPrice} руб.</p>
                        <button onClick={handleCheckout}>Оформить заказ</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Basket;