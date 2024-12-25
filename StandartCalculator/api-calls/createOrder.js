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

// export const createOrderByAPI = async () => {
//     const myHeaders = new Headers();
//     myHeaders.append("Accept", "application/json");
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", `Bearer ${userInfo.bearerTokenRelease1}`);

//     const raw = JSON.stringify({
//         "name": createOrderInfo.partnerFullName,
//         "phone": createOrderInfo.phone
//     });

//     const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow"
//     };

//     try {
//         const response = await fetch(`${settings.envURL}api/v3/request-orders`, requestOptions);
//         const result = await response.json();

//         if (response.ok) {
//             return result.link
//         } else {
//             console.error("Ошибка при создании заказа:", result);
//         }
//     } catch (error) {
//         console.error("Ошибка:", error);
//     }
// }
