<script setup lang="ts">
import ChessBoard from '@/components/ChessBoard.vue';
import Sidebar from '@/components/Sidebar.vue';

import { useClickRegistry, useHighlightedSquares } from '@/hooks';
import { ChessFile, ChessRank, Perspective } from '@/types';
import { getPosition, isSquareDark } from '@/utils';
import { ref } from 'vue';

const { addToRegistry, squareClickedRegistry } = useClickRegistry();
const { handleHighlightSquare, highlightedSquares } = useHighlightedSquares();

const handleClick = (file: ChessFile, rank: ChessRank) => {
  addToRegistry(file, rank);
  handleHighlightSquare(file, rank);
};
const perspective = ref<Perspective>('white');

const isHighlighted = (file: ChessFile, rank: ChessRank) => {
  return highlightedSquares.value.includes(getPosition(file, rank));
};
</script>
<template>
  <div
    class="flex flex-1 flex-col lg:flex-row items-center lg:items-start gap-2 overflow-hidden"
  >
    <div class="lg:h-full bg-stone-300">
      <ChessBoard :perspective="perspective">
        <template #square="{ file, rank }">
          <div
            class="w-full h-full"
            :class="{
              [isHighlighted(file, rank)
                ? isSquareDark(file, rank)
                  ? 'bg-green-600 bg-opacity-50'
                  : 'bg-green-500 bg-opacity-50'
                : '']: true,
            }"
            @click="handleClick(file, rank)"
          />
        </template>
      </ChessBoard>
    </div>
    <div class="bg-gray-700 flex-1 w-full max-w-[300px] h-full overflow-hidden">
      <Sidebar
        :registry="squareClickedRegistry"
        :perspective="perspective"
        @change-perspective="perspective = $event"
      />
    </div>
  </div>
</template>
