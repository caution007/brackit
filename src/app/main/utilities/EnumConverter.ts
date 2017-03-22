import { TournamentType } from '../tournament/model/TournamentType';
import { RegistrationType } from '../tournament/model/RegistrationType';
import { FixtureSortType } from '../tournament/model/FixtureSortType';
import { CompetitorType } from '../tournament/model/CompetitorType';

export class EnumConverter {

    tournamentTypeToString(type) {
        let string;

        switch(type) {
            case TournamentType.ROUNDROBINLEAGUE:
                string = 'Round Robin';
                break;
        }

        return string;
    }

    tournamentTypeToEnum(type) {
        let tt: TournamentType;

        switch(type) {
            case 'Round Robin':
                tt = TournamentType.ROUNDROBINLEAGUE;
                break;
        }

        return tt;
    }

    registrationTypeToString(type) {
        let string;

        switch(type) {
            case RegistrationType.LIST:
                string = 'List';
                break;
        }

        return string;
    }

    registrationTypeToEnum(type) {
        let rt: RegistrationType;

        switch(type) {
            case 'List':
                rt = RegistrationType.LIST;
                break;
        }

        return rt;
    }

    fixtureSortTypeToString(type) {
        let string;

        switch(type) {
            case FixtureSortType.RANDOM:
                string = 'Random';
                break;
        }

        return string;
    }

    fixtureSortTypeToEnum(type) {
        let fst: FixtureSortType;

        switch(type) {
            case 'Random':
                fst = FixtureSortType.RANDOM;
                break;
        }

        return fst;
    }

    competitorTypeToString(type) {
        let string;

        switch(type) {
            case CompetitorType.TEAM:
                string = 'Team';
                break;
        }

        return string;
    }

    competitorTypeToEnum(type) {
        let ct: CompetitorType;

        switch(type) {
            case 'Team':
                ct = CompetitorType.TEAM;
                break;
        }

        return ct;
    }
}