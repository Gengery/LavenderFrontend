
<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        emits: {
            'mapclick': (id: number) => true
        },
        
        setup(props, { emit }) {
            let taps = [];
            for (let i = 1; i <= 17; i++)
                taps.push(() => {
                    emit("mapclick", i);
                })

            return {
                taps
            }
        }
    });

</script>


<template>
    <div id="bookerMain">
        
        <div id="mapper" class="st-brd">
            <div v-for="i in 17" @click="taps[i - 1]" :key="i" :id="`map${i}`" class="map"><span>{{ i }}</span></div>
        </div>

    </div>
</template>


<style scoped>
    #bookerMain {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: 2s;
    }

    #mapper {
        width: 100%;
        aspect-ratio: 824 / 1074;
        background-image: url("../../assets/images/plan.jpg");
        background-size: contain;
        position: relative;
    }

    .map {
        background-color: rgb(220, 220, 220);
        position: absolute;
        transition: 300ms;
        border-radius: 3px;
        border: 1px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
        &>span {
            user-select: none;
        }

        &:hover {
            background-color: rgb(217, 126, 221);
        }
    }

    #map1 {
        left: 16%;
        right: 78%;
        top: 15%;
        bottom: 77%;
    }

    #map2 {
        left: 53%;
        right: 41%;
        top: 14%;
        bottom: 81.4%;
    }

    #map3 {
        left: 40.8%;
        right: 53.2%;
        top: 21.6%;
        bottom: 73.8%;
    }

    #map4 {
        left: 47.4%;
        right: 46.7%;
        top: 29.9%;
        bottom: 65.5%;
    }

    #map5 {
        left: 40.8%;
        right: 53.2%;
        top: 38%;
        bottom: 57.45%;
    }

    #map6 {
        left: 16.1%;
        right: 78%;
        top: 42.2%;
        bottom: 50%;
    }

    #map7 {
        left: 53.45%;
        right: 40.6%;
        top: 46.64%;
        bottom: 48.8%;
    }

    #map8 {
        left: 16.1%;
        right: 78.0%;
        top: 55.4%;
        bottom: 36.7%;
    }

    #map9 {
        left: 38.55%;
        right: 55.5%;
        top: 59.5%;
        bottom: 36%;
    }

    #map10 {
        left: 51.3%;
        right: 38.38%;
        top: 58.5%;
        bottom: 37%;
    }

    #map11 {
        left: 71.3%;
        right: 22.85%;
        top: 64.7%;
        bottom: 30.8%;
        transform: translate(26%, -18%) rotate(0.108turn);

        & > * {
            transform: rotate(-0.108turn);
        }
    }

    #map12 {
        transform: translate(-140%, -140%) rotate(0.108turn);
        left: 71.3%;
        right: 22.85%;
        top: 79.7%;
        bottom: 15.8%;

        & > * {
            transform: rotate(-0.108turn);
        }
    }

    #map13 {
        transform: translate(-300%, 60%) rotate(0.108turn);
        left: 71.3%;
        right: 22.85%;
        top: 79.7%;
        bottom: 15.8%;

        & > * {
            transform: rotate(-0.108turn);
        }
    }

    #map14 {
        left: 29%;
        right: 65.0%;
        top: 65.5%;
        bottom: 30%;
    }

    #map15 {
        left: 16.1%;
        right: 78.0%;
        top: 71.6%;
        bottom: 20.5%;
    }

    #map16 {
        left: 38.7%;
        right: 55.35%;
        top: 70.6%;
        bottom: 24.9%;
    }

    #map17 {
        left: 31.3%;
        right: 58.38%;
        top: 84.1%;
        bottom: 11.4%;
    }

</style>