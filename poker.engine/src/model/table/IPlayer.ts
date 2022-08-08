export interface IPlayer {
  holecards: string[];
  cumulativeBet: number;
  hasFolded: boolean;
  missionData: {
    flopScore: number;
    turnScore: number;
    score: number;
    flopRank: number;
    turnRank: number;
    rank: number;
  }
}