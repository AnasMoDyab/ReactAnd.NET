import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from "./ActiviytList"
import ActivityDetails from '../../activities/details/ActivityDetails'
import ActivityForm from '../../activities/form/ActivityForm'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';






export default observer( function ActivityDashboard(){

        const {activityStore}= useStore();
        const {selectedActivity, editMode}= activityStore

    return (
        <Grid>
            <Grid.Column  reversed='mobile' width="15">
                <List>
                    < ActivityList  />
                </List>
            </Grid.Column>
            <Grid.Column >
                {selectedActivity &&  !editMode &&          
                <ActivityDetails  />
                    }
                {editMode && 

                <ActivityForm />
                 }
            </Grid.Column>


        </Grid>
    )
})