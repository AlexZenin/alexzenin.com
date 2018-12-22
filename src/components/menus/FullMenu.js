import React from 'react';
import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';
import media from '../media.js';

// Container that's fixed to the top to keep the menu there
const FixedContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 0px;
  ${media.phone`
    display: none;
  `}
  background-color: ${props => props.inverted ? 
    "none" : "rgba(255,255,255,0.95)"};
  z-index: 100;
`;
// Interestingly, the order of the elements above matters.
// If background-color is before the media query, the menu will overwrite
//  display:none once it is inverted.

// 2nd Container to position the menu to avoid modifying the Menu object's CSS
const Container = styled.div`
  max-width: 1170px;
  margin: 0px auto;
  padding: 8px 30px 0px 30px;
`;

// For some reason fixed={'top'} was stuffing up the borders and 
// hence the formatting. Needed to instead wrap in Div and 
// make the div fixed.
const fullmenu = (props) => (
	<FixedContainer inverted={props.inverted}>
    <Container>
        <Menu size={'huge'} secondary inverted={props.inverted} fluid>
          <div></div>
          <Menu.Item 
            name={'home'}
            content={'ALEXANDER ZENIN'}
            onClick={props.homeButtonClick}
          />
          <Menu.Menu position='right'>
            {props.menuItems.map(i => (
              <Menu.Item 
                key={i}
                name={i}
                active={props.activeItem === i}
                onClick={props.handleItemClick}
              />
            ))}
          </Menu.Menu>
        </Menu>
    </Container>
  </FixedContainer>
);

export default fullmenu;