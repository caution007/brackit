import { TournamentType } from './TournamentType';
import { RegistrationType } from './RegistrationType';
import { FixtureSortType } from './FixtureSortType';
import { CompetitorType } from './CompetitorType';

export class Tournament {

    private _id: String;
    private _name: String;
    private _type: TournamentType;
    private _registrationType: RegistrationType;
    private _fixtureSortType: FixtureSortType;
    private _competitorType: CompetitorType;
    private _includeDraws: Boolean;
    private _start: Date;
    private _matchType: String;
    private _information: String;
    private _rules: String;
    private _started: Boolean;
    private _complete: Boolean;
    private _victor: String;

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
                victor: String) {

        this._id = id;
        this._name = name;
        this._type = type;
        this._registrationType = registrationType;
        this._fixtureSortType = fixtureSortType;
        this._competitorType = competitorType;
        this._includeDraws = includeDraws;
        this._start = start;
        this._matchType = matchType;
        this._information = information;
        this._rules = rules;
        this._started = started;
        this._complete = complete;
        this._victor = victor;
    }
    
    getName() {
        return this._name;
    }

    getInformation() {
        return this._information;
    }

    getRules() {
        return this._rules;
    }
}