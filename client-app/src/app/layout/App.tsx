import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { List, Header, Container } from 'semantic-ui-react';
import {Activity} from '../models/activity'
import NavBar from '../layout/NavBar'
import ActivityDashboard from '../../features/activities/dachboard/ActivityDashboard'


function App() {
const [activities, setActivities]= useState<Activity[]>([]); // pass type of activities to usestate<Activity[]> Activity is the interface
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
const [editMode, setEditMode]= useState(false);
const [openModel, setOpenModel] = React.useState(false)

useEffect(()=> {
  axios.get<Activity[]>('http://localhost:5000/api/activities')
  .then(response=> {
    console.log(response)
    setActivities(response.data);
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
      />

      </Container>
      
      

    </>
  );
}

export default App;
