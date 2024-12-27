import { secretInfo } from "./secretInfo";

export const usersInfo = {
    firstUser: {},
    secondUser: {},
    async getUserInfoByAPI() {
        try {
            const response = await fetch('https://mdm.helloprint.ru/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${secretInfo.firstUser.bearerTokenRelease1}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // Обновление объекта usersInfo.firstUser значениями из ответа
            this.firstUser.id = data.id;
            this.firstUser.login = data.name;
            this.firstUser.password = secretInfo.firstUser.password;
            this.firstUser.lastname = data.profile.last_name;
            this.firstUser.name = data.profile.first_name;
            this.firstUser.middlename = data.profile.middle_name;
            this.firstUser.fullName = data.full_name;
            this.firstUser.abbreviatedFullName = data.abbreviated_name;
            this.firstUser.internalNumber = data.profile.internal_number;
            this.firstUser.personalEmail = data.email;
            this.firstUser.publicEmail = data.profile.work_email;

            console.log(this.firstUser)

        } catch (error) {
            console.error('Ошибка при запросе инофрмации о пользователе:', error);
        }
    }
}