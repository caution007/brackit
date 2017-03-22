function generateFixtures() {
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
}