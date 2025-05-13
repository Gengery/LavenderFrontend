<script lang="ts">
    import { MenuTagsService } from '@/services/MenuTagsService';
    import UpdateIcon from '@/components/specialui/UpdateIcon.vue';
    import DeleteIcon from '@/components/specialui/DeleteIcon.vue';
    import { defineComponent, onMounted, ref } from 'vue';
    import AdaptiveInput from '@/components/specialui/AdaptiveInput.vue';
    import CancelIcon from '@/components/specialui/CancelIcon.vue';
    import SubmitIcon from '@/components/specialui/SubmitIcon.vue';

    export default defineComponent({
        components: {
            UpdateIcon,
            DeleteIcon,
            CancelIcon,
            SubmitIcon,
            AdaptiveInput
        },

        props: {
            name: {
                type: String,
                required: true
            },
            id: {
                type: Number,
                required: true
            }
        },

        emits: {
            'statechanged': () => true
        },

        setup(props, { emit }) {
            const tagsService = MenuTagsService.getInstance();

            const inputValue = ref<string>(props.name);
            const item = ref<HTMLElement|null>(null);
            const updater = ref<HTMLElement|null>(null);
            onMounted(() => {
                updater.value!.style.display = 'none';
            });

            const returnToItem = () => {
                item.value!.style.display = 'inline-flex';
                updater.value!.style.display = 'none';
            };

            const cancelUpdate = () => {
                returnToItem();
                inputValue.value = props.name;
            };

            const deleteThisTag = async () => {
                const permission = confirm("Тег будет удалён, вы уверены?");
                if (permission) {
                    await tagsService.deleteTag(props.id)
                        .then(answer => {
                            if (answer)
                                emit('statechanged');
                            else
                                alert("Тег не удалён");
                        })
                }
            };

            const updateThisTag = () => {
                item.value!.style.display = 'none';
                updater.value!.style.display = 'inline-flex';
            };

            const saveThisTag = () => {
                if (confirm("Сохранить изменения?"))
                    tagsService.updateTag(props.id, inputValue.value)
                        .then(answer => {
                            if (answer)
                                {
                                    emit('statechanged');
                                    returnToItem();
                                }
                            else
                                alert("Тег не изменён");
                        }).catch(() => alert("Error"));
            };
            
            return {
                inputValue,
                item,
                updater,
                deleteThisTag,
                updateThisTag,
                saveThisTag,
                cancelUpdate
            }
        }
    })
</script>


<template>
    <div ref="item" class="st-brd tag-item st-back">
        <span>{{ name }}</span>
        <update-icon class="tag-action" @click="updateThisTag"/>
        <delete-icon class="tag-action" @click="deleteThisTag"/>
    </div>
    <div ref="updater" class="st-brd tag-item st-back">
        <adaptive-input v-model:modelValue="inputValue"></adaptive-input>
        <cancel-icon class="tag-action" @click="cancelUpdate"/>
        <submit-icon class="tag-action" @click="saveThisTag"/>
    </div>
</template>


<style scoped>
    .tag-item {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding: 5px;
        margin: 5px;

        & > span {
            max-lines: 1;
            margin-left: 10px;
            margin-right: 10px;
        }
    }

    .tag-action {
        width: 45px;
        height: 45px;
        padding: 10px;
        cursor: pointer;
        transition: 500ms;
    }
</style>