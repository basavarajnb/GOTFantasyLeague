export class User {
    id: string;
    name: string;
    pictureURL: string;
    email: string;
};

export class UserKingdom{
    leader: string;
    co_leader?: string;
    hand?: string;
    soldier1? : string;
    soldier2? : string;
    soldier3? : string;
    soldier4? : string;
    guest?: string;
};

export interface UserChosenCharacters {
    id: string;
    kingdom: UserKingdom;
};