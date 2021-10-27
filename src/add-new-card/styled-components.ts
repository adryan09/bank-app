import styled from 'styled-components';

export const ErrorElement = styled.div`
    color: #FC484C;
`;

type SubmitProps =  {
    readonly disabled: boolean;
    readonly edit: boolean;
}

export const Submit = styled.input<SubmitProps>`
  width: 80%;
  margin: 8% 10%;
  height: 51px;
  border-radius: 100px;
  background: ${props => props.disabled ? '#E5E5E5': '#4C00C2'};
  font-size: 16px;
  color: #FFFFFF;
  border: none;
`
interface DeleteButton {
    readonly clicked: boolean;
}
export const DeleteButton = styled.input<DeleteButton>`
  width: 80%;
  margin: 0% 10%;
  border-radius: 100px;
  background: #FFFFFF;
  margin-bottom: 56px;
  color: #E5E5E5;
  font-size: 16px;
  border: none;
  ${Submit}:hover & {
    display: none;
  }
`
export const FormWrapper = styled.div`
  position: absolute;
  z-index: 999;
  background: #FFFFFF;
  top: 15%;
  left: 0%;
  width: 100%;
  height: 100%;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

export const FormTitle = styled.div`
  font-size: 23px;
  font-weight: 900;
  padding-top: 56px;
  padding-left: 36px;
  padding-bottom: 37px;
`
export const Label = styled.div`
  font-weight: bold;
`;
