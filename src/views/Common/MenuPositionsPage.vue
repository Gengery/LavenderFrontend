<script lang="ts">
    import AdaptiveInput from '@/components/specialui/AdaptiveInput.vue';
    import ElementsSelector from '@/components/menu_page_components/positions_page_components/ElementsSelector.vue';
    import MenuPositionsGroup from '@/components/menu_page_components/positions_page_components/MenuPositionsGroup.vue';
    import { ChapterModel } from '@/models/ChapterModel';
    import { MenuChaptersService } from '@/services/MenuChapterService';
    import { UserService } from '@/services/UserService';
    import { reactive, ref } from 'vue';

    export default {
        components: {
            ElementsSelector,
            MenuPositionsGroup,
            AdaptiveInput
        },

        setup() {
//#region Common
            const chaptersService = MenuChaptersService.getInstance();
            const usersService = UserService.getInstance();
            const isAdmin = ref(false);
            const chapters = reactive([] as ChapterModel[])
            const currentNumber = ref(0);
            const currentId = ref(0);
            const currentName = ref("");

            const getChapters = async () => {
                chapters.splice(0, chapters.length, ...await chaptersService.getAllChapters());
            };

            const nextChapter = () => {
                currentNumber.value++;
                if (currentNumber.value >= chapters.length)
                    currentNumber.value = 0;
                currentId.value = chapters[currentNumber.value].id!;
                currentName.value = chapters[currentNumber.value].name!;
            }

            const prevChapter = () => {
                currentNumber.value--;
                if (currentNumber.value < 0)
                    currentNumber.value = chapters.length - 1;
                currentId.value = chapters[currentNumber.value].id!;
                currentName.value = chapters[currentNumber.value].name!;
            }

            const adminCheck = async () => {
                isAdmin.value = await usersService.adminCheck();
            }
            adminCheck();

            getChapters().then(() => {
                currentId.value = chapters[0].id!;
                currentName.value = chapters[0].name!;
            });
//#endregion

//#region OnlyAdmin
            const newChapter = ref('');

            const addChapter = async () => {
                if (await chaptersService.addChapter(newChapter.value))
                    location.reload();
                else
                    alert('Не удалось добавить раздел');
            };

            const removeChapter = async () => {
                if (confirm('При удалении раздела, будут удалены все привязанные позиции меню. Вы уверены?')) {
                    if (await chaptersService.deleteChapter(currentId.value))
                        location.reload();
                    else
                        alert('Раздел удалить не удалось');
                }
            }
//#endregion

            return {
                chapters,
                currentId,
                currentName,
                isAdmin,
                prevChapter,
                nextChapter,
                // --- //
                newChapter,
                addChapter,
                removeChapter,
                // --- //
            }
        }
    }

</script>


<template>
    <div id="menuPageMain">
        <elements-selector :name="currentName" @leftoption="prevChapter" @rightoption="nextChapter"></elements-selector>
        <div class="actions st-brd st-back" v-if="isAdmin">
            <span>Действия с разделом: </span>
            <adaptive-input v-model:model-value="newChapter" class="st-field st-input st-brd"/>
            <button @click="addChapter" class="st-field st-button st-input st-brd">Добавить</button>
            <button @click="removeChapter" class="st-field st-button st-input st-brd">Удалить</button>
        </div>
        <menu-positions-group :id="currentId"></menu-positions-group>
    </div>
</template>


<style>
    #menuPageMain {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .actions {
        display: flex;
        margin: 20px;
        padding: 10px;
        align-items: center;

        &>span {
            white-space: nowrap;
        }
    }
</style>