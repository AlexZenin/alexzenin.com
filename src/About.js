import React from 'react';
import styled from 'styled-components';
import image from './images/alex-circle.png';
import Heading from './components/Heading';
import ContentContainer from './ContentContainer';

const Div = styled.article`
	grid-area: about;
	padding: 0px 30px;
`;

const Img = styled.img`
	height: 200px;
`;

function About(props){
	return (
		<Div>
			<ContentContainer name='about' handleScroll={props.handleScroll}>
				<Heading>About</Heading>
				<Img src={image}/>
	      		<p>
					<br />
		      		Alexander is an enthusiastic and hard-working student currently enrolled in the Bachelor of Informatics and Computation Advanced (Honours) at Monash University. Majoring in Computer Science and excelling in Science, Math and I.T., he is always looking to challenge himself and is interested in pursuing a career in Information Technology. Alexander is a reliable individual with a positive attitude and proven ability to work both autonomously and as part of a team. He is an avid basketball player having won the Victorian schools championship, with a strong interest in technology that has spanned the majority of his life.
		      		<br />
		      		<br />
		      		Alexander's specialties include python programming and web development, with his skills rapidly expanding.
	      		</p>
	      	</ContentContainer>
      	</Div>
	);
}

export default About