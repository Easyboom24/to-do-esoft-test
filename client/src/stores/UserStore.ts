import { makeAutoObservable } from "mobx";
import { IUser } from "../types/types";

export default class UserStore {
    private _isAuth: Boolean;
    private _user: IUser;

    constructor() {
        this._isAuth = false;
        this._user = {} as IUser;
        makeAutoObservable(this)
    }

    setAuth(bool: Boolean) {
        this._isAuth = bool;
    }

    setUser(user: IUser) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }
}