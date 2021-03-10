import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidbar';





export default observer( function ActivitDetails() {

const {activityStore} = useStore();
const {selectedActivity: activity, loadActivity, loadingInitial, clearSelectActivity}= activityStore;

  const {id} = useParams<{id: string}>();
  useEffect(()=> {
      if(id){
            loadActivity(id);
      }
      return ()=> clearSelectActivity();
  }, [id, loadActivity, clearSelectActivity]);

if(loadingInitial || !activity) return <LoadingComponent />;

    return (
        <Grid  container stackable>
            <Grid.Row columns={2}>
                 <Grid.Column computer={5} mobile={16}>
                     <ActivityDetailedSidebar activity={activity!} />
                </Grid.Column>
                <Grid.Column computer={10} mobile={16}>
                <ActivityDetailedHeader  activity={activity}/>
                    <ActivityDetailedInfo activity={activity} />
                    <ActivityDetailedChat activityId={activity.id} />
                    
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );


})