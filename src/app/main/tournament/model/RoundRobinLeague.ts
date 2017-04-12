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
                victor: String,
                owner: String,
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
            owner);    
        this._teams = teams;
    }

    getTeams() {
        return this._teams;
    }

    getStandings() {
        let table = [this._teams[0]];

        for (let i = 1 ; i < this._teams.length  ; i++) {
            for (let l = 0 ; l < table.length ; l++) {
                if (this._teams[i].points > table[l].points) {
                    table.splice(l, 0, this._teams[i]);
                    break;
                }
            }
        }
        
        return table;
    }

}