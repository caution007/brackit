const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/brackit');

// Mongoose Models //
var Tournament = require('./models/tournament/tournamentModel').Tournament;
var RoundRobinLeague = require('./models/tournament/roundRobinModel').RoundRobinLeague;
var Team = require('./models/team/teamModel').Team;
var Match = require('./models/matches/matchModel').Match;
var Bo1 = require('./models/matches/bo1Model').Bo1;

// api listing //
router.get('/', (req, res) => {
  res.send('api works');
});

// TOURNAMENT //

// GET all tournaments //
router.get('/tournaments', (req, res, next) => {
  Tournament.findAsync({})
    .then((tournaments) => {
      res.status(200).json(tournaments);
    })
    .catch(next)
    .error(console.error);
});

// GET one tournament. //
router.get('/tournaments/:id', (req, res, next) => {
  Tournament.findByIdAsync(req.params.id)
    .then((tournament) => {
      res.status(200).json(tournament);
    })
    .catch(next)
    .error(console.error);
});

// GET tournaments by type //
router.get('/tournaments/type/:type', (req, res, next) => {
  Tournament.findAsync({'type': req.params.type})
    .then((tournaments) => {
      res.status(200).json(tournaments);
    })
    .catch(next)
    .error(console.error);
});

// GET roundrobin tournament by tournament id //
router.get('/roundrobin/:tournamentid', (req, res, next) => {
  RoundRobinLeague.findAsync({'tournamentId': req.params.tournamentid})
    .then((tournament) => {
      res.status(200).json(tournament);
    })
    .catch(next)
    .error(console.error);
});

// POST all fixtures for a tournament, by tournament id //
// router.post('/fixtur', (req, res) => {
//   let m = new Match({
//     tournamentId: req.body.id,
//     type: 'bo1',
//     start: null
//   })

//   m.saveAsync()
//     .then((m) => {
//       res.json({'status': 'success', 'match': 'match'});
//     })
//     .catch((e) => {
//       res.json({'status': 'error', 'error': e});
//     })
//     .error(console.error);
// });

// POST all fixtures for a tournament, by tournament id //
router.post('/fixtures', (req, res) => {
  let competitorLst = [];
  for (let i = 0 ; i < req.body.teams.length ; i++) {
    competitorLst.push(req.body.teams[i].id);
  }

  if (competitorLst.length % 2 != 0) { competitorLst.push("Bye"); }

  let fixturesNum = competitorLst.length - 1;
  let fixturesHalf = competitorLst.length / 2;

  let competitors = competitorLst.slice();
  competitors.splice(0, 1);
  let competitorsNum = competitors.length;

  let haCounter = 0; // Home and Away counter for team 0

  for (let i = 0 ; i < fixturesNum ; i++) {
    console.log("Fixture " + (i + 1));

    let team = i % competitorsNum;

    if (haCounter == 0) {
      console.log(competitors[team] + " vs " + competitorLst[0]);

      let match = matchModel(req.body.id, req.body.type, null);
      let matchType = bo1Model(competitors[team], competitorLst[0], match._id);
      saveMatch(match);
      saveBo1(matchType);
      haCount = 1;
    } else {
        console.log(competitorLst[0] + " vs " + competitors[team]);

        let match = matchModel(req.body.id, req.body.type, null);
        let matchType = bo1Model(competitorLst[0], competitors[team], match._id);
        saveMatch(match);
        saveBo1(matchType);
        haCount = 0;
    }

    for (let l = 1 ; l < fixturesHalf; l++) {
      let teamOne = (i + l) % competitorsNum;
      let teamTwo = (i + competitorsNum - l) % competitorsNum;
      console.log(competitors[teamOne] + " vs " + competitors[teamTwo])

      let match = matchModel(req.body.id, req.body.type, null);
      let matchType = bo1Model(competitors[teamOne], competitors[teamTwo], match._id);
      saveMatch(match);
      saveBo1(matchType);
    }
  }
});

function saveMatch(m) {
  m.saveAsync()
    .then((m) => {
    })
    .catch((e) => {
    })
    .error(console.error);
}

function saveBo1(bo1) {
  bo1.saveAsync()
    .then((bo1) => {
    })
    .catch((e) => {
    })
    .error(console.error);
}

function matchModel(id, type, start) {
  let m = new Match({
    tournamentId: id,
    type: type,
    start: start
  })

  return m;
}

function bo1Model(teamOne, TeamTwo, id) {
  let obj = new Object();
  obj.id = teamOne;
  obj.score = "";
  let json1 = JSON.stringify(obj);
  obj = new Object();
  obj.id = TeamTwo;
  obj.score = "";
  let json2 = JSON.stringify(obj);

  let partakers = [json1, json2];

  let bo1 = new Bo1({
    matchId: id,
    partakers: partakers,
    victor: ""
  })

  return bo1;
};

// TEAM //

// GET all teams //
router.get('/teams', (req, res, next) => {
  Team.findAsync({})
    .then((teams) => {
      res.status(200).json(teams);
    })
    .catch(next)
    .error(console.error);
});


module.exports = router;