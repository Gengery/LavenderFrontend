<script lang="ts">
    import { UserService } from '@/services/UserService';
    import { ButtonInfo } from './LayoutRow.vue';
    import LayoutRow from './LayoutRow.vue';
    import router from '@/router';

    export default {
        components: {
            LayoutRow
        },

        props: {
            enabledButtonHref: {
                type: String
            }
        },

        setup() {
            const userService = UserService.getInstance();
            userService.customerCheck().then(answer => {
                if (!answer)
                    router.replace("/login");
            })

            const buttonsList: ButtonInfo[] = [{
                href: "/customer/menu",
                name: "Меню"
            },{
                href: "/customer/reservation",
                name: "Забронировать"
            },{
                href: "/customer/my-reservations",
                name: "Мои записи"
            },{
                href: "#",
                name: "Выйти",
                action: () => {
                    const userService = UserService.getInstance();
                    userService.logout().then(() => {
                        router.replace('/');
                    });
                }
            },];

            return {
                buttonsList
            };
        }
    }
</script>


<template>
    <layout-row :buttonsList="buttonsList" :enabledButtonHref="enabledButtonHref"/>
    <router-view></router-view>
</template>


<style>

</style>