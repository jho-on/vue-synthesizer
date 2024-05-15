<template>
    <div class="keyboard" >
        <Key v-for="key in keys" 
        :pressed='pressed' :letter="keyLetters[keys.indexOf(key)]" 
        :note='key' :key="key"/>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default{
    setup(){
        const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const keyLetters = ['q', '2','w', '3', 'e', 'r', '5', 't', '6', 'y', '7', 'u'];

        const pressed = ref([]);
        

        onMounted(() => {
            window.addEventListener("keydown", (e) => {
                if(!pressed.value.includes(e.key.toLowerCase()) && keyLetters.includes(e.key.toLowerCase())){
                    pressed.value.push(e.key.toLowerCase())
                }
            })
            window.addEventListener("keyup", (e) => {
                pressed.value.splice(pressed.value.indexOf(e.key.toLowerCase()), 1)
            })
        })

        
        return {keys, pressed, keyLetters}
    }
}
</script>

<style lang="scss" scopped> 
    .keyboard{
        background-color: white;
        width: 300px;
        display: flex;
        position: relative;
        margin: auto auto
    }
</style>