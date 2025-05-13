<script lang="ts">
    import { MenuTagsService } from '@/services/MenuTagsService';
    import { defineComponent, ref } from 'vue';
    import AdaptiveInput from '@/components/specialui/AdaptiveInput.vue';

    export default defineComponent({
        components: {
            AdaptiveInput
        },

        emits: {
            'statechanged': () => true
        },

        setup(props, { emit }) {
            const tagName = ref("");
            const addTag = () => {
                const tagsService = MenuTagsService.getInstance();
                tagsService.addTag(tagName.value)
                    .then(answer => {
                        if (answer) {
                            emit('statechanged');
                            tagName.value = "";
                        }
                    }).catch(() => alert("Exception"));
            };
            
            return {
                tagName,
                addTag
            }
        }
    })
</script>


<template>
    <div id="tagAdderMain" class="st-brd">
        <span>Имя тега:</span>
        <adaptive-input v-model="tagName" type="text"/>
        <button @click="addTag" class="st-field st-brd st-input tag-input">Добавить</button>
    </div>
    <hr style="color: black; width: 90%; margin-top: 10px; margin-bottom: 10px">
</template>


<style scoped>
    #tagAdderMain {
        display: inline-flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;

        & > span {
            white-space: nowrap;
        }
    }
    
    .tag-input {
        min-width: fit-content;
    }
</style>