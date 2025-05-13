<script lang="ts">
import { MenuTagResponseModel } from '@/models/MenuTagModel';
import { MenuTagsService } from '@/services/MenuTagsService';
import { defineComponent, PropType, reactive, ref } from 'vue';
import TagShow from './TagShow.vue';

    export default defineComponent({
        components: {
            TagShow
        },

        emits: {
            'update:minWeight': (newValue: number) => true,
            'update:maxWeight': (newValue: number) => true,
            'update:tags': (newValue: number[]) => true,
            'statechanged': () => true
        },

        setup(props, { emit }) {
            const tagsService = MenuTagsService.getInstance();
            const tagsVariants = ref([] as MenuTagResponseModel[]);
            const minWeightModel = ref('0');
            const maxWeightModel=  ref('1000000');
            const selected = ref([] as boolean[]);

            tagsService.getAllTags().then(result => {
                tagsVariants.value = result;
                selected.value = new Array<boolean>(tagsVariants.value.length).fill(false);
            });

            const onChange = () => {
                emit('statechanged');
            };

            const onMinWeightInput = () => {
                emit('update:minWeight', parseInt(minWeightModel.value));
                onChange();
            };

            const onMaxWeightInput = () => {
                emit('update:maxWeight', parseInt(maxWeightModel.value));
                onChange();
            };

            const onTagsChange = () => {
                const res = [] as number[];
                for (let i = 0; i < selected.value.length; i++)
                    if (selected.value[i])
                        res.push(tagsVariants.value[i].id);
                emit('update:tags', res);
                onChange();
            };

            const reflect = (index: number) => {
                selected.value[index] = !selected.value[index];
                onTagsChange();
            };

            const checkState = (index: number):string => {
                if (selected.value[index])
                    return 'tag active';
                return 'tag disabled';
            };

            return {
                onMinWeightInput,
                onMaxWeightInput,
                onTagsChange,
                minWeightModel,
                maxWeightModel,
                tagsVariants,
                reflect,
                checkState
            }
        }
    });
</script>


<template>
    <div id="main" class="st-brd">
        <div class="row">
            <span>Минимальный вес:</span>
            <input v-model="minWeightModel" @input="onMinWeightInput" type="text" class="st-brd st-input st-field">
        </div>
        <div class="row">
            <span>Максимальный вес:</span>
            <input v-model="maxWeightModel" @input="onMaxWeightInput" type="text" class="st-brd st-input st-field">
        </div>
        <p>Выберите теги</p>
        <div id="tagsSelector">
            <tag-show v-for="(tag, index) in tagsVariants" 
            :key="tag.id" 
            :tagName="tag.name" 
            :class="checkState(index)"
            @click="() => reflect(index)"/>
        </div>
    </div>
</template>


<style scoped>
    #main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 20px;
    }

    #tagsSelector {
        width: 90%;
        padding: 10px;
        margin: 10px;
    }

    .row {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tag {
        transition: 0.2s;
    }

    .active {
        background-color: rgb(141, 247, 235);

        &:hover {
            background-color: rgb(247, 175, 141);
        }
    }

    .disabled {
        &:hover {
            background-color:rgb(162, 239, 160);
        }
    }
</style>