<script lang="ts">

    export default {
    }
</script>

<template>
    
    <div class="centerer maxer">
        <div id="homeMain" class="st-brd centerer">
            <span class="namer">Lavender Restaurant</span>
        </div>
    </div>
    
</template>

<style scoped>
    #homeMain {
        position: absolute;
        top: 20px;
        width: 90%;
        height: 80%;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url('../../assets/images/back.png');
    }

    .centerer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .maxer {
        position: relative;
        height: 100vh;
        width: 100vw;
    }

    .namer {
        font-size: 96px;
        color: white;
    }
</style>