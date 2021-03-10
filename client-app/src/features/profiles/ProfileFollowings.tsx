import React from 'react';
import {Tab, Grid, Header, Card} from "semantic-ui-react";
import ProfileCard from "./ProfileCard";
import {useStore} from "../../app/stores/store";
import { observer } from 'mobx-react-lite';

export default observer(function ProfileFollowings() {
    const {profileStore} = useStore();
    const {profile, followings, loadingFollowings, activeTab} = profileStore;


    return (
        <Tab.Pane loading={loadingFollowings}>
            <Grid stackable>
                <Grid.Column computer={16} mobile={10}>
                    <Header
                        floated='left'
                        icon='user'
                        content={activeTab===3 ? `People following ${profile!.displayName}` : `People ${profile?.displayName} follower` }
                    />
                </Grid.Column>
                <Grid.Column computer={16} mobile={10}>
                    <Card.Group >
                        {followings.map(profile => (
                            <ProfileCard key={profile.username} profile={profile} />
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})