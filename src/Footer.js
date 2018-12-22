import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
	padding: 200px 30px 0px 30px;
	grid-area: footer;
	text-align: center;
`;

const Grey = styled.p`
	color: #393A3B;
`;

function Contact(props){
	return(
		<Div>
			<Grey>
			Copyright &copy; Alexander Zenin 2018
			</Grey>
			<br />
		</Div>
	);
}

export default Contact