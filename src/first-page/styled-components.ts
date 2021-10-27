import styled from 'styled-components';

export const GreetingTextWrapper = styled.div`
  padding-top: 70px;
  padding-left: 32px;
  padding-bottom: 32px;
`;

export const Title = styled.div`
  color: #3B058E;
  font-size: 30px;
  font-weight: 900;
`;

export const ActionText = styled.div`
  color: #798291;
  font-weight: bold;
  font-size: 12px;
`
type AddCardButton = {
    readonly cardsLength: number;
}
export const AddCardButton = styled.button<AddCardButton>`
  position: absolute;
  bottom: 4%;
  width: 80%;
  margin: 8% 10%;
  height: 51px;
  border-radius: 100px;
  background: #4C00C2;
  font-size: 16px;
  color: #FFFFFF;
  border: none;
`;
type FirstPageWrapper =  {
    readonly dimBackground: boolean;
}
export const FirstPageWrapper = styled.div<FirstPageWrapper>`
  height: 100vh;
  background: ${props => props.dimBackground ? '#798291': '#E5E5E5'};
`;
