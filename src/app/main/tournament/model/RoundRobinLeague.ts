import { Tournament } from './Tournament';

import { TournamentType } from './TournamentType';
import { RegistrationType } from './RegistrationType';
import { FixtureSortType } from './FixtureSortType';
import { CompetitorType } from './CompetitorType';
import { MatchType } from './MatchType';

export class RoundRobinLeague extends Tournament{

    private _teams: Array<any>;

    constructor(id: String,
                name: String,
                type: TournamentType,
                registrationType: RegistrationType,
                fixtureSortType: FixtureSortType,
                competitorType: CompetitorType,
                includeDraws: Boolean,
                start: Date,
                matchType: MatchType,
                information: String,
                rules: String,
                started: Boolean,
                complete: Boolean,
                victor: JSON,
                owner: String,
                teamLimit: JSON,
                fixtureInterval: Number,
                game: String,
                points: JSON,
                teams: Array<any>) {
        super(id, 
            name, 
            type, 
            registrationType, 
            fixtureSortType, 
            competitorType, 
            includeDraws, 
            start, 
            matchType,
            information, 
            rules,
            started, 
            complete, 
            victor,
            owner,
            teamLimit,
            fixtureInterval,
            game,
            points);    
        this._teams = teams;
    }

    getTeams() {
        return this._teams;
    }

    getStandings() {
        let table = this._teams;
        
        table.sort((a, b) => {
            return b.points - a.points;
        });
        
        return table;
    }

}