import { TournamentType } from './TournamentType';
import { RegistrationType } from './RegistrationType';
import { FixtureSortType } from './FixtureSortType';
import { CompetitorType } from './CompetitorType';
import { MatchType } from './MatchType';

export class Tournament {

    private _id: String;
    private _name: String;
    private _type: TournamentType;
    private _registrationType: RegistrationType;
    private _fixtureSortType: FixtureSortType;
    private _competitorType: CompetitorType;
    private _includeDraws: Boolean;
    private _start: Date;
    private _matchType: MatchType;
    private _information: String;
    private _rules: String;
    private _started: Boolean;
    private _complete: Boolean;
    private _victor: JSON;
    private _owner: String;
    private _teamLimit: JSON;
    private _fixtureInterval: Number;
    private _game: String;
    private _points: JSON;

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
                points: JSON) {

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
        this._owner = owner;
        this._teamLimit = teamLimit;
        this._fixtureInterval = fixtureInterval;
        this._game = game;
        this._points = points;
    }
    
    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getType() {
        return this._type;
    }

    getInformation() {
        return this._information;
    }

    getRules() {
        return this._rules;
    }

    getCompetitorType() {
        return this._competitorType;
    }

    getRegistrationType() {
        return this._registrationType;
    }

    getIncludeDraws() {
        return this._includeDraws;
    }

    getOwner() {
        return this._owner;
    }

    getStarted() {
        return this._started;
    }

    getGame() {
        return this._game;
    }

    getTeams() {
        return [];
    }

    getStandings() {}
}