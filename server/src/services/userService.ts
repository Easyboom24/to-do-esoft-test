import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../../.env` });
import {db} from "../db/db"; 
import {hash} from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import { UserResponsibleType } from "../typing/types";

export const generateToken = (id: string, login: string) => {
    return jwt.sign(
        {id,login},
        process.env.SECRET_KEY as Secret,
        {expiresIn:'24h'}
    )
}
    
class UserService {
    public async createUser(model: UserModel) {
        const {firstname, surname, patronymic, login, password, lead_id} = model;
        const hashedPassword = await hash(password,10);
        const [idAndLogin] = await db<UserModel>('users').insert(
            {
                firstname: firstname,
                surname: surname,
                patronymic: patronymic,
                login: login,
                lead_id: lead_id,
                password: hashedPassword
            },
            ['id','login']
        );
        const id: string = String(idAndLogin.id);
        const token = generateToken(id, idAndLogin.login);
        return token;
    }

    public async findUserByLogin(login: string) {
        return await db<UserModel>('users').select().where('login',login).first();
    }

    public async fundUserById(id:number) {
        return await db<UserModel>('users').select().where('id',id).first();
    }

    public async isLead(userId: number) {
        const leadCount = await db('users').select().where('lead_id',userId).count().first();
        const count = leadCount as {count:string};
        
        if(Number(count.count))
            return true;
        else
            return false;
    }

    public async getResponsibles(userId:number, fio:string) {
        const listResponsibles = await db.raw(`
            select id, firstname, surname, patronymic 
            from users where (id=${userId} OR lead_id=${userId})
            AND LOWER(CONCAT(surname,' ',firstname,' ',patronymic)) 
            LIKE '%${fio.toLowerCase()}%';
        `)
        return listResponsibles.rows;
    }
}

export default new UserService();
