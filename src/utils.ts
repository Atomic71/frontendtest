import dayjs from 'dayjs';
import {
  ChessFile,
  ChessRank,
  ChessSquarePosition,
  SquareClickedRegistry,
} from './types';

export const getPosition = (
  file: ChessFile,
  rank: ChessRank
): ChessSquarePosition => `${file}${rank}`;

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

export const isSquareDark = (file: ChessFile, rank: ChessRank): boolean => {
  // a = 97, b = 98, etc.
  const asciiBaseForFiles = 'a'.charCodeAt(0);

  const asciiFile = file.charCodeAt(0);

  const fileIndex = asciiFile - asciiBaseForFiles; // get 0-indexed file, a = 0, b = 1, etc

  // Check if combined position is even;
  const isCombinedPositionEven = (fileIndex + Number(rank)) % 2 === 0;

  // Even positions are dark squares
  return isCombinedPositionEven;
};
