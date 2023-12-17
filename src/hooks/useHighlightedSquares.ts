import {
  ChessFile,
  ChessRank,
  ChessSquarePosition,
  Perspective,
  SquareClickEvent,
  SquareClickedRegistry,
} from '@/types';
import { addEntryToRegistry, getPosition } from '@/utils';
import { ref } from 'vue';

export const useHighlightedSquares = () => {
  const highlightedSquares = ref<ChessSquarePosition[]>([]);

  const handleHighlightSquare = (file: ChessFile, rank: ChessRank) => {
    const squarePosition = getPosition(file, rank);

    const isHighlighted = highlightedSquares.value.includes(squarePosition);

    highlightedSquares.value = isHighlighted
      ? highlightedSquares.value.filter(
          (position) => position !== squarePosition
        )
      : [...highlightedSquares.value, squarePosition];
  };

  return {
    highlightedSquares,
    handleHighlightSquare,
  };
};
