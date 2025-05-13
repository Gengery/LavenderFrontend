<script lang="ts">
    import TagAdder from '@/components/menu_page_components/tags_page_components/TagAdder.vue';
    import TagItem from '@/components/menu_page_components/tags_page_components/TagItem.vue';
    import { MenuTagResponseModel } from '@/models/MenuTagModel';
    import { MenuTagsService } from '@/services/MenuTagsService';
    import { ref } from 'vue';


    export default {
        components: {
            TagAdder,
            TagItem
        },

        setup() {
            const tags = ref([] as MenuTagResponseModel[]);
            const tagsService = MenuTagsService.getInstance();
            const loadTags = async () => {
                await tagsService.getAllTags()
                    .then(answer => {
                        tags.value = answer;
                    }).catch(() => alert("Не удалось получить список тегов"));
            };

            loadTags();

            return {
                tags,
                loadTags
            };
        }
    }

</script>


<template>
    <div id="menuPageMain">
        <tag-adder @statechanged="loadTags" />
        <div id="tagsBox">
            <tag-item v-for="(tag) in tags" :key="tag.id" :id="tag.id" :name="`${tag.name}`" @statechanged="loadTags" />
        </div>
    </div>
</template>


<style scoped>
    #menuPageMain {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #tagsBox {
        width: 90%;
    }

    .tag-action {
        width: 50px;
        height: 50px;
    }
</style>