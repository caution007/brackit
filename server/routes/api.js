const express = require('express');
const router = express.Router();
const underscore = require('underscore');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://caution007:superkala@brackit-shard-00-00-dfqwj.mongodb.net:27017,brackit-shard-00-01-dfqwj.mongodb.net:27017,brackit-shard-00-02-dfqwj.mongodb.net:27017/brackit?ssl=true&replicaSet=brackit-shard-0&authSource=admin');

// Mongoose Models //
var Tournament = require('./models/tournament/tournamentModel').Tournament;
var RoundRobinLeague = require('./models/tournament/roundRobinModel').RoundRobinLeague;
var Team = require('./models/team/teamModel').Team;
var Match = require('./models/matches/matchModel').Match;
var Bo1 = require('./models/matches/bo1Model').Bo1;
var Profile = require('./models/user/profileModel').Profile;

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

// GET one tournament //
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
  Tournament.findAsync({ 'type': req.params.type })
    .then((tournaments) => {
      res.status(200).json(tournaments);
    })
    .catch(next)
    .error(console.error);
});

// GET roundrobin tournament by tournament id //
router.get('/roundrobin/:tournamentid', (req, res, next) => {
  RoundRobinLeague.findAsync({ 'tournamentId': req.params.tournamentid })
    .then((tournament) => {
      res.status(200).json(tournament);
    })
    .catch(next)
    .error(console.error);
});

// GET tournament teams and players by tournament id //
router.get('/tournament/teams/:tournamentid', (req, res, next) => {
  let tournType;
  Tournament.findAsync({ '_id': req.params.tournamentid })
    .then((t) => {
      switch (t[0].type) {
        case 'Round Robin':
          RoundRobinLeague.findAsync({ 'tournamentId': req.params.tournamentid })
            .then((tt) => {
              let teams = [];
              for (let i = 0 ; i < tt[0].teams.length ; i++) {
                Team.findAsync({'_id': tt[0].teams[i].id})
                  .then((tm) => {
                    teams.push(tm[0]);
                    if (i == (tt[0].teams.length - 1)) {
                       res.status(200).json(teams);
                    }
                  })
                  .catch((e) => {
                    res.json({ 'status': 'error', 'error': e });
                  })
                  .error(console.error);
              }
            })
            .catch((e) => {
              res.json({ 'status': 'error', 'error': e });
            })
            .error(console.error);
          break;
  }
    })
    .catch(next)
    .error(console.error);
});


// POST a tournament //
router.post('/tournament', (req, res) => {
  console.log(req.body.tournament);
  let start = req.body.tournament[6] + "T" + req.body.tournament[7] + ":00Z";

  let tournament = new Tournament({
    name: req.body.tournament[0],
    type: req.body.tournament[1],
    registrationType: req.body.tournament[2],
    fixtureSortType: req.body.tournament[3],
    competitorType: req.body.tournament[4],
    includeDraws: req.body.tournament[5],
    start: start,
    matchType: req.body.tournament[8],
    information: req.body.tournament[9],
    rules: req.body.tournament[10],
    started: false,
    complete: false,
    victor: null,
    owner: req.body.tournament[11]
  })

  postTournamentType(req.body.tournament[1], req.body.tournament[2], req.body.tournament[12], tournament._id);

  tournament.saveAsync()
    .then((tournament) => {
      res.json({ 'status': 'success', 'tournament': tournament });
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
})

// POST a tournament type //
function postTournamentType(type, rType, teams, id) {
  if (rType == 'List') {
    teams = registrationTypeCheck(teams);
  }

  switch (type) {
    case 'Round Robin':
      let roundRobin = new RoundRobinLeague({
        tournamentId: id,
        teams: teams
      })

      roundRobin.saveAsync()
        .then((rRobin) => {
        })
        .catch((e) => {
        })
        .error(console.error);

      break;
  }
}

function registrationTypeCheck(teams) {
  let splitTeams = teams.split('\n');
  let array = [];

  for (let i = 0; i < splitTeams.length; i++) {
    let obj = { id: '', name: splitTeams[i], played: 0, points: 0, wins: 0, draws: 0, losses: 0 };
    array.push(obj);
  }

  teams = array;
  return teams;
}

// POST fixtures, when tournament starts //
router.post('/fixtures', (req, res) => {
  let competitorLst = [];
  for (let i = 0; i < req.body.teams.length; i++) {
    competitorLst.push(req.body.teams[i]);
  }

  if (competitorLst.length % 2 != 0) { competitorLst.push("Bye"); }

  let fixturesNum = competitorLst.length - 1;
  let fixturesHalf = competitorLst.length / 2;

  let competitors = competitorLst.slice();
  competitors.splice(0, 1);
  let competitorsNum = competitors.length;
  console.log(competitors);
  let haCounter = 0; // Home and Away counter for team 0

  for (let i = 0; i < fixturesNum; i++) {
    console.log("Fixture " + (i + 1));

    let team = i % competitorsNum;

    if (haCounter == 0) {
      console.log(competitors[team] + " vs " + competitorLst[0]);

      checkMatchAndCreate(req.body.id, req.body.type, req.body.mType, competitors[team], competitorLst[0]);

      haCount = 1;
    } else {
      console.log(competitorLst[0] + " vs " + competitors[team]);

      checkMatchAndCreate(req.body.id, req.body.type, req.body.mType, competitorLst[0], competitors[team]);

      haCount = 0;
    }

    for (let l = 1; l < fixturesHalf; l++) {
      let teamOne = (i + l) % competitorsNum;
      let teamTwo = (i + competitorsNum - l) % competitorsNum;
      console.log(competitors[teamOne] + " vs " + competitors[teamTwo])

      checkMatchAndCreate(req.body.id, req.body.type, req.body.mType, competitors[teamOne], competitors[teamTwo]);
    }
    res.json({ 'status': 'success' });
  }
});

function checkMatchAndCreate(id, type, mType, teamOne, teamTwo) {
  let match = matchModel(id, type, null);
  let matchType;

  switch (mType) {
    case 'bo1':
      matchType = bo1Model(teamOne, teamTwo, match._id);
      break;
  }

  saveMatch(match);
  saveBo1(matchType);
}

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


router.get('/tournaments/userid/:userId', (req, res, next) => {
  Tournament.findAsync({ 'owner': req.params.userId })
    .then((tournament) => {
      res.status(200).json(tournament);
    })
    .catch(next)
    .error(console.error);
})

// PROFILE //

// GET profile by id, if it exists //
router.get('/profile/:userId', (req, res, next) => {
  Profile.findAsync({ 'userId': req.params.userId })
    .then((profile) => {
      if (underscore.isEmpty(profile)) {
        profile = createProfile(req.params.userId, req.params.username);
      }
      res.status(200).json(profile);
    })
    .catch(next)
    .error(console.error);
});

function createProfile(id, username) {
  let profile = new Profile({
    userId: id,
    username: '',
    firstName: '',
    familyName: ''
  })

  profile.saveAsync()
    .then((profile) => {
    })
    .catch((e) => {
    })
    .error(console.error);

  return profile;
}

router.put('/profile/update/:_id', (req, res, next) => {
  Profile.findOneAndUpdateAsync({ _id: req.params._id }, req.body)
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch(next)
    .error(console.error);
})


module.exports = router;