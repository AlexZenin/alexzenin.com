import React from 'react';
import styled from 'styled-components';
import Heading from './components/Heading.js';
import ContentContainer from './ContentContainer';

const Div = styled.div`
	grid-area: contact;
	padding: 0px 30px;
`;

function Contact(props){
	return(
		<Div>
			<ContentContainer name="contact" handleScroll={props.handleScroll}>
				<Heading>Contact</Heading>
				<p>
					<a href="https://au.linkedin.com/in/alexanderzenin">au.linkedin.com/in/alexanderzenin</a>
				</p>
			</ContentContainer>
		</Div>
	);
}

export default Contact