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
        const keys = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
            'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5'
        ];
        const keyLetters = [
            'z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm',
            'q', '2','w', '3', 'e', 'r', '5', 't', '6', 'y', '7', 'u'
            ];

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
        width: fit-content;
        display: flex;
        position: relative;
        margin: auto auto
    }
</style>