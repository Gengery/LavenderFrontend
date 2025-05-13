<script>
    import router from '@/router';
    import { UserService } from '@/services/UserService';
    import { ref } from 'vue';

    export default {

        setup() {
            const login = ref("");
            const password = ref("");
            const username = ref("");
            const userService = UserService.getInstance();
            const statusString = ref("");

            const register = () => {
                userService.register(username.value, login.value, password.value)
                .then(answer => {
                    if (!answer)
                        alert("Ошибка при регистрации, возможно логин занят");
                    else
                        router.replace('/login');
                });
            }

            return {
                login,
                password,
                username,
                register,
                userService,
                statusString
            }
        }
    }
</script>


<template>
    <div id="regPageMain">
        <div id="regPageBox">
            
            <div id="regColumner">
                <p>{{ statusString }}</p>
                <input class="st-field st-brd st-input" v-model="username" placeholder="Имя пользователя"/>
                <input class="st-field st-brd st-input" v-model="login" placeholder="Логин"/>
                <input class="st-field st-brd st-input" v-model="password" placeholder="Пароль" type="password"/>

                <button class="st-field st-brd st-button" @click="register">Зарегистрироваться</button>
            </div>
            
        </div>
    </div>
</template>


<style scoped>
    #regPageBox {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
    }

    #regColumner {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        margin: 20px;

        & > input, button {
            width: 400px;
        }
    }
</style>