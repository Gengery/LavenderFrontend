<script lang="ts">
    import { defineComponent } from 'vue';
    import LeftIcon from '@/components/specialui/LeftIcon.vue';
    import RightIcon from '@/components/specialui/RightIcon.vue';

    export default defineComponent({
        components: {
            LeftIcon,
            RightIcon
        },

        props: {
            name: String
        },

        emits: {
            'leftoption': () => true,
            'rightoption': () => true
        }
    });
</script>


<template>
    <div id="selectorMain">
        <left-icon @click="$emit('leftoption')" class="icon"/>
        <span class="centered">{{ name }}</span>
        <right-icon @click="$emit('rightoption')" class="icon"/>
    </div>
    <hr class="hred">
</template>


<style scoped>
    #selectorMain {
        width: 100vw;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .icon {
        width: 80px;
    }

    .hred {
        width: 70%;
    }

    .centered {
        text-align: center;
        width: 75%;
    }
</style>