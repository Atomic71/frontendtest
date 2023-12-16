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

export const isHighlighted = (
  square: ChessSquarePosition,
  highlightedPositions: ChessSquarePosition[]
): boolean => highlightedPositions.includes(square);

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
