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
    .catch((next) => {
      res.json({ 'status': 'error', 'error': next });
    })
    .error(console.error);
});

// GET fixtures for a given tournament, by tournament id //
router.get('/tournament/matches/:id', (req, res) => {
  Match.findAsync({ 'tournamentId': req.params.id })
    .then((match) => {
      let matches = { fixtures: [], results: [] };
      let count = 0;
      for (let i = 0; i < match.length; i++) {
        (function(index) {
          Bo1.findAsync({ 'matchId': match[index]._id })
            .then((type) => {
              let newMatch = match[index].toObject();
              newMatch.victor = type[0].victor;
              newMatch.partakers = type[0].partakers;

              if(newMatch.complete) {
                matches.results.push(newMatch);
              } else {
                matches.fixtures.push(newMatch);
              }

              count++;
              if (count > (match.length - 1)) {
                matches.fixtures.sort(sortStartDate);
                matches.results.sort(sortStartDate);
                res.status(200).json(matches);
              }
            })
        }(i))
      }
    })
})

function sortStartDate(a, b) {
  return new Date(a.start) - new Date(b.start);
}

// GET roundrobin tournament by tournament id //
router.get('/roundrobin/:tournamentid', (req, res) => {
  RoundRobinLeague.findAsync({ 'tournamentId': req.params.tournamentid })
    .then((tournament) => {
      res.status(200).json(tournament);
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
});

// GET tournament teams and players by tournament id //
router.get('/tournament/teams/:tournamentid', (req, res, next) => {
  Tournament.findAsync({ '_id': req.params.tournamentid })
    .then((t) => {
      switch (t[0].type) {
        case 'Round Robin':
          RoundRobinLeague.findAsync({ 'tournamentId': req.params.tournamentid })
            .then((tt) => {
              let teams = [];
              let count = 0;
              for (let i = 0; i < tt[0].teams.length; i++) {
                (function(index) {
                  Team.findAsync({ '_id': tt[0].teams[index].id })
                    .then((tm) => {
                      tm = tm[0].toObject();
                      delete tm.joinPassword;
                      teams.splice(index, 0, tm);
                      count++;
                      if (count > (tt[0].teams.length - 1)) {
                        res.status(200).json(teams);
                      }
                    })
                    .catch((e) => {
                      res.json({ 'status': 'error', 'error': e });
                    })
                    .error(console.error);
                }(i))
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

// GET tournament players by tournament id //
router.get('/tournament/players/:tournamentid', (req, res, next) => {
  Tournament.findAsync({ '_id': req.params.tournamentid })
    .then((t) => {
      switch (t[0].type) {
        case 'Round Robin':
          RoundRobinLeague.findAsync({ 'tournamentId': req.params.tournamentid })
            .then((tt) => {
              let players = [];
              let count = 0;
              for (let i = 0; i < tt[0].teams.length; i++) {
                (function(index) {
                  Profile.findAsync({ '_id': tt[0].teams[index].id })
                  .then((p) => {
                    players.splice(index, 0, p[0])
                    count++;
                    if (count > (tt[0].teams.length - 1)) {
                      res.status(200).json(players);
                    }
                  })
                  .catch((e) => {
                    res.json({ 'status': 'error', 'error': e });
                  })
                  .error(console.error);
                }(i))
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

// POST a new partaker to the tournament //
router.post('/tournament/join', (req, res) => {
  let team = createLeagueTeamObject(req.body.id, req.body.name);
  switch (req.body.tournType) {
    case 'Round Robin':
      RoundRobinLeague.findOneAndUpdateAsync(
        { tournamentId: req.body.tournId }, 
        { $push: {teams: team} })
        .then((tournament) => {
          res.json({ 'status': 'success' });

          if(req.body.cType == 'Team') {
            Team.findByIdAndUpdateAsync(
              req.body.id, 
              { $push: {tournaments: req.body.tournId} })
              .catch((e) => {
                res.json({ 'status': 'error', 'error': e });
              })
              .error(console.error);
          } else if (req.body.cType == 'User') {
            Profile.findByIdAndUpdateAsync(
              req.body.id, 
              { $push: {tournaments: req.body.tournId} })
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

// DELETE a partaker from a tournament //
router.post('/tournament/leavetournament', (req, res) => {
  switch (req.body.tournType) {
    case 'Round Robin':
      RoundRobinLeague.findOneAndUpdateAsync(
        { tournamentId: req.body.tournId }, 
        { $pull: { 'teams': {id: req.body.id} } })
        .then((tournament) => {
          res.json({ 'status': 'success' });

          if(req.body.cType == 'Team') {
            Team.findByIdAndUpdateAsync(
              req.body.id,
              { $pull: { 'tournaments': req.body.tournId } })
              .catch((e) => {
                res.json({ 'status': 'error', 'error': e });
              })
              .error(console.error);
          } else if (req.body.cType == 'User') {
            Profile.findByIdAndUpdateAsync(
              req.body.id,
              { $pull: { 'tournaments': req.body.tournId } })
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

// POST a tournament //
router.post('/tournament', (req, res) => {
  console.log(req.body.tournament);
  let start = req.body.tournament[6] + "T" + req.body.tournament[7] + ":00Z";
  let teamLimit = {current: 0, max: req.body.tournament[12]};

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
    owner: req.body.tournament[11],
    teamLimit: teamLimit,
    fixtureInterval: req.body.tournament[13],
    game: req.body.tournament[14]
  })

  postTournamentType(req.body.tournament[1], req.body.tournament[2], req.body.tournament[15], tournament._id);

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
    let team = createLeagueTeamObject('', splitTeams[i]);
    array.push(team);
  }

  teams = array;
  return teams;
}

function createLeagueTeamObject(id, name) {
  let team = { id: id, name: name, played: 0, points: 0, wins: 0, draws: 0, losses: 0, position: 0, finalPosition: null };
  return team;
}

// GET all tournaments owned by specific user, by user id //
router.get('/tournaments/userid/:userId', (req, res, next) => {
  Tournament.findAsync({ 'owner': req.params.userId })
    .then((tournament) => {
      res.status(200).json(tournament);
    })
    .catch(next)
    .error(console.error);
})

// START tournament //
router.post('/starttournament', (req, res, next) => {
  Tournament.findByIdAndUpdateAsync(
    req.body.tournId,
    {$set: {started: true}})
    .then(() => {
      res.json({ 'status': 'success' });
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
})

// Using Fisher-Yates shuffle //
function shuffleArray(array) {
  let index = array.length;
  let randIndex;
  let tempVal;

  while(0 !== index) {
    randIndex = Math.floor(Math.random() * index);
    index -= 1;

    tempVal = array[index];
    array[index] = array[randIndex];
    array[randIndex] = tempVal;
  }

  return array;
}

// POST fixtures, when tournament starts //
router.post('/fixtures', (req, res) => {
  RoundRobinLeague.findAsync({ 'tournamentId': req.body.id })
    .then((tournament) => {
      tournament = tournament[0];
      let teams = [];
      for(let i = 0; i < tournament.teams.length; i++) {
        teams.push([tournament.teams[i].name, tournament.teams[i].id]);
      }
      teams = shuffleArray(teams);
      
      let competitorLst = [];
      for (let i = 0; i < teams.length; i++) {
        competitorLst.push(teams[i]);
      }

      if (competitorLst.length % 2 != 0) { 
        competitorLst.push("Bye"); 
      }

      let fixturesNum = competitorLst.length - 1;
      let fixturesHalf = competitorLst.length / 2;

      let competitors = competitorLst.slice();
      competitors.splice(0, 1);
      let competitorsNum = competitors.length;
      console.log(competitors);
      let haCounter = 0; // Home and Away counter for team 0
      let date;
      for (let i = 0; i < fixturesNum; i++) {
        console.log("Fixture " + (i + 1));

        let team = i % competitorsNum;

        if (i == 0) {
          date = req.body.start;
        } else {
          date = getAndSetDateFixture(date, req.body.interval);
        }
        
        if (haCounter == 0) {
          console.log(competitors[team] + " vs " + competitorLst[0] + " start: " + date);

          checkMatchAndCreate(req.body.id, req.body.type, req.body.mType, competitors[team], competitorLst[0], date, req.body.rType);

          haCounter = 1;
        } else {
          console.log(competitorLst[0] + " vs " + competitors[team] + " start: " + date);

          checkMatchAndCreate(req.body.id, req.body.type, req.body.mType, competitorLst[0], competitors[team], date, req.body.rType);

          haCounter = 0;
        }

        for (let l = 1; l < fixturesHalf; l++) {
          let teamOne = (i + l) % competitorsNum;
          let teamTwo = (i + competitorsNum - l) % competitorsNum;
          console.log(competitors[teamOne] + " vs " + competitors[teamTwo] + " start: " + date)

          checkMatchAndCreate(req.body.id, req.body.type, req.body.mType, competitors[teamOne], competitors[teamTwo], date,req.body.rType);
        }

        if (i == (fixturesNum - 1)) {
          res.json({ 'status': 'success' });
        }
      }
        })
        .catch((e) => {
          res.json({ 'status': 'error', 'error': e });
        })
        .error(console.error);
  
});

function getAndSetDateFixture(string, interval) {
  let date = new Date(string);
  let newDate = date.getDate() + interval;
  date.setDate(newDate);
  return date;
}

function checkMatchAndCreate(id, type, mType, teamOne, teamTwo, date, rType) {
  let match = matchModel(id, mType, date);
  let matchType;

  switch (mType) {
    case 'bo1':
      matchType = bo1Model(teamOne, teamTwo, match._id, rType);
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
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
}

function saveBo1(bo1) {
  bo1.saveAsync()
    .then((bo1) => {
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
}

function matchModel(id, type, start) {
  let m = new Match({
    tournamentId: id,
    type: type,
    start: start,
    complete: false
  })

  return m;
}

function bo1Model(teamOne, teamTwo, id, rType) {
  let partakerOne = {id: teamOne[1], name: teamOne[0], score: ''};
  let partakerTwo = {id: teamTwo[1], name: teamTwo[0], score: ''};
  let partakers = [partakerOne, partakerTwo];

  let resultInputObj;
  if(rType == 'List') {
    resultInputObj = {};
  } else if (rType == 'Signup'){
    resultInputObj = {partakerOne: {scoreOne: '', scoreTwo: ''}, partakerTwo: {scoreOne: '', scoreTwo: ''}};
  }

  let bo1 = new Bo1({
    matchId: id,
    partakers: partakers,
    resultInput: resultInputObj,
    victor: ""
  })

  return bo1;
};

// TEAM //

// GET all teams //
router.get('/teams', (req, res, next) => {
  Player
  Team.findAsync({})
    .then((teams) => {
      res.status(200).json(teams);
    })
    .catch(next)
    .error(console.error);
});

// GET one team, by id //
router.get('/team/:id', (req, res) => {
  Team.findByIdAsync(req.params.id)
    .then((team) => {
        let members = [];

        var count = 0;

        for(let i = 0; i < team.members.length; i++) {
          (function(index) {
            Profile.findByIdAsync(team.members[index].id)
            .then((profile) => {
              profile = profile.toObject(); // Converts mongoose doc to plane object
              // Deletes the join password, so it's not passed to client side
              delete profile.userId;
              profile.role = team.members[index].role; // Combines Role element
              members.splice(index, 0, profile);
              count++;
              if (count > (team.members.length - 1)) {
                team.members = members;
                team = team.toObject();
                // Deletes the join password, so it's not passed to client side
                delete team.joinPassword; 
                res.status(200).json(team);
              }
            })
            .catch((e) => {
            })
            .error(console.error);
          }(i));
        } 
      })
      .catch((e) => {
        res.json({ 'status': 'error', 'error': e });
      })
      .error(console.error);
});

// POST new team //
router.post('/team', (req, res) => {
  console.log(req.body.team);

  let members = [{
    id: req.body.team.owner,
    username: req.body.team.ownerName,
    role: 'owner'
  }]

  let team = new Team({
    name: req.body.team.name,
    members: members,
    joinPassword: req.body.team.joinPassword,
    tournaments: [],
    matches: []
  })

  team.saveAsync()
    .then((team) => {
      res.json({ 'status': 'success', 'tournament': team });
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
})

// POST a new member to a team //
router.post('/team/join', (req, res) => {
  let member = createTeamMemberObject(req.body.id, req.body.name);

  Team.findByIdAsync(req.body.teamId)
    .then((team) => {
      console.log(req.body.joinPassword);
      console.log(team.joinPassword);

      if (req.body.joinPassword == team.joinPassword) {
        Team.findOneAndUpdateAsync({ _id: req.body.teamId }, { $push: {members: member}})
        .then((member) => {
          res.json({ 'password': true });
        })
        .catch((e) => {
          res.json({ 'status': 'error', 'error': e });
        })
        .error(console.error);
      } else {
        res.json({ 'password': false });
      }
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
})

function createTeamMemberObject(id, username) { 
  return {id: id, username: username, role: 'member'};
}

router.get('/ownedteams/:id', (req, res) => {
  Team.findAsync({'members.id': req.params.id, 'members.role': 'owner'})
    .then((teams) => {
      let teamArray = [];

      for(let i = 0; i < teams.length ; i++) {
        teamArray.push({name: teams[i].name, id: teams[i]._id});
      }

      res.json({ 'status': 'success', 'teams': teamArray });
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
})

// PROFILE //

// GET profile by id, if it exists. If not create a new blank profile //
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
    familyName: '',
    tournaments: [],
    matches: []
  })

  profile.saveAsync()
    .then((profile) => {
    })
    .catch((e) => {
    })
    .error(console.error);

  return profile;
}

// UPDATE profile, by id //
router.put('/profile/update/:_id', (req, res, next) => {
  Profile.findOneAndUpdateAsync({ _id: req.params._id }, req.body)
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch(next)
    .error(console.error);
})

// GET one public profile //
router.get('/profile/public/:id', (req, res, next) => {
  Profile.findByIdAsync(req.params.id)
    .then((profile) => {
      profile = profile.toObject();
      delete profile.userId;
      res.status(200).json(profile);
    })
    .catch(next)
    .error(console.error);
});

// MATCH //
router.get('/match/:id', (req, res, next) => {
  let matchData = {};
  Match.findByIdAsync(req.params.id)
    .then((match) => {
      matchData.match = match;
      switch(match.type) {
        case 'bo1':
          Bo1.findAsync({ 'matchId': match._id })
            .then((bo1) => {
              matchData.matchType = bo1[0];
              Tournament.findByIdAsync(match.tournamentId)
                .then((tournament) => {
                  matchData.tournament = tournament
                  switch(tournament.type) {
                    case 'Round Robin':
                      RoundRobinLeague.findAsync({ 'tournamentId': tournament._id })
                        .then((tournamentType) => {
                          matchData.tournamentType = tournamentType[0];
                          if(tournament.competitorType == 'Team') {
                            matchData.teams = [];
                            let count = 0;
                            for(let i = 0; i < 2; i++) {
                              (function(index) {
                                Team.findByIdAsync(bo1[0].partakers[index].id)
                                  .then((team) => {
                                    team = team.toObject();
                                    delete team.joinPassword;
                                    matchData.teams.splice(index, 0, team);
                                    count++;
                                    if (count > 1) {
                                      res.status(200).json(matchData);
                                    }
                                  })
                                  .catch((e) => {
                                    res.json({ 'status': 'error', 'error': e });
                                  })
                                  .error(console.error);
                              }(i));
                            }
                          } else {
                            res.status(200).json(matchData);
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
})

module.exports = router;