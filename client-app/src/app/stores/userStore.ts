import { User, UserFormValue } from '../models/user';
import {makeAutoObservable, runInAction} from 'mobx'
import agent from '../api/agent';
import { store } from './store';
import { history } from '../..';


export default class UserStore {
    user: User | null = null;

    constructor (){
            makeAutoObservable(this);
    }

    getIsloggin(){
        return !!this.user;
    }

    login = async (creds: UserFormValue) => 
    {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(()=> {
                this.user=user;
            })
            history.push('/activities');
           
        } catch (error) {
            throw error;
        }
    }

    logout = ()=> {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user=null;
        history.push('/')
    }
}
