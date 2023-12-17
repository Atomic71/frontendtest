import { ChessRank } from './../types';
import {
  ChessFile,
  ChessSquarePosition,
  Perspective,
  SquareClickEvent,
  SquareClickedRegistry,
} from '@/types';
import { addEntryToRegistry, getPosition } from '@/utils';
import { ref } from 'vue';

export const useClickRegistry = () => {
  const squareClickedRegistry = ref<SquareClickedRegistry>([]);

  const addToRegistry = (file: ChessFile, rank: ChessRank) => {
    const squarePosition = getPosition(file, rank);

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
