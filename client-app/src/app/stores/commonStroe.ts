import { StoreContext } from './store';
import { ServerErrors } from './../models/serverErrors';
import { makeAutoObservable, reaction } from 'mobx';
import { useContext } from 'react';


export default class CommonStore {
    error: ServerErrors | null = null;
    token: string | null= window.localStorage.getItem('jwt');
    appLoaded = false;
    darkMode = false;


    constructor(){
        makeAutoObservable(this);
        
        reaction(
            ()=> this.token,
            token => 
             {
                 if(token){
                     window.localStorage.setItem('jwt', token);
                 }else {
                     window.localStorage.removeItem('jwt')
                 }
             }
        )
     
    }

    setServerError=(error: ServerErrors)=> {
        this.error= error;
    }
    setToken = (token :string | null)=>{
        this.token = token;
    }

    setApploaded = ()=> {
        this.appLoaded= true;
    }
    setDarkMode= ()=> {
        this.darkMode= !this.darkMode;
    }

}