import { Game } from "src/app/game/model/Game";
import { Client } from "src/app/client/model/Client";

export class Loan {
    id: number;
    game: Game;
    client: Client;
    ffinitDate: Date;
    ffendDate: Date;
    initDate: string;
    endDate: string;

}
