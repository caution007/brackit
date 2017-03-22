import { Tournament } from './Tournament';

import { TournamentType } from './TournamentType';
import { RegistrationType } from './RegistrationType';
import { FixtureSortType } from './FixtureSortType';
import { CompetitorType } from './CompetitorType';

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
                matchType: String,
                information: String,
                rules: String,
                started: Boolean,
                complete: Boolean,
                victor: String,
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
            victor);    
        this._teams = teams;
    }

}