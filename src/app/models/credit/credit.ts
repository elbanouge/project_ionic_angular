import { UserData } from "../user/user-data";

export class Credit {
    public id:number;
    public capital: string;
    public duree: string;
    public taux: string;
    public mensualite: string;
    public minMensualite: string;
    public maxMensualite: string;
    public creditdate:string;
    public user:UserData;
    public processInstanceId:string;
    public taskId:string;
    public taskName:string;

    constructor(
        public c: string,
        public d: string,
        public m: string,
        public min:string,
        public max:string,
        public u:UserData,
        public p:string,
        public t:string,
        public tn:string,)
        {
            this.capital=c;
            this.duree=d;
            this.mensualite=m;
            this.minMensualite=min;
            this.maxMensualite=max;
            this.user=u;
            this.processInstanceId=p;
            this.taskId=t;
            this.taskName=tn;
            // new UserData( u.email,
            //     u.password,
            //     u.firstName,
            //     u.lastName,
            //     u.phone,
            //     u.cin,
            //     u.address,
            //     u. dateNai,
            //     u.sexe,
            //     u.nationalite,
            //     u.fonctionnaire,
            //     u.client,
            //     u.mensuel);
        }
}
/*
       
*/
