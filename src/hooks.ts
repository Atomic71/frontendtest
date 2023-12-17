import { computed, ref } from 'vue';
import {
  ChessFile,
  ChessRank,
  ChessSquarePosition,
  Perspective,
  SquareClickEvent,
  SquareClickedRegistry,
} from './types';
import { addEntryToRegistry, getPosition } from './utils';

export const useAppBrain = () => {
  const squareClickedRegistry = ref<SquareClickedRegistry>([]);
  const highlightedSquares = ref<ChessSquarePosition[]>([]);
  const perspective = ref<Perspective>('white');

  const handleClick = (e: SquareClickEvent) => {
    const { file, rank } = e;
    const squarePosition = getPosition(file, rank);

    const isHighlighted = highlightedSquares.value.includes(squarePosition);

    squareClickedRegistry.value = addEntryToRegistry(
      squarePosition,
      squareClickedRegistry.value
    );

    highlightedSquares.value = isHighlighted
      ? highlightedSquares.value.filter(
          (position) => position !== squarePosition
        )
      : [...highlightedSquares.value, squarePosition];
  };

  const changePerspective = () => {
    perspective.value = perspective.value === 'white' ? 'black' : 'white';
  };

  return {
    squareClickedRegistry,
    highlightedSquares,
    handleClick,
    perspective,
    changePerspective,
  };
};

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
