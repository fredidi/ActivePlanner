import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';

export default observer(function Homepage() {
    const { userStore } = useStore();

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    ReActivities Web
                </Header>
                {userStore.isLoggedIn ? (   //TRUE
                    <>
                        <Header as='h2' inverted content='Welcome to ReActivities' />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities!
                        </Button>
                    </>

                ) : (   //FALSE
                    <Button as={Link} to='/login' size='huge' inverted>
                        Login!
                    </Button>
                )}


            </Container>
        </Segment>
    )
})
