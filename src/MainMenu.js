import React, { Component } from 'react';
import { animateScroll as scroll, scroller } from 'react-scroll';
import CompactMenu from './components/menus/CompactMenu';
import FullMenu from './components/menus/FullMenu';

// Menu Items
const menuItems = ['about', 'contact'];

// ******************************
//          Component 
// ******************************

class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef();
    this.homeButtonClick = this.homeButtonClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.state = {
      expanded: false,
    };
  }


  // ******************************
  //     Handle Menu Buttons
  // ******************************

  // Scrolls to the top
  homeButtonClick(e, { name }) {
    scroll.scrollToTop();
  }

  // Scrolls to the anchor point with the corresponding name
  handleItemClick(e, { name }) {
    scroller.scrollTo(name, {
      duration: 1000,
      smooth: "easeInOutCubic",
      // Need offset of 1 so that it slightly goes past the hero sections and 
      //  the menu inverts the colours
      offset: 1
    });
    this.setState({expanded: false})
  }

  // Toggles the compact menu (expands and shrinks)
  toggleMenu = () => {
    this.setState((prevState) => {
      return {expanded: !prevState.expanded};
    });
  };

  // ****************
  //      Render 
  // ****************

  render() {
    const activeItem = this.props.activeItem;
    const inverted = this.props.inverted;

    return (
      <span>
        <FullMenu 
          inverted={inverted} 
          menuItems={menuItems} 
          activeItem={activeItem} 
          handleItemClick={this.handleItemClick} 
          homeButtonClick={this.homeButtonClick}
        />
        <CompactMenu 
          inverted={inverted} 
          expanded={this.state.expanded} 
          toggle={this.toggleMenu} 
          menuItems={menuItems} 
          activeItem={activeItem} 
          handleItemClick={this.handleItemClick}
        />
      </span>
    )
  }
}

export default MainMenu