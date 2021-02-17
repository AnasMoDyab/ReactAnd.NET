import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Card, Image, Modal } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';






export default observer( function ActivitDetails() {

const {activityStore} = useStore();
const {selectedActivity: activity, openForm,
     modelOpen, modelClose, openModel, cancelSelectedActivity}= activityStore;

  

if(!activity) return <LoadingComponent />;

    return (
        <Modal
        onClose={modelClose}
        onOpen={modelOpen}
        open={openModel}
        size= 'tiny'
      >
        <Modal.Content >
        <Card fluid >
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                   {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths="2" >
                    <Button onClick={()=> openForm(activity.id)}  basic color='blue' content='Edit'/>
                    <Button  onClick={cancelSelectedActivity} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
        </Modal.Content>
      
      </Modal>


  /*       <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                   {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths="2" >
                    <Button onClick={()=> openForm(activity.id)}  basic color='blue' content='Edit'/>
                    <Button  onClick={cancelSelectActivity} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card> */
    );


})