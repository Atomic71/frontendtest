<script setup lang="ts">
import type { Perspective, ChessSquare } from '@/types';
import { useBoardRenderOrder, useHighlightedSquares } from '@/hooks';
import { toRef } from 'vue';
import ChessBoardSquare from './ChessBoardSquare.vue';

const props = defineProps<{
  perspective: Perspective;
}>();

const emit = defineEmits<{
  (e: 'square-clicked', square: ChessSquare): void;
}>();

const perspective = toRef(props, 'perspective');
const { finalOrder } = useBoardRenderOrder(perspective);
const { handleHighlightSquare, isHighlighted } = useHighlightedSquares();

const handleOnClick = (square: ChessSquare) => {
  handleHighlightSquare(square);
  emit('square-clicked', square);
};
</script>

<template>
  <div
    class="grid h-full grid-cols-8 border-2 border-black grid-flow-row-dense max-h-[60vh]"
  >
    <div
      v-for="square in finalOrder"
      @click="handleOnClick(square)"
      :key="Object.values(square).join('')"
      :class="['aspect-square relative']"
    >
      <ChessBoardSquare
        :square="square"
        :is-highlighted="isHighlighted(square)"
        :show-rank="square.file === (perspective === 'white' ? 'a' : 'h')"
        :show-file="square.rank === (perspective === 'white' ? '1' : '8')"
      />
    </div>
  </div>
</template>
