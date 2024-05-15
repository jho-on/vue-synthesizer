<template >
    <Keyboard v-if="canPlay" />
    <button v-if="!canPlay" @click="handleOn">Start</button>
</template>

<script >
import { ref } from 'vue'
import * as Tone from 'tone'
    export default{
        setup(){
            const canPlay = ref(false)

            async function handleOn(){
                await Tone.start()
                canPlay.value = true
            }
            return{handleOn, canPlay}
        }
    }
</script>

<style>

</style>