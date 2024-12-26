import * as nodeFetch from 'node-fetch';
import { settings } from '../data/settings';
import { userInfo } from "../data/userInfo";
import { createOrderInfo } from "../data/createOrderInfo";

export const createOrderByAPI = async () => {
    try {
        const response = await nodeFetch(`${settings.envURL}/api/v3/request-orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.bearerTokenRelease1}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "name": createOrderInfo.name,
                "surname": createOrderInfo.surname,
                "patronymic": createOrderInfo.patronymic,
                "phone": createOrderInfo.phone,
                "client_type_id": 3
            })
        });

        if (!response.ok) {
            const errorBody = await response.text(); // Получаем текст ошибки для логирования
            console.error(`Ошибка при запросе: ${response.status} ${errorBody}`);
            throw new Error(`Ошибка: ${response.status} - ${errorBody}`);
        }

        const body = await response.json();
        return body.link;
    } catch (error) {
        console.error('Ошибка при создании заказа:', error);
        throw error;
    }
}