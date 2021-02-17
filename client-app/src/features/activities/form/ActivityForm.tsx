import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Modal, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';




export default observer( function  ActivityForm(){

    const {activityStore} = useStore();
    const {selectedActivity,closeForm, modelOpen, modelClose,
         openModel, createActivity, updateActivity, loading}= activityStore;


    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    } 

    const [activity, setActivity]= useState(initialState);

    function handleSubmit(){
        activity.id ? updateActivity(activity) : createActivity(activity); 
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
            const {name, value}= event.target;
            setActivity({...activity, [name]: value})
    }

    return (
 

        <Modal
            onClose={modelClose}
            onOpen={modelOpen}
            open={openModel}
            size= 'tiny'
      >
        <Modal.Content >
            <Segment clearing>
                <Form onSubmit={handleSubmit} autoComplete="off">
                        <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                        <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                        <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                        <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                        <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                        <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />

                        <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
                        <Button onClick={closeForm} floated="right"  type="button"  content="Cancel"/>

                </Form>
            </Segment>
        </Modal.Content>
      </Modal>


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
    )
})