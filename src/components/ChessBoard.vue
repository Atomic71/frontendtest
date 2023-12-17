<script setup lang="ts">
import type { Perspective } from '@/types';
import { useBoardRenderOrder } from '@/hooks';
import { toRef } from 'vue';

const props = defineProps<{
  perspective: Perspective;
}>();

const perspective = toRef(props, 'perspective');

const { finalOrder } = useBoardRenderOrder(perspective);
</script>

<template>
  <div
    class="grid h-full grid-cols-8 border-2 border-black grid-flow-row-dense max-h-[60vh]"
  >
    <div
      v-for="square in finalOrder"
      :key="Object.values(square).join('')"
      :class="['aspect-square relative']"
    >
      <slot
        name="square"
        v-bind="{
          square,
        }"
      />
    </div>
  </div>
</template>
