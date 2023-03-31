export class UserModel {
    constructor(
        public firstname:string, 
        public surname:string,
        public login:string,
        public password:string,
        public id: number,
        public patronymic?:string,
        public lead_id?: number) {}
}