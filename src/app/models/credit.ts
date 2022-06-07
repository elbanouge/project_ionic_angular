import { User } from "./user";

export class Credit {
    public id: number;
    public capital: string;
    public duree: string;
    public taux: string;
    public mensualite: string;
    public minMensualite: string;
    public maxMensualite: string;
    public creditdate: string;
    public user: User;
    public processInstanceId: string;
    public taskId: string;
    public taskName: string;

    constructor() { }
}
