<script lang="ts">
    import AdaptiveInput from '@/components/specialui/AdaptiveInput.vue';
    import TagShow from '@/components/menu_page_components/positions_page_components/TagShow.vue';
    import { MenuTagResponseModel } from '@/models/MenuTagModel';
    import { MenuPositionRequestModel } from '@/requests/MenuPositionRequestModel';
    import router from '@/router';
    import { ImageService } from '@/services/ImagesService';
    import { MenuPositionsService } from '@/services/MenuPositionsService';
    import { MenuTagsService } from '@/services/MenuTagsService';
    import { computed, defineComponent, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import defaultImage from '@/assets/images/default.png';

    export default defineComponent({
        components: {
            AdaptiveInput,
            TagShow
        },

        setup(props) {
            const route = useRoute();
            const chapterId = computed(() => {
                return Number(route.params.chapterId);
            });
            const positionsService = MenuPositionsService.getInstance();
            const tagsService = MenuTagsService.getInstance();
            const imageService = ImageService.getInstance();
            const imgInput = ref<HTMLInputElement|null>(null);
            const imgSrc = ref(defaultImage);
            let img:File|null = null;

//#region requests
            const selectableTags = ref([] as MenuTagResponseModel[]);
            const selectedTags = ref([] as boolean[]);
            const name = ref("");
            const imageName = ref("default.png");
            const price = ref("");
            const weight = ref("");
            const proteins = ref("");
            const fats = ref("");
            const carbohydrates = ref("");
            const composition = ref([""]);
//#endregion
            
//#region methods
            const readTags = ():number[] => {
                const tags: number[] = [];
                for (let i = 0; i < selectedTags.value.length; i++)
                    if (selectedTags.value[i])
                        tags.push(selectableTags.value[i].id)
                return tags;
            }

            const sendAddingRequest = async () => {
                let resOk = true;
                if (img)
                    resOk = await imageService.sendImage(img);
                else
                    imageName.value = 'default.png';
                if (resOk) {
                    const newPosition: MenuPositionRequestModel = {
                        name: name.value,
                        imageName: imageName.value,
                        menuChapterId: chapterId.value,
                        price: parseInt(price.value),
                        weight: parseInt(weight.value),
                        proteins: parseInt(proteins.value),
                        fats: parseInt(fats.value),
                        carbohydrates: parseInt(carbohydrates.value),
                        composition: composition.value,
                        tags: readTags()
                    }
                    const result = await positionsService.addMenuPosition(newPosition);
                    if (!result)
                        alert("Запись не добавлена");
                    else
                        router.replace('/admin/menu/positions');
                }
                else
                    alert("Данные не загружены, проблема с изображением");
            };

            const loadTags = async () => {
                selectableTags.value = await tagsService.getAllTags();
                selectedTags.value.splice(0, selectedTags.value.length, ...new Array(selectableTags.value.length).fill(false));
            };
            loadTags();

            const reflectTag = (event: Event, id: number) => {
                console.log(selectedTags);
                selectedTags.value[id] = !selectedTags.value[id];
            };

            const addDescription = () => {
                composition.value.push("");
            };

            const checkTagState = (i: number):string => {
                if (selectedTags.value[i])
                    return 'active-tag tag';
                return 'unactive-tag tag';
            };

            const handleUpload = (event: Event) => {
                const target = event.target as HTMLInputElement;
                const imgLoaded = target.files?.[0];
                if (imgLoaded) {
                    imgSrc.value = URL.createObjectURL(imgLoaded);
                    img = imgLoaded;
                    imageName.value = img.name;
                }
                else {
                    alert("Изображение не загружено");
                }
            };

            const triggerFileInput = () => {
                imgInput.value?.click();
            };
//#endregion

            return {
                name,
                imageName,
                price,
                weight,
                proteins,
                fats,
                carbohydrates,
                composition,
                selectableTags,
                selectedTags,
                imgSrc,
                imgInput,
                //---//
                sendAddingRequest,
                reflectTag,
                addDescription,
                checkTagState,
                handleUpload,
                triggerFileInput
            }
        }
    });
</script>


<template>
    <div id="main">
        <form @submit.prevent="sendAddingRequest" id="rows" class="st-brd">
            <img class="menu-img st-brd" @click="triggerFileInput" :src="imgSrc">
            <input type="file" ref="imgInput" accept="img/png" style="display: none" @change="handleUpload">
            <div class="row">
                <span>Название: </span>
                <adaptive-input v-model:model-value="name" />
            </div>
            <div class="row">
                <span>Цена: </span>
                <adaptive-input v-model:model-value="price" />
                <span> руб.</span>
            </div>
            <div class="row">
                <span>Вес: </span>
                <adaptive-input v-model:model-value="weight" />
                <span> г.</span>
            </div>
            <div class="row">
                <span>Белки: </span>
                <adaptive-input v-model:model-value="proteins" />
                <span> г.</span>
            </div>
            <div class="row">
                <span>Жиры: </span>
                <adaptive-input v-model:model-value="fats" />
                <span> г.</span>
            </div>
            <div class="row">
                <span>Углеводы: </span>
                <adaptive-input v-model:model-value="carbohydrates" />
                <span> г.</span>
            </div>
            <span>Описание: </span>
            <div class="row" v-for="(str, index) in composition" :key="index">
                <adaptive-input v-model:model-value="composition[index]" />
            </div>
            <button class="st-button st-input st-field st-brd" type="button" @click="addDescription">Добавить описание</button>

            <div class="tags">
                <p class="tags-text">Добавить теги:</p>
                <div>
                    <tag-show v-for="(tag, index) in selectableTags"
                    :key="tag.id" :tagName="tag.name" 
                    @click="(event) => reflectTag(event, index)"
                    :class="checkTagState(index)"></tag-show>
                </div>
            </div>

            <input type="submit" class="st-brd st-field st-input">
        </form>
    </div>
</template>


<style scoped>
    #rows {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 60%;
        margin: auto;
    }

    .menu-img {
        width: 100%;
        aspect-ratio: 2/1;
        position: relative;
        transition: 0.2s;
        cursor: pointer;

        &:hover {
            background-color: rgb(150, 182, 182);
        }
    }

    .tags {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
    }

    .active-tag {
        background-color: rgb(236, 160, 61);

        &:hover {
            background-color: rgb(200, 84, 84);
        }
    }

    .unactive-tag {
        &:hover {
            background-color: rgb(162, 210, 162);
        }
    }

    .tag {
        cursor: pointer;
        transition: 0.2s;
    }

    .tags-text {
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;
    }
</style>