interface missionMapI {
    name: string,
    field: string,
    target: number, 
    current: number,
    xp: number
}  
export class RewardsReportLeaderboard {
    guid: string;
    date: Date;
    profitLoss: number;
    seeFlop: number;
    seeTurn: number;
    seeRiver: number;
    winHand: number;
    winStreak: number;
    currentWinStreak: number;
    handOnePair: number; // rank = 2
    handTwoPairs: number; // rank = 3
    position: number;
    percentile: number;
    currentMission: number;
    handsPlayed: number;
    xp: number;
    missions: missionMapI[];
}