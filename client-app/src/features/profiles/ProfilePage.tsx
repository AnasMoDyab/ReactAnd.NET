import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';
import '../../app/layout/styles.css';

export default observer(function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { profileStore } = useStore();
    const { loadingProfile, loadProfile, profile, setActiveTab } = profileStore;

    useEffect(() => {
        loadProfile(username);
        return () => {
            setActiveTab(0);
        }
    }, [loadProfile, username])

  

    if (loadingProfile) return <LoadingComponent content='Loading profile...' />

    return (
        <Grid stackable>
                {profile &&
                    <Grid.Row>
                        <Grid.Column computer={16} mobile={16}>
                             <ProfileHeader profile={profile} />
                        </Grid.Column>
                        <Grid.Column style={{marginTop:20}} computer={16} mobile={16}>
                             <ProfileContent profile={profile} />
                        </Grid.Column>
                    </Grid.Row>}
         
        </Grid>
    )
 })