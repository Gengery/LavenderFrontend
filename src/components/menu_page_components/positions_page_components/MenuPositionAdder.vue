<script lang="ts">
    import router from '@/router';
import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            currentChapterId: {
                type: Number,
                required: true
            }
        },

        setup(props) {
            const redirectToAdd = () => {
                router.replace(`/admin/menu/positions/${props.currentChapterId}/add`);
            };

            return {
                redirectToAdd
            };
        }
    });
</script>


<template>
    <div class="menu-short-container st-brd st-back" @click="redirectToAdd">
        +
    </div>
</template>


<style scoped>
    .menu-short-container {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 400px;
        width: 320px;
        overflow: hidden;
        margin: 20px;
        padding: 0;
        transition: 0.2s;
        font-size: 110px;
        
        &:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(transparent 70%, rgba(76, 73, 73, 0.638));
        }

        &:hover {
            transform: scale(1.05);
            background-color: rgb(153, 247, 150);
        }
    }
</style>