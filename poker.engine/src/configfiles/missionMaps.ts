import { missionMapI, missionMapDisplayI } from "../../../poker.ui/src/shared/Interfaces";

const missionMapDisplay: missionMapDisplayI[] = 
    [{
        position: 0,
        progressbar: "0%",
        name: "Flop seen",
        target: 10,
        current: 0,
        xp: 50
    }, {
        position: 0,
        progressbar: "0%",
        name: "Hands Won",
        target: 10,
        current: 0,
        xp: 10
      }, {
        position: 0,
        progressbar: "0%",
        name: "Hands Won",
        target: 20,
        current: 0,
        xp: 20
      }, {
        position: 0,
        progressbar: "0%",
        name: "Hands Won",
        target: 30,
        current: 0,
        xp: 30
      }, {
        position: 0,
        progressbar: "0%",
        name: "Hands Won",
        target: 40,
        current: 0,
        xp: 40
      }
]

const missionMap: missionMapI[] = 
[{  
    name: "Seen the flop",
    field: "seeFlop",
    target: 5,
    current: 0,
    xp: 50
}, {
  name: "Won the hand",
  field: "wonHand",
  target: 10,
  current: 0,
  xp: 10
}, {
  name: "Won the hand",
  field: "wonHand",
  target: 20,
  current: 0,
  xp: 20
}, {
  name: "Hands played",
  field: "playedHands",
  target: 10,
  current: 0,
  xp: 10
} , {
  name: "Hands played",
  field: "playedHands",
  target: 50,
  current: 0,
  xp: 50
}, {
  name: "Hands played",
  field: "playedHands",
  target: 100,
  current: 0,
  xp: 100
}, {
  name: "Lost hand after seeing the flop",
  field: "lostSeeFlop",
  target: 10,
  current: 0,
  xp: 400
},  {
  name: "Win hand after seeing the flop",
  field: "wonSeeFlop",
  target: 10,
  current: 0,
  xp: 500
}
]

const rewardsInitializer = {
    guid: "INIT",
    date: Date.now(),
    profitLoss: 0,
    handOnePair: 0, // rank = 2
    handTwoPairs: 0, // rank = 3
    seeFlop: 0,
    seeTurn: 0,
    seeRiver: 0,
    winHand: 0,
    handsPlayed: 0,
    currentWinStreak: 0,
    winStreak: 0,
    position: 0,
    percentile: 0,
    missions: missionMap
}

export {missionMap, rewardsInitializer, missionMapDisplay};