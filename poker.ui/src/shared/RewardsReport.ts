export class RewardsReport {
  guid: string;
  date: Date;
  profitLoss: number;
  seeFlop: number;
  seeTurn: number;
  seeRiver: number;
  winHand: number;
  handOnePair: number; // rank = 2
  handTwoPairs: number; // rank = 3
  position: number;
  percentile: number;
  currentMission: number;
  missionProgress: number;
  handsPlayed: number;
  misProgress: {
      a: number;
      b: number;
      c: number;
  }
  misPrBest: {
      a: number;
      b: number;
      c: number;
  }
  misCount: {
      a: number;
      b: number;
      c: number;
  }
  misTotalCount: {
      a: number;
      b: number;
      c: number;
  }
}