import React from 'react';
import { Grid } from 'semantic-ui-react';
import Profileheader from './ProfileHeader';
import ProfileContent from './ProfileConetn';



export default function ProfilePage(){

    return (
        <Grid>
            <Grid.Column width={16} >
                <Profileheader />
                <ProfileContent />
            </Grid.Column>
        </Grid>
    )
}