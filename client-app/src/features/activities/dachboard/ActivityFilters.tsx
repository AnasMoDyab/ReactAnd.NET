import { observer } from 'mobx-react-lite';
import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';
import { useStore } from '../../../app/stores/store';

export default observer (function ActivityFilters() {
    const {activityStore: {predicate, setPredicate}, commonStore} = useStore();

    return (
        <>
            <Menu vertical size='large'  className={commonStore.darkMode ? 'darkeMode items' : "" } style={{ width: '100%', marginTop: 25 }}>
                <Header className={commonStore.darkMode ? 'darkeMode' : "" } icon='filter' attached color='teal' content='Filters' />
                <Menu.Item
                    content='All Activites'
                   
                    active= {predicate.has('all')}
                    onClick={()=> setPredicate('all', 'true')} />
                <Menu.Item 
                    content="I'm going"
                    active= {predicate.has('isGoing')}
                    onClick={()=> setPredicate('isGoing', 'true')} />
                <Menu.Item
                    content="I'm hosting" 
                    active= {predicate.has('isHost')}
                    onClick={()=> setPredicate('isHost', 'true')} />
                </Menu>
            <Header />
            <Calendar 
                className={commonStore.darkMode ? 'darkeMode calander ' : "" }
                onChange={(date) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
            />
        </>
    )
})