import { missionMapI, missionMapDisplayI } from "./Interfaces";

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
  fireWinning: number;
  percentile: number;
  currentMission: number;
  missionProgress: number;
  handsPlayed: number;
  xp: number;
  missionsCompleted: number;
  missions: missionMapI[];
}