import { Ref, computed, ref } from 'vue';
import { ChessFile, ChessRank, Perspective } from '../types';

export const useBoardRenderOrder = (perspective: Ref<Perspective>) => {
  const ranks = ref<ChessRank[]>(['1', '2', '3', '4', '5', '6', '7', '8']);
  const files = ref<ChessFile[]>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);

  const fileRenderOrder = computed(() => {
    return perspective.value === 'white'
      ? files.value
      : files.value.slice().reverse();
  });

  const rankRenderOrder = computed(() => {
    return perspective.value === 'black'
      ? ranks.value
      : ranks.value.slice().reverse();
  });

  const finalOrder = computed<
    {
      file: ChessFile;
      rank: ChessRank;
    }[]
  >(() => {
    const order: {
      file: ChessFile;
      rank: ChessRank;
    }[] = [];

    rankRenderOrder.value.forEach((rank) => {
      fileRenderOrder.value.forEach((file) => {
        order.push({ file, rank });
      });
    });

    return order;
  });

  return {
    fileRenderOrder,
    rankRenderOrder,
    finalOrder,
  };
};
