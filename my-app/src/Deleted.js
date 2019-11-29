import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {BrowserRouter as Router,Route,
    Redirect,Switch} from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = () => (
  <Container text>
    <Header
      as='h1'
      content='Group18-IOT Project'
      inverted
      style={{
        fontSize:  '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop:  '3em',
      }}
    />
    <Header
      as='h2'
      content='Happy Everyday'
      inverted
      style={{
        fontSize: '2em',
        fontWeight: 'normal',
        marginTop:  '0.7em',
      }}
    />
    <Button primary size='huge'>
      Show Graph
      <Icon name='right arrow' />
    </Button>
  </Container>
)




class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'

            style={{ minHeight: 500, padding: '1em 0em'}}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>Home</Menu.Item>
                <Menu.Item as='a'>Demo</Menu.Item>
                <Menu.Item as='a'>About Us</Menu.Item>
                <Menu.Item as='a'>Challenges</Menu.Item>
                <Menu.Item as='a'>Record</Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}





const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>

  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}
/*
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
             "Header#1"
            </Header>
            <p style={{ fontSize: '1.33em' }}>You can add whatever you want</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Header#2"
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    */

const HomepageLayout = () => (
  
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle' >
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
            Motivation
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            For industrial production and for those who demand high air quality to maintain their respiratory health, monitoring air quality is important for their safety. 
            However, the air quality index cannot reflect the immediate air conditions exposed to users. They can neither browse the history of air quality index and analyze air quality pattern in their rooms.
            It is also valuable to connect air quality monitor with network. 
            The problem of air pollution in life is not alone in a certain area. It is often the result of a combination of air problems in various regions. 
            If we want to deal with air pollution, we need to understand the impact of air quality changes in each region on other regions. 
            In the past, air detection systems in each region were scarce, remote, and not interconnected, and it was difficult to obtain data from all regions at the same time.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
            Project Description and Approach
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            We apply ESP8266 development board, integrated with Wi-Fi module, connected to air quality and location sensor. 
            The product can show real time sensing data with LCD display and send data to server via HTTP requests as long as ESP8266 is connected with Wi-Fi or personal hotspot.
             We use AWS cloud server, Node.js as web server to process HTTP requests and responses, and MongoDB to store sensing data. 
             Finally, we analyze data on the cloud, and we may apply machine learning with machine learning libraries or APIs to predict future air quality. 
             The uses can access data analysis and prediction on the cloud with web browser.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='/images/wireframe/white-image.png' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>


    <Segment style={{ padding: '1em 0em' }} vertical>
      <Container text>

        <Header as='h3' style={{ fontSize: '2em' }}>
        Hardware 
        </Header>
        <Image bordered rounded size='large' src='/images/wireframe/white-image.png' />


      </Container>
    </Segment>
  </ResponsiveContainer>

)

export {HomepageLayout, Heading}
