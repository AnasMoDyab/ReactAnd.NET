import { StoreContext } from './store';
import { ServerErrors } from './../models/serverErrors';
import { makeAutoObservable } from 'mobx';
import { useContext } from 'react';


export default class CommonStore {
    error: ServerErrors | null = null;


    constructor(){
        makeAutoObservable(this);
     
    }

    setServerError=(error: ServerErrors)=> {
        this.error= error;
    }

}