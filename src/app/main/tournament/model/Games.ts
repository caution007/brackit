export class Games {
    private _gameList = [
        {id: 1, name: 'Counter-Strike: Global Offensive', searchText: 'counter-strike: global offensive'},
        {id: 2, name: 'League of Legends', searchText: 'league of legends'},
        {id: 3, name: 'Overwatch', searchText: 'overwatch'},
        {id: 4, name: 'Mount & Blade: Warband', searchText: 'mount & blade: warband'}
    ]

    public getGameList() {
        return this._gameList.sort();
    }
}