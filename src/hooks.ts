import { ref } from 'vue';
import {
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
