import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Container } from 'semantic-ui-react';
import {Activity} from '../models/activity'
import NavBar from '../layout/NavBar'
import ActivityDashboard from '../../features/activities/dachboard/ActivityDashboard'
import {v4 as uuid} from 'uuid';
import agent from '../api/agent'
import LoadingComponent from '../layout/LoadingComponent'

function App() {
const [activities, setActivities]= useState<Activity[]>([]); // pass type of activities to usestate<Activity[]> Activity is the interface
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
const [editMode, setEditMode]= useState(false);
const [openModel, setOpenModel] = React.useState(false)
const [loading, setLoading]= useState(true);
const [submitting, setSubmitting]= useState(false);
useEffect(()=> {
  agent.Activities.list()
  .then(response=> {
    let activities: Activity[]=[];
    response.forEach(activity => {
      activity.date= activity.date.split('T')[0];
      activities.push(activity);
    })
    setActivities(activities);
    setLoading(false);
  })

},[]);

 function handleSelectActivity(id: string){
   setSelectedActivity(activities.find(x=>x.id===id));
   handleModelOpen();
 }

 function handleCancelSelectActivity(){
   setSelectedActivity(undefined)
 }


 function handleFormOpen(id?: string){
   id ? handleSelectActivity(id) : handleCancelSelectActivity();
   setEditMode(true);
 }

 function handleFormClose (){
   setEditMode(false);
 }

 function handleModelOpen(){
      setOpenModel(true);
 }

 function handleModelClose(){
   setOpenModel(false)
}

function handleCreateOrEditActivity(activity: Activity){
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=> {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    } else {
        activity.id= uuid();
        agent.Activities.create(activity).then(()=> {
          setActivities([...activities, activity]);
          setEditMode(false);
          setSelectedActivity(activity);
          setSubmitting(false);
          
        })
    }
}

function handleDeleteActivity(id: string){
  setSubmitting(true);
  agent.Activities.delete(id).then(()=> {
    setSubmitting(false);
  })
  setActivities([...activities.filter(x=> x.id !==id)])
}

    if(loading) return <LoadingComponent content= 'Loading app' />


  return (
    <>
      <NavBar  openForm={handleFormOpen}/>

      <Container style={{marginTop: '7em'}}>
      <ActivityDashboard 
      activities={activities}
      selectedActivity={selectedActivity}
      selectActivity={handleSelectActivity}
      cancelSelectActivity= {handleCancelSelectActivity}
      editMode={editMode}
      openForm = {handleFormOpen}
      closeForm={handleFormClose}
      openModel={handleModelOpen}
      closeModel= {handleModelClose}
      modelOpen={openModel}
      createOrEdit={handleCreateOrEditActivity}
      deleteActivity= {handleDeleteActivity}
      submitting= {submitting}
      />

      </Container>
      
      

    </>
  );
}

export default App;
