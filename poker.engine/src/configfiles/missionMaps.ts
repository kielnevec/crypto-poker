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
  
    name: "Flop Seen",
    field: "seeFlop",
    target: 10,
    current: 0,
    xp: 50
        
}, {
    name: "Hands Won",
    field: "wonHand",
    target: 10,
    current: 0,
    xp: 10
  }, {
    name: "Hands Won",
    field: "wonHand",
    target: 20,
    current: 0,
    xp: 20
  }, {
    name: "Hands Won",
    field: "wonHand",
    target: 30,
    current: 0,
    xp: 30
  }, {
    name: "Hands Won",
    field: "wonHand",
    target: 40,
    current: 0,
    xp: 40
  }, {
    name: "Hands Won",
    field: "wonHand",
    target: 50,
    current: 0,
    xp: 50
  }, {
    name: "Hands Won",
    field: "wonHand",
    target: 60,
    current: 0,
    xp: 60
  }, {
    name: "Hands Won",
    field: "wonHand",
    target: 70,
    current: 0,
    xp: 70
  }, {
    name: "Hands Won",
    field: "wonHand",
    target: 80,
    current: 0,
    xp: 80
  }, {
    name: "Hands Won",
    field: "wonHand",
    target: 90,
    current: 0,
    xp: 90
  }, {
    name: "Hands Won",
    field: "wonHand",
    target: 100,
    current: 0,
    xp: 100
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
    postition: 0,
    percentile: 0,
    missions: missionMap
}

export {missionMap, rewardsInitializer, missionMapDisplay};