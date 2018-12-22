import React, { Component } from 'react';
import Hero from './Hero';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import MainMenu from './MainMenu';
import media from './components/media.js';

import styled from 'styled-components';

const Container = styled.div``;

const Grid = styled.div`
  display: grid;
  
  ${media.custom`
    grid-template-columns: 1fr;
    grid-template-areas:  "hero"
                          "about"
                          "contact"
                          "footer"
  `}
  grid-template-columns: 1fr 800px 1fr;
  grid-template-areas:  "hero hero hero"
                        ". about ."
                        ". contact ."
                        ". footer ."
`;

// The app component is responsible for the state of the menu.
// Waypoints in other Components update the state
// Menu button clicks scroll to the correct component

class App extends Component {
  constructor(props){
    super(props);
    this.onTopPassed = this.onTopPassed.bind(this);
    this.state = { activeItem: 'home', inverted: true };
  }


  onTopPassed(page){
    if (page === "home"){
      this.setState({ activeItem: page, inverted: true });
    } else {
      this.setState({ activeItem: page, inverted: false });
    }
  }

  render() {
    return (
      <Container>
        <MainMenu 
          handleClick={this.onItemClick} 
          activeItem={this.state.activeItem}
          inverted={this.state.inverted}
        ></MainMenu>
        <Grid>
          <Hero handleScroll={this.onTopPassed}></Hero>
        	<About handleScroll={this.onTopPassed}></About>
          <Contact handleScroll={this.onTopPassed}></Contact>
          <Footer></Footer>
        </Grid>
      </Container>
    );
  }
}

export default App;