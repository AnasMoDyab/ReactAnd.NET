import React from 'react';
import { Button, Card, Image, Modal } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';



interface Props {
    activity: Activity;
    cancelSelectActivity: ()=> void;
    openForm: (id: string)=> void;
    openModel: ()=> void;
    closeModel: ()=> void;
    modelOpen: boolean;

}


export default function ActivitDetails({activity, cancelSelectActivity, openForm, openModel, closeModel, modelOpen}:Props) {


    return (
        <Modal
        onClose={closeModel}
        onOpen={openModel}
        open={modelOpen}
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
                    <Button  onClick={cancelSelectActivity} basic color='grey' content='Cancel'/>
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


}