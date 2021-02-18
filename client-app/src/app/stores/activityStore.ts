import { Activity } from './../models/activity';
import { makeAutoObservable, runInAction} from 'mobx';
import agent from '../api/agent';



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

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                    this.setLoadingInitial(false);
                })
                
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setActivity = (activity:Activity )=> {
        activity.date= activity.date.split('T')[0];
        this.activityRegister.set(activity.id,activity );
    }

    private getActivity= (id: string)=> {
        return this.activityRegister.get(id);
    }

    setLoadingInitial = (state: boolean)=> {
        this.loadingInitial= state;
    }

    modelOpen = ()=>{
        this.openModel= true;
    }
    modelClose= ()=>{
        this.openModel= false;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegister.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
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
                    this.loading=false;


                })
        } catch (error){
            runInAction(()=> {
                    this.loading=false;
                    

                })
        }
    }

}