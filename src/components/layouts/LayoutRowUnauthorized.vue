<script lang="ts">
    import LayoutRow, { ButtonInfo } from './LayoutRow.vue';

    export default {
        components: {
            LayoutRow
        },

        setup() {
            const buttonsList: ButtonInfo[] = [
                { href: "/", name: "Главная" },
                { href: "/menu", name: "Изучить меню" },
                { href: "/login", name: "Войти" },
                { href: "/register", name: "Зарегистрироваться" }
                ];

            return {
                buttonsList
            }
        }
    }
</script>


<template>
    <div id="layoutRow">
        <layout-row :buttons-list="buttonsList"></layout-row>
        <router-view></router-view>
    </div>
</template>