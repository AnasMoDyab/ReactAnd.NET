import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { List, Header } from 'semantic-ui-react';



function App() {
const [activities, setActivities]= useState([]);

useEffect(()=> {
  axios.get('http://localhost:5000/api/activities')
  .then(response=> {
    console.log(response);
    setActivities(response.data);
  })

  console.log(activities);


},[]);



  return (
    <div>
      <Header 
      as='h2' icon='users' content='Reactactivities'
  
      />
        <List>
          {activities.map((activity:any)=> {
              return <List.Item key={activity.id}>
                {activity.title}
                </List.Item>
          })}

        </List>

    </div>
  );
}

export default App;
