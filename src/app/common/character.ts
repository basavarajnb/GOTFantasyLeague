export class Character {
    id: string;
    name: string;
    level: number;
    img: string;
    // rank: string;
    // price: string;
    // rate: string;
    // points: any;
    // popularity: number;
}

export interface PointsForCharacter {
    leader: number;
    co_leader: number;
    hand: number;
    soldier1: number;
    soldier2: number;
    soldier3?: number;
    soldier4?: number;
    soldier5?: number;
    guest?: number;
}

export class CharacterPoints {
    characterId: string;
    characterName: string;
    characterPoints: string;
}

export interface Episodes {
    id: string;
    characterPoints: CharacterPoints[];
}


export class Level {
    level: number;
    maxPlayers: number;
    allPlayers: Array<any>;
    playersSelected: Array<any>;
}