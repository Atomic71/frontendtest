<script setup lang="ts">
import { computed, ref } from 'vue';

const perspective = ref<'black' | 'white'>('white');

const files = ref(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
const ranks = ref([1, 2, 3, 4, 5, 6, 7, 8]);

const chessBoard = ref<HTMLDivElement>();

const orderedFiles = computed(() => {
  return perspective.value === 'white'
    ? files.value
    : files.value.slice().reverse();
});

const orderedRanks = computed(() => {
  return perspective.value === 'white'
    ? ranks.value
    : ranks.value.slice().reverse();
});
</script>

<template>
  <h1>Chessboard</h1>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="perspective = perspective === 'white' ? 'black' : 'white'"
  >
    toggle
  </button>
  <p>watching as {{ perspective }}</p>
  <div class="border-black justify-center flex">
    <div class="p-5 bg-orange-300">
      <div class="flex border-2 border-black">
        <div
          v-for="(file, i) in orderedFiles"
          :key="file"
        >
          <div
            v-for="rank in orderedRanks"
            :key="rank"
            class="w-[6vw] h-[6vw]"
            :class="[
              (i + rank) % 2 === 0 ? 'bg-white' : 'bg-black',
              'flex justify-center items-center text-2xl text-red-600',
            ]"
          >
            <div class=""></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
