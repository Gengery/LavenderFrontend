<!-- Содержит набор кнопок в верхней части сайта -->

<script>

    export default {
        props: {
            href: {
                type: String
            },
            enabled: {
                type: Boolean
            }
        }
    }
</script>


<template>
    <router-link :class="`st-button layout-element ${enabled? 'enabled' : 'disabled'}`" :to="href">
        <slot>

        </slot>
    </router-link>
</template>


<style scoped>
    .layout-element {
        padding: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 2px;
        margin-right: 2px;
        border: 1px solid rgb(212, 212, 212);
        border-radius: 15px;
    }

    .disabled {
        &:hover {
            transform: translate(0px, 2px);
        }
    }
</style>