<!-- Содержит набор кнопок в верхней части сайта -->

<script lang="ts">
    import { PropType } from 'vue';
    import LayoutButton from './LayoutButton.vue';

    export interface ButtonInfo {
        href?: string,
        name?: string,
        action?: () => void
    }

    export default {
        components: {
            LayoutButton
        },

        props: {
            buttonsList: {
                type: Array as PropType<ButtonInfo[]>,
                required: true 
            },
            enabledButtonHref: {
                type: String
            }
        }
    }
</script>


<template>
    <div id="layoutRow">
        <layout-button
            v-for="(button, index) in buttonsList"
            @click="button.action"
            :enabled="button.href == enabledButtonHref"
            :href="button.href"
            :key="index">{{ button.name }}</layout-button>
    </div>
    <hr/>
</template>


<style scoped>
    #layoutRow {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100vw;
        flex-wrap: nowrap;
        padding: 10px;
    }

    hr {
        width: 95%;
        margin: auto;
        margin-bottom: 10px;
    }
</style>