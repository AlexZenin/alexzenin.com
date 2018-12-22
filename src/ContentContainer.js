// Container for each of the components of the main page

import React, { Component } from 'react';
import styled from 'styled-components';
// Element allows us to scroll to that component on menu button click
import { Element } from 'react-scroll';
// Visibility provides callback when component comes into view to change
// 	the state to be reflected in the Menu
import { Visibility } from 'semantic-ui-react';

const StyledElement = styled(Element)`
	${ props => !props.hero && `
		padding-top: 200px; 
		text-align: center;
	`}

	${ props => props.hero && `
		height: 100%;
	`}
`;

const StyledVisibility = styled(Visibility)`
	${ props => props.hero && `
		height: 100%;
	`}
`;

// Make this into a component class for the 'onUpdate' function to work
class ContentContainer extends Component {
	constructor(props){
		super(props);
		this.handleMyScroll = this.handleMyScroll.bind(this);
		// `Boolean` evaluates `undefined` to `false`
		// ? 1 : 0 fixes the following styled components warning:
		// 	https://github.com/styled-components/styled-components/issues/1198
		this.hero = Boolean(this.props.hero)? 1 : 0;
	}

	handleMyScroll(e, { calculations }){
		// Could modify this function to act differently depending on the scroll
		//  direction
		if (calculations.topPassed && calculations.onScreen){
			this.props.handleScroll(this.props.name);
		}
	}

	render() {
		return(
			<StyledVisibility hero={this.hero} onUpdate={this.handleMyScroll}>
				<StyledElement hero={this.hero} name={this.props.name}>
					{this.props.children}
				</StyledElement>
			</StyledVisibility>
		);
	}
}

export default ContentContainer