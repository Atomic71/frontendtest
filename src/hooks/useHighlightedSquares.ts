import { ChessSquare, ChessSquarePosition } from '@/types';
import { getPosition } from '@/utils';
import { ref } from 'vue';

export const useHighlightedSquares = () => {
  const highlightedSquares = ref<ChessSquarePosition[]>([]);

  const isHighlighted = (square: ChessSquare) => {
    return highlightedSquares.value.includes(getPosition(square));
  };
  const handleHighlightSquare = (square: ChessSquare) => {
    const squarePosition = getPosition(square);

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
    isHighlighted,
  };
};
