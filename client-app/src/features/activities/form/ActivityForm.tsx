import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Modal, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';




export default observer( function  ActivityForm(){
    const history= useHistory();
    const {activityStore} = useStore();
    const { modelOpen, modelClose,
         openModel, createActivity, updateActivity, loadActivity,loading, loadingInitial}= activityStore;
    const{id}= useParams<{id:string}>();

    const [activity, setActivity]= useState({
        id: '',
        title: '',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    });


    useEffect(()=> {
        if(id) loadActivity(id).then(activity => setActivity(activity!)) // activity! => '!' meean activity could be undefined
    }, [id, loadActivity])

    function handleSubmit(){
       if (activity.id.length === 0 ){ 
       let newActivity = {
           ...activity, 
           id: uuid()
       }
       createActivity(activity).then(()=>history.push(`/activities/${newActivity.id}`));
        } else {
        
        updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`)) ;
        }
}

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
            const {name, value}= event.target;
            setActivity({...activity, [name]: value})
    }

    if(loadingInitial) return <LoadingComponent content=" Loading app"/>

    return (
        <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />

                <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
                <Button as={Link} to="/activities"  floated="right"  type="button"  content="Cancel"/>

        </Form>
        </Segment>
/* 
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
      </Modal> */


           
    )
})