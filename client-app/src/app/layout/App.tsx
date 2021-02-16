import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { List, Header } from 'semantic-ui-react';
import {Activity} from '../models/activity'


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
    <div>
      <Header 
      as='h2' icon='users' content='Reactactivities'
  
      />
        <List>
          {activities.map(activity=> {
              return <List.Item key={activity.id}>
                {activity.title}
                </List.Item>
          })}

        </List>

    </div>
  );
}

export default App;
