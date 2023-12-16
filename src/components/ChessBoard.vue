<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ChessFile, ChessRank, Perspective } from '@/types';
const props = defineProps<{
  perspective: Perspective;
}>();

const files = ref<ChessFile[]>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
const ranks = ref<ChessRank[]>(['1', '2', '3', '4', '5', '6', '7', '8']);

const orderedFiles = computed(() => {
  return props.perspective === 'white'
    ? files.value
    : files.value.slice().reverse();
});

const orderedRanks = computed(() => {
  return props.perspective === 'white'
    ? ranks.value
    : ranks.value.slice().reverse();
});
</script>

<template>
  <!-- <h1>Chessboard</h1> -->
  <!-- <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="perspective = perspective === 'white' ? 'black' : 'white'"
  >
    toggle
  </button>
  <p>watching as {{ perspective }}</p> -->
  <div class="border-black flex">
    <div class="p-5 bg-orange-800">
      <div class="flex border-2 border-black">
        <div
          v-for="(file, i) in orderedFiles"
          :key="file"
        >
          <div
            v-for="rank in orderedRanks"
            :key="rank"
            class="w-[10vw] h-[10vw] max-h-[10vh] max-w-[10vh]"
            :class="[
              (i + Number(rank)) % 2 === 0 ? 'bg-gray-200' : 'bg-green-900',
              'flex justify-center items-center text-2xl',
            ]"
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
