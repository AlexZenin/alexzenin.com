import React from 'react';
import styled from 'styled-components';
import image from './images/introBG.jpg';
import ContentContainer from './ContentContainer';
import media from './components/media.js';

const Image = styled.article`
	grid-area: hero;
	height: 100vh;
	width: 100vw;
	text-align: center;

	background-image: url(${image});
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	z-index: 1;
`;

const Caption = styled.div`
  position: absolute;
  left: 0;
  top: 25%;
  width: 100%;
  text-align: center;
  color: white;
`;

const Name = styled.p`
	font-size: 5em;
	text-transform: uppercase;
	font-weight: bold;
	${media.phone`
		font-size: 14vw;
	`}
`;

const Subtext = styled.p`
	font-size: 1.9em;
	margin: 5px;
`;

function Hero(props){
	return (
		<Image>
			<ContentContainer name="home" handleScroll={props.handleScroll} 
				hero>
				<Caption>
					<Name>
						Alexander Zenin
					</Name>
					<Subtext>
						IT Consultant <br />
						Based in Melbourne, Australia
					</Subtext>
				</Caption>
			</ContentContainer>
	    </Image>
	);
}

export default Hero