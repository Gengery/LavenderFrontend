<script lang="ts">
    import LayoutRow, { ButtonInfo } from '@/components/layouts/LayoutRow.vue'

    export default {
        components: {
            LayoutRow
        },

        setup() {
            const buttonsList: ButtonInfo[] = [
                {
                    name: 'Позиции',
                    href: '/admin/menu/positions'
                },
                {
                    name: 'Теги',
                    href: '/admin/menu/tags'
                }
            ]

            return {
                buttonsList
            }
        }
    }
</script>

<template>
    <layout-row :buttonsList="buttonsList"></layout-row>
    <router-view></router-view>
</template>