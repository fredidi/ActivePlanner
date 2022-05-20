import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Card, Grid, Header, Tab } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store'
import ProfileCard from './ProfileCard';

export default observer(function ProfileFollowings() {
    const {profileStore} = useStore();
    const {profile, followings, loadFollowings, loadingFollowings, activeTab} = profileStore

    // useEffect(() => {
    //     loadFollowings('following');
    // }, [loadFollowings])

    return (
        <Tab.Pane loading={loadingFollowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' 
                    icon='user' 
                    content={activeTab === 3 ? `People following ${profile?.displayName}` : `People ${profile?.displayName} is following`} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>
                        {followings.map(profile => (
                            <ProfileCard key={profile.username} profile={profile} />
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})
