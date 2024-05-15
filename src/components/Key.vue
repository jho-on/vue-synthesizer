<template>
    <div class="key" :class="[{sharp: isSharp, pressed: isPressed}, offset]">
        <p >{{ note }}</p>
    </div>
</template>

<script>
import { ref, watchEffect} from 'vue'
import * as Tone from "tone";
    export default {
        props: ["note", "pressed", "letter"],
        setup(props){
            const note = ref(props.note);
            const letter = ref(props.letter);
            const pressed = ref(props.pressed);
            const offset = ref(false);

            const isPressed = ref(false);
            const isSharp = ref(false);

            const synth = new Tone.AMSynth().toDestination();
            synth.volume.value = -9;

            if(note.value.includes('#')){
                isSharp.value = true;
            }

            switch(note.value){
                case 'C#':
                    offset.value = 'C';
                    break;
                case 'D#':
                    offset.value = 'D';
                    break;
                case 'F#':
                    offset.value = 'F';
                    break;
                case 'G#':
                    offset.value = 'G';
                    break;
                case 'A#':
                    offset.value = 'A';
                    break;
            }

            watchEffect(() => {
                if(pressed.value.includes(letter.value)){
                    isPressed.value = true
                    synth.triggerAttack(note.value + '4', Tone.now());
                    
                }else{
                    isPressed.value = false
                    synth.triggerRelease();
                }
            })
            return {
                note, isSharp, offset, isPressed
            }
        }
    }
</script>

<style lang="scss" scopped> 
    @use 'sass:math';
    .key{
        width: 42px * 1.5;
        height: 42px * 4;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        border: 1px solid;

        
        
        &.sharp{
            background-color: black;
            color: white;
            height: 42px * 2.5;
            width: 35px * 1;
            position: absolute;

            &.C{
                left: 49px * .5; 
            }
            &.D{
                left: 45px * 1.5; 
            }
            &.F{
                left: 44px * 3.5; 
            }
            &.G{
                left: 44px * 4.5; 
            }
            &.A{
                left: 44px * 5.5; 
            }
        }
        
        &.pressed{
            background-color: black;
            color: white;
            &.sharp{
                background-color: white;
                border: 1px solid black;
                color: black;
            }
        }

        p{
            margin: 0;
        }
    }
</style>