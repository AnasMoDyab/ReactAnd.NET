import { Activity } from './../models/activity';
import { makeAutoObservable, runInAction} from 'mobx';
import agent from '../api/agent';
import {v4 as uuid} from 'uuid';


export default class ActivityStore{
    activityRegister = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode= false;
    loading= false;
    loadingInitial= true;
    openModel= false;
    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){ // sort array of activities
        return  Array.from(this.activityRegister.values()).sort((a, b)=> 
            Date.parse(a.date)- Date.parse(b.date));
    }

    loadActivities = async ()=> {
         
        try {
            const activities = await agent.Activities.list()
           
                activities.forEach(activity => {
                    activity.date= activity.date.split('T')[0];
                   this.activityRegister.set(activity.id,activity );
                  })
               
                  this.setLoadingInitial(false); 
          
        }catch (error) {
            console.log(error);
            this.setLoadingInitial(false); 
        }
    }

    setLoadingInitial = (state: boolean)=> {
        this.loadingInitial= state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegister.get(id);
        this.modelOpen();
        console.log("selected", this.openModel);
     
    }

    cancelSelectedActivity= ()=> {
        this.selectedActivity= undefined;
    }
    openForm = (id?: string)=> {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
      
        this.editMode=true;
       
    }

    closeForm = ()=> {
        this.editMode=false
    }
    modelOpen = ()=>{
        this.openModel= true;
    }
    modelClose= ()=>{
        this.openModel= false;
    }

    createActivity = async (activity: Activity)=> {
        this.loading= true; 
        activity.id= uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(()=> {
                this.activityRegister.set(activity.id, activity);
                this.selectedActivity= activity;
                this.editMode= false;
                this.loading=false;
            })

        }catch(error) {
            console.log(error)
            runInAction(()=> {
                this.loading=false;
            })

        }
    }
    updateActivity = async (activity: Activity)=> {
        this.loading = true; 
        try{
            await agent.Activities.update(activity);
            runInAction(()=> {
                this.activityRegister.set(activity.id, activity);
                this.selectedActivity=activity;
                this.editMode= false;
                this.loading= false;

            })
        
        }catch (error) {
        console.log(error);

        runInAction(()=> {
            this.loading= false;

        })
        }
    }

    deleteActivity= async(id: string)=> {
        this.loading=true;
        try {
                await agent.Activities.delete(id);
                runInAction(()=> {
                    this.activityRegister.delete(id);
                    if(this.selectedActivity?.id ===id) this.cancelSelectedActivity();
                    this.loading=false;


                })
        } catch (error){
            runInAction(()=> {
                    this.loading=false;
                    

                })
        }
    }

}