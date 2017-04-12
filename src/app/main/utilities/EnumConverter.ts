import { TournamentType } from '../tournament/model/TournamentType';
import { RegistrationType } from '../tournament/model/RegistrationType';
import { FixtureSortType } from '../tournament/model/FixtureSortType';
import { CompetitorType } from '../tournament/model/CompetitorType';
import { MatchType } from '../tournament/model/MatchType';

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
            case RegistrationType.SIGNUP:
                string = 'Signup';
        }

        return string;
    }

    registrationTypeToEnum(type) {
        let rt: RegistrationType;

        switch(type) {
            case 'List':
                rt = RegistrationType.LIST;
                break;
            case 'Signup':
                rt = RegistrationType.SIGNUP;
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
            case FixtureSortType.SEEDED:
                string = 'Seeded';
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
            case 'Seeded':
                fst = FixtureSortType.SEEDED;
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
            case CompetitorType.USER:
                string = 'User';
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
            case 'User':
                ct = CompetitorType.USER;
                break;
        }

        return ct;
    }

    matchTypeToString(type) {
        let string;

        switch(type) {
            case MatchType.BO1:
                string = 'bo1';
                break;
            case MatchType.BO3:
                string = 'bo3';
                break;
            case MatchType.BO5:
                string = 'bo5';
                break;
        }

        return string;
    }

    matchTypeToEnum(type) {
        let mt: MatchType;

        switch(type) {
            case 'bo1':
                mt = MatchType.BO1;
                break;
            case 'bo3':
                mt = MatchType.BO3;
                break;
            case 'bo5':
                mt = MatchType.BO5;
                break;
        }

        return mt;
    }
}