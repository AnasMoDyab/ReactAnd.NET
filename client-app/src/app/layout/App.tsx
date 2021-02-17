import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { List, Header, Container } from 'semantic-ui-react';
import {Activity} from '../models/activity'
import NavBar from '../layout/NavBar'
import ActivityDashboard from '../../features/activities/dachboard/ActivityDashboard'


function App() {
const [activities, setActivities]= useState<Activity[]>([]); // pass type of activities to usestate<Activity[]> Activity is the interface

useEffect(()=> {
  axios.get<Activity[]>('http://localhost:5000/api/activities')
  .then(response=> {
    console.log(response)
    setActivities(response.data);
  })




},[]);



  return (
    <>
      <NavBar />

      <Container style={{marginTop: '7em'}}>
    <ActivityDashboard  activities={activities}/>

      </Container>
      
      

    </>
  );
}

export default App;
