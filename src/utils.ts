import dayjs from 'dayjs';
import {
  ChessSquare,
  ChessSquarePosition,
  SquareClickedRegistry,
} from './types';

export const getPosition = (square: ChessSquare): ChessSquarePosition =>
  `${square.file}${square.rank}`;

export const addEntryToRegistry = (
  position: ChessSquarePosition,
  registry: SquareClickedRegistry
): SquareClickedRegistry => [
  ...registry,
  {
    position,
    timestamp: dayjs().toISOString(),
    formattedTimestamp: dayjs().format('HH:mm:ss'),
  },
];

export const isSquareDark = (square: ChessSquare): boolean => {
  // a = 97, b = 98, etc.
  const { file, rank } = square;

  const asciiBaseForFiles = 'a'.charCodeAt(0);

  const asciiFile = file.charCodeAt(0);

  const fileIndex = asciiFile - asciiBaseForFiles; // get 0-indexed file, a = 0, b = 1, etc

  // Check if combined position is even;
  const isCombinedPositionEven = (fileIndex + Number(rank)) % 2 !== 0;

  // Even positions are dark squares
  return isCombinedPositionEven;
};
