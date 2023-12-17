import { SquareClickedRegistry } from '@/types';
import { addEntryToRegistry, getPosition } from '@/utils';
import { ref } from 'vue';
import { ChessSquare } from './../types';

export const useClickRegistry = () => {
  const squareClickedRegistry = ref<SquareClickedRegistry>([]);

  const addToRegistry = (square: ChessSquare) => {
    const squarePosition = getPosition(square);

    squareClickedRegistry.value = addEntryToRegistry(
      squarePosition,
      squareClickedRegistry.value
    );
  };

  return {
    squareClickedRegistry,
    addToRegistry,
  };
};
