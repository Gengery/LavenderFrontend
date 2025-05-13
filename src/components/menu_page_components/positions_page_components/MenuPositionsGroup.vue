<script lang="ts">
import { MenuPositionResponseModel } from '@/responses/MenuPositionResponseModel';
import { MenuPositionsService } from '@/services/MenuPositionsService';
import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
import MenuPositionShort from './MenuPositionShort.vue';
import router from '@/router';
import MenuPositionAdder from './MenuPositionAdder.vue';
import { UserService } from '@/services/UserService';
import MenuFilter from './MenuFilter.vue';
import { MenuFilterModel } from '@/models/MenuFilterModel';
import DeleteIcon from '@/components/specialui/DeleteIcon.vue';

    export default defineComponent({
        components: {
            MenuPositionShort,
            MenuPositionAdder,
            MenuFilter,
            DeleteIcon
        },

        props: {
            id: {
                type: Number,
                required: true
            }
        },

        setup(props) {
            const positionsService = MenuPositionsService.getInstance();
            const usersService = UserService.getInstance();
            const loadedPositions = reactive([] as MenuPositionResponseModel[]);
            const loadPositions = async () => {
                loadedPositions.splice(0, loadedPositions.length, ...await positionsService.getAllPositionsForChapter(props.id));
            }

            const redirectToPosition = (id: number) => {
                router.push(`position/${id}`);
            };

            const isAdmin = ref(false);
            const checkAdmin = async () => {
                isAdmin.value = await usersService.adminCheck();
            };
            checkAdmin();
            watch(() => props.id, (newId) => reloadFilters());

            
            const minWeight = ref(0);
            const maxWeight = ref(10000);
            const tags = ref([] as number[]);

            const deletePosition = async (id: number) => {
                await positionsService.deleteMenuPosition(id);
                location.reload();
            };

            const reloadFilters = async () => {
                const filter:MenuFilterModel = {
                    minWeight: minWeight.value,
                    maxWeight: maxWeight.value,
                    menuChapterId: props.id,
                    tags: tags.value
                };
                loadedPositions.splice(0, loadedPositions.length, ...await positionsService.getPositionsWithParams(filter));
            };
            reloadFilters();

            return {
                loadedPositions,
                loadPositions,
                redirectToPosition,
                isAdmin,
                // --- //
                minWeight,
                maxWeight,
                tags,
                reloadFilters,
                deletePosition
            }
        }
    })
</script>


<template>
    <menu-filter v-model:min-weight="minWeight"
     v-model:max-weight="maxWeight"
     v-model:tags="tags"
     @statechanged="reloadFilters"/>
    <div id="menuMain">
        <menu-position-short v-for="pos in loadedPositions"
         :model="pos" 
         :key="pos.id" 
         @click="() => redirectToPosition(pos.id!)">
            <delete-icon v-if="isAdmin"
             class="deleter"
             :key="pos.id"
             @click.stop="() => deletePosition(pos.id as number)"/>
        </menu-position-short>
        <menu-position-adder v-if="isAdmin" :currentChapterId="id"/>
    </div>
</template>


<style scoped>
    #menuMain {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .deleter {
        width: 48px;
        height: 48px;
        position: absolute;
        background-color: white;
        bottom: 5px;
        right: 5px;
        z-index: 5;
    }
</style>