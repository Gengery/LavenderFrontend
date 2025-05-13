<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue';

    export default defineComponent({
        props: {
            modelValue: {
                type: String,
                required: true
            }
        },

        emits: {
            'update:modelValue': (newValue: string) => true
        },

        setup(props, { emit }) {
            const input = ref<HTMLElement|null>(null);

            const calcWidth = () => {
                if (!input.value)
                    return;
                const newWid = Math.max(input.value!.scrollWidth, 100);
                input.value!.style.width = newWid.toString() + 'px';
            };

            onMounted(() => {
                const displayOption = input.value!.style.display;
                input.value!.style.display = "none";
                calcWidth();
                input.value!.style.display = displayOption;
            })
            
            const onInput = (event: Event) => {
                const target = event.target as HTMLInputElement;
                emit('update:modelValue', target.value);
                calcWidth();
            }

            return {
                input,
                onInput
            }
        }
    });
</script>


<template>
    <input ref="input"
        class="st-field st-brd st-input"
        @input="onInput"
        :value="modelValue"
        type="text">
</template>