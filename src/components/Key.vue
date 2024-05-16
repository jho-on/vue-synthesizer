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
            
            synth.volume.value = -6;

            if(note.value.includes('#')){
                isSharp.value = true;
            }

            switch(note.value){
                case 'C#4':
                    offset.value = 'C';
                    break;
                case 'D#4':
                    offset.value = 'D';
                    break;
                case 'F#4':
                    offset.value = 'F';
                    break;
                case 'G#4':
                    offset.value = 'G';
                    break;
                case 'A#4':
                    offset.value = 'A';
                    break;

                case 'C#5':
                    offset.value = 'C2';
                    break;
                case 'D#5':
                    offset.value = 'D2';
                    break;
                case 'F#5':
                    offset.value = 'F2';
                    break;
                case 'G#5':
                    offset.value = 'G2';
                    break;
                case 'A#5':
                    offset.value = 'A2';
                    break;
            }

            watchEffect(() => {
                if(pressed.value.includes(letter.value)){
                    isPressed.value = true;
                    try{
                        synth.triggerAttack(note.value);
                    }catch(err){
                    }
                    
                }else{
                    if(isPressed.value){
                        isPressed.value = false;
                        synth.triggerRelease();
                    }
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
        width: 40px * 1.5;
        height: 80px * 4;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        border: 1px solid;
        font-size: 20px;
        transition-property: height, background-color;
        transition-duration: .15s;

        
            
        
        &.sharp{
            background-color: black;
            z-index: 2;
            color: white;
            height: 80px * 2.5;
            width: 40px * 1;
            position: absolute;

            &.C{
                left: 40px; 
            }
            &.D{
                left: 40px * 2.5; 
            }
            &.F{
                left: 40px * 5.5; 
            }
            &.G{
                left: 40px * 7; 
            }
            &.A{
                left: 40px * 8.5; 
            }

            &.C2{
                left: 40px * 11.5; 
            }
            &.D2{
                left: 40px * 13; 
            }
            &.F2{
                left: 40px * 16; 
            }
            &.G2{
                left: 40px * 17.5; 
            }
            &.A2{
                left: 40px * 19; 
            }
        }
        
        &.pressed{
            background-color: black;
            color: white;
            height: 80px * 4 + 10px;
            transform: scaleX(.9);
            

            &.sharp{
                height: 80px * 2.5 + 5px;
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