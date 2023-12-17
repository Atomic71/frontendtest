import { computed, ref } from 'vue';
import { ChessFile, ChessRank, Perspective } from '../types';

export const useBoardRenderOrder = (perspective: Perspective) => {
  const ranks = ref<ChessRank[]>(['1', '2', '3', '4', '5', '6', '7', '8']);
  const files = ref<ChessFile[]>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);

  const fileRenderOrder = computed(() => {
    return perspective === 'white'
      ? files.value
      : files.value.slice().reverse();
  });

  const rankRenderOrder = computed(() => {
    return perspective === 'black'
      ? ranks.value
      : ranks.value.slice().reverse();
  });

  return {
    fileRenderOrder,
    rankRenderOrder,
  };
};
