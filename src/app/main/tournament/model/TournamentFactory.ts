import { Tournament } from './Tournament';
import { RoundRobinLeague } from './RoundRobinLeague';
import { EnumConverter } from '../../utilities/EnumConverter';
import { TournamentType } from './TournamentType';
import { RegistrationType } from './RegistrationType';
import { FixtureSortType } from './FixtureSortType';
import { CompetitorType } from './CompetitorType';

export class TournamentFactory {
    private _enumConverter: EnumConverter;
    private _tournament: Tournament;

    constructor() {
        this._enumConverter = new EnumConverter();
    }

    createTournament(tournJSON, tournTypeJSON, tournType) {
        switch(tournType) {
            case TournamentType.ROUNDROBINLEAGUE:
            this.roundRobin(tournJSON, tournTypeJSON);
            break;
        }
        return this._tournament;
    }

    private roundRobin(tournJSON, tournTypeJSON) {
        this._tournament = new RoundRobinLeague(
            tournJSON._id,
            tournJSON.name,
            this._enumConverter.tournamentTypeToEnum('' + tournJSON.type),
            this._enumConverter.registrationTypeToEnum('' + tournJSON.registrationType),
            this._enumConverter.fixtureSortTypeToEnum('' + tournJSON.fixtureSortType),
            this._enumConverter.competitorTypeToEnum('' + tournJSON.competitorType),
            tournJSON.includeDraws,
            tournJSON.start,
            this._enumConverter.matchTypeToEnum('' + tournJSON.matchType),
            tournJSON.information,
            tournJSON.rules,
            tournJSON.started,
            tournJSON.complete,
            tournJSON.victor,
            tournJSON.owner,
            tournJSON.teamLimit,
            tournJSON.fixtureInterval,
            tournJSON.game,
            tournJSON.points,
            tournTypeJSON[0].teams
        );
    }

}