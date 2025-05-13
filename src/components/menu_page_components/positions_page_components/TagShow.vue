<script lang="ts">
import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            tagName: {
                type: String,
                required: true
            }
        }
    })
</script>


<template>
    <div class="st-brd tag-item st-button">
        <span>{{ tagName }}</span>
    </div>
</template>


<style scoped>
    .tag-item {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        padding: 4px;
        margin: 2px;

        & > span {
            font-size: 18px;
            user-select: none;
        }
    }
</style>