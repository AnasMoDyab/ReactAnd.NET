import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from "./ActiviytList"
import ActivityDetails from '../../activities/details/ActivityDetails'
import ActivityForm from '../../activities/form/ActivityForm'



interface Props{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id:string)=> void;
    cancelSelectActivity: ()=> void;
    editMode: boolean;
    openForm: (id: string)=> void;
    closeForm: ()=> void;
    openModel: ()=> void;
    closeModel: ()=> void;
    modelOpen: boolean;
    createOrEdit: (activity: Activity)=> void;
    deleteActivity: (id:string) => void;
}



export default function ActivityDashboard({activities, selectActivity,
     selectedActivity, cancelSelectActivity, editMode, openForm,
      closeForm, openModel, closeModel, modelOpen, createOrEdit, deleteActivity}: Props){

    return (
        <Grid>
            <Grid.Column  reversed='mobile' width="15">
                <List>
                    < ActivityList 
                        activities={activities}
                        selectActivity={selectActivity} 
                        deleteActivity={deleteActivity}
                          />
                </List>
            </Grid.Column>
            <Grid.Column >
                {selectedActivity &&  !editMode &&
                
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity}
                    openForm={openForm}
                    openModel={openModel}
                    closeModel={closeModel}
                    modelOpen= {modelOpen}

                
                />}
                {editMode && 

                <ActivityForm 
                    activity={selectedActivity}
                    closeForm={closeForm}
                    openModel={openModel}
                    closeModel={closeModel}
                    modelOpen= {modelOpen}
                    createOrEdit={createOrEdit}
                
                />
                 }
            </Grid.Column>


        </Grid>
    )
}