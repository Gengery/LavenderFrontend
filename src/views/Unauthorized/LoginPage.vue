<script lang="ts">
import router from '@/router';
import { UserService } from '@/services/UserService';
import { ref } from 'vue';

    export default {

        setup() {
            //data
            const loginString = ref("");
            const password = ref("");
            const userService = UserService.getInstance();

            //methods
            const login = () => {
                userService.login(loginString.value, password.value)
                    .then(answer => {
                        if (!answer)
                            alert("Неудачная попытка авторизации");
                        else {
                            userService.adminCheck()
                                .then(answer1 => {
                                    if (answer1) {
                                        router.replace('admin/menu');
                                    }
                                    else {
                                        router.replace('customer/menu');
                                    }
                                })
                        }
                    });
            }

            return {
                loginString,
                password,

                login
            };
        }
    }
</script>


<template>
    <div>

        <div id="loginBox">
            <input class="st-field st-brd st-input" type="text" placeholder="Логин" v-model="loginString">
            <input class="st-field st-brd st-input" type="password" placeholder="Пароль" v-model="password">

            <button class="st-field st-brd st-button" @click="login">Войти</button>
        </div>
    </div>
</template>


<style>
    #loginBox {
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