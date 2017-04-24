export class Team {
    private _id: String;
    private _name: String;
    private _members: Array<any>;
    private _tournaments: Array<any>;

    constructor(id: String, name: String, members: Array<any>, tournaments: Array<any>) {
        this._id = id;
        this._name = name;
        this._members = members;
        this._tournaments = tournaments;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getMembers() {
        return this._members;
    }

    getTournaments() {
        return this._tournaments;
    }
}