export type ChessFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
export type ChessRank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

export type ChessSquare = {
  file: ChessFile;
  rank: ChessRank;
};

export type ChessSquarePosition = `${ChessFile}${ChessRank}`;

export type Perspective = 'white' | 'black';

export type SquareClickedRegistryEntry = {
  position: ChessSquarePosition;
  timestamp: string;
  formattedTimestamp: string;
};

export type SquareClickedRegistry = SquareClickedRegistryEntry[];
