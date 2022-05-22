import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Divider, Grid, Header, Item, Segment, Statistic } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import FollowButton from './FollowButton';

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({profile}: Props) {

    const { profileStore } = useStore();
    const { deleteProfile, isCurrentUser } = profileStore;
    const [target, setTarget] = useState('');

    function handleProfileDelete(event: SyntheticEvent<HTMLButtonElement>, username: string) {
        setTarget(event.currentTarget.value);
        deleteProfile(username);
        console.log('hej')
    }
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Followers' value={profile.followersCount} />
                        <Statistic label='Following' value={profile.followingCount} />
                    </Statistic.Group>
                    <Divider />
                    <FollowButton profile={profile} />
                    
                    {/* {isCurrentUser && (
                    <Button 
                    onClick={(e) => handleProfileDelete(e, profile.username)}
                    content='Delete Account'
                    color='red'
                    floated='right'
                    />)} */}
                </Grid.Column>
            </Grid>
        </Segment>
    )
}) 