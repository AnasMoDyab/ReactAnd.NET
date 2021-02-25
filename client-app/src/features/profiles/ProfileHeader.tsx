import React from 'react';
import {Segment, Grid, Item, Header, Statistic, Divider, Reveal, Button} from 'semantic-ui-react'

export default function Profileheader(){


    return (
        <Segment> 
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avtar size='small' src={'/assets/user.png'}/>
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content='Displayname' />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Followers' value='5'/>
                        <Statistic label='Following' value='42'/>
                    </Statistic.Group>
                    <Divider />
                    <Reveal animated='move'>
                       <Reveal.Content visible style={{width:'100%'}}>
                        <Button fluid color='teal' content='Floowing' />
                        </Reveal.Content>  
                        <Reveal.Content hidden style={{width:'100%'}}>
                        <Button
                            fluid
                            basic
                            color={true ? 'red': 'green'} 
                            content={true ? 'Fllowing': 'Followers'}  />
                        </Reveal.Content>  
                    </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}