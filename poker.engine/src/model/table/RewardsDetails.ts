export class RewardsDetails {
    date: Date;
    guid: string;
    profitLoss: number;
    handRank: number;
    handRankEnglish: string;
    lastStreet: string;
    winHand: boolean;
    score: number;
    flopScore: number;
    turnScore: number;
    flopRank: number;
    turnRank: number;
    seenShowdown: boolean;
    holeCards: string[] = [];
    bestHandPre: boolean;
    bestHandFlop: boolean;
    bestHandTurn: boolean;
    bestHandRiver: boolean;
    plFlop: number;
    plTurn: number;
    plRiver: number;
    plShowdown: number;    
    boardCards: string[];
}
