import React from 'react';
import styled from 'styled-components';
import media from '../media';
import Burger from './Burger';

const Menu = styled.div`
	position: fixed;
  width: 100vw;
  top: 0px;
  display: none;
  height: ${props => props.expanded? "100vh" : "57px"};
  background-color: ${props => props.expanded? "black" : "rgba(0, 0, 0, 0.8)"};
  z-index: 1000;
  transition: background-color 0.3s ease-in-out, height 0.3s ease-in-out;

  ${media.phone`
  	display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  `}

  overflow: hidden;
`;

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 15px;
  min-height: 57px;
  color: white;
  align-items: center;
`;

const Items = styled.ul`
  list-style-type: none;
  padding-left: 20px
`;

const Item = styled.li`
  text-decoration: none;
  margin: 50px 0px;
  padding: 10px 0px;
  font-size: 5em;
  color: ${props => props.active? 'white' : '#aaa'};
  :first-letter {
    text-transform:capitalize;
  }
  :hover {
    cursor: pointer;
  }
`;

const compactMenu = (props) => (
	<Menu {...props}>
		<Bar>
			<Burger 
				toggle={props.toggle} 
				expanded={props.expanded}
			/>
		</Bar>
		<Items>
      {props.menuItems.map(i => (
        <Item 
          key={i}
          name={i}
          active={props.activeItem === i}
          onClick={(e) => props.handleItemClick(e, { name: i })}
        > {i} </Item>
      ))}
		</Items>
	</Menu>
);

export default compactMenu;