import styled from 'styled-components';
import ShapeVisa from '../assets/card-visa-background-shape.svg';
import ShapeMasterCard from '../assets/card-background-shape.svg';

type CardElement = {
    readonly cardType: string;
}
export const CardElement = styled.div<CardElement>`
  border: 1px solid;
  background: ${props => props.cardType === 'visa' ? '#00cccc': '#4C00C2'};
  color: #FFFFFF;
  border-radius: 15px;
  height: 198px;
  margin: 30px;
  font-size: 10px;
  background-size: 314px 214px;
  background-image: url(${props => props.cardType === 'visa' ? ShapeVisa : ShapeMasterCard})};
`
export const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
  position: relative;
`
type CvcExpiryLabel = {
    readonly cardType: string;
}
export const CvcExpiryLabel = styled.span<CvcExpiryLabel>`
  display: block;
  color: ${props => props.cardType === 'masterCard' ? '#D3D8E1': '#798291'};
  font-weight: bold;
`;
export const CvcExpiry = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

export const UserName = styled.div`
  margin-left: 18px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
`;
type CardNumber =  {
    readonly cardType: string;
}
export const CardNumber = styled.div<CardNumber>`
  margin-right: 50px;
  margin-left: 19px;
  color: ${props => props.cardType === 'masterCard' ? '#D3D8E1': '#798291'};
  font-weight: bold;
`;

export const CvcExpiryWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 8%;
`;
