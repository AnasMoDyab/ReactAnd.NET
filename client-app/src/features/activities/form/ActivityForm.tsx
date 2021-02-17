import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Modal, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';


interface Props {

    activity: Activity | undefined;
    closeForm :  ()=> void; 
    openModel: ()=> void;
    closeModel: ()=> void;
    modelOpen: boolean;
}

export default function ActivityForm({activity: selectedActivity, closeForm, openModel, closeModel, modelOpen}: Props){


    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category:'',
        description:'',
        city:'',
        date:'',
        venue:''
    } 

    const [activity, setActivity]= useState(initialState);

    function handleSubmit(){

        console.log(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
            const {name, value}= event.target;
            setActivity({...activity, [name]: value})
    }

    return (
     /*    <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.TextArea placeholder='Description' />
                <Form.Input placeholder='Category' />
                <Form.Input placeholder='Date' />
                <Form.Input placeholder='City' />
                <Form.Input placeholder='Venue' />

                <Button floated="right" positive type="submit" content="Submit"/>
                <Button onClick={closeForm} floated="right"  type="button"  content="Cancel"/>

            </Form>
        </Segment> */

        <Modal
        onClose={closeModel}
        onOpen={openModel}
        open={modelOpen}
        size= 'tiny'
      >
        <Modal.Content >
            <Segment clearing>
                <Form onSubmit={handleSubmit} autoComplete="off">
                        <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                        <Form.TextArea placeholder='Description' value={activity.description} name='discriptaion' onChange={handleInputChange}/>
                        <Form.Input placeholder='Category' value={activity.category} name='caategory' onChange={handleInputChange}/>
                        <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                        <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                        <Form.Input placeholder='Venue' value={activity.venue} name='venu' onChange={handleInputChange} />

                        <Button floated="right" positive type="submit" content="Submit"/>
                        <Button onClick={closeForm} floated="right"  type="button"  content="Cancel"/>

                </Form>
            </Segment>
        </Modal.Content>
      </Modal>
    )
}