<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ChessFile, ChessRank, Perspective } from '@/types';
import { isSquareDark } from '@/utils';
const props = defineProps<{
  perspective: Perspective;
}>();

const ranks = ref<ChessRank[]>(['1', '2', '3', '4', '5', '6', '7', '8']);
const files = ref<ChessFile[]>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);

const fileRenderOrder = computed(() => {
  return props.perspective === 'white'
    ? files.value
    : files.value.slice().reverse();
});

const rankRenderOrder = computed(() => {
  return props.perspective === 'black'
    ? ranks.value
    : ranks.value.slice().reverse();
});
</script>

<template>
  <div class="border-black flex">
    <div class="p-5 bg-orange-800">
      <div class="flex border-2 border-black">
        <div
          v-for="(file, fileIndex) in fileRenderOrder"
          :key="file"
        >
          <div
            v-for="(rank, rankIndex) in rankRenderOrder"
            :key="rank"
            class="w-[10vw] h-[10vw] max-h-[10vh] max-w-[10vh] relative"
            :class="[
              isSquareDark(file, rank) ? 'bg-gray-200' : 'bg-green-900',
              'flex justify-center items-center text-2xl',
            ]"
          >
            <span
              class="absolute leading-none top-0.5 left-0.5 text-xs"
              :class="[
                isSquareDark(file, rank) ? 'text-green-900' : 'text-gray-200',
              ]"
              v-if="fileIndex === 0"
              >{{ rank }}</span
            >
            <span
              class="absolute leading-none bottom-0.5 right-0.5 text-xs"
              :class="[
                isSquareDark(file, rank) ? 'text-green-900' : 'text-gray-200',
              ]"
              v-if="rankIndex === rankRenderOrder.length - 1"
              >{{ file }}</span
            >
            <slot
              name="square"
              v-bind="{ file, rank }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
