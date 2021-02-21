import { StoreContext } from './store';
import { ServerErrors } from './../models/serverErrors';
import { makeAutoObservable } from 'mobx';
import { useContext } from 'react';


export default class CommonStore {
    error: ServerErrors | null = null;
    token: string | null= null;
    appLoaded = false;


    constructor(){
        makeAutoObservable(this);
     
    }

    setServerError=(error: ServerErrors)=> {
        this.error= error;
    }
    setToken = (token :string | null)=>{
        if(token ) window.localStorage.setItem('jwt', token);
        this.token = token;
    }

    setApploaded = ()=> {
        this.appLoaded= true;
    }

}