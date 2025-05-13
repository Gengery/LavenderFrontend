
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
            userService.adminCheck().then(answer => {
                if (!answer)
                    router.replace("/login");
            })

            const buttonsList: ButtonInfo[] = [{
                href: "/admin/menu",
                name: "Настроить меню"
            },{
                href: "/admin/reservations",
                name: "Бронирования"
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