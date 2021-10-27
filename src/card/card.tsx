import React, { useCallback, useMemo } from 'react';
import { CardInfo } from '../add-new-card/add-new-card';
import { Icon } from '../icon/Icon';
import Edit from '../assets/edit-icon.svg';
import MasterCard from '../assets/mastercard-logo.svg';
import Visa from '../assets/visa-logo.svg';
import { connect } from 'react-redux';
import { AppState } from '../store/reducer';
import { triggerEdit } from '../store/actions';
import { CardNumber, CardElement, CvcExpiry, CvcExpiryLabel, CvcExpiryWrapper, Header, UserName } from './styled-components';

type CardComponentPublicProps = CardInfo & { readonly editMode: boolean };

interface CardComponentDispatchProps {
    readonly editCard: typeof triggerEdit;
}

type CardComponentProps = CardComponentPublicProps & CardComponentDispatchProps;

function CardComponent(
    {
        userNameFieldValue,
        cardNumberFieldValue,
        expiryDate,
        cvc,
        editMode,
        editCard,
    }: CardComponentProps
) {

    const cardType: string = useMemo(() => cardNumberFieldValue.charAt(0) === '4' ? 'visa' : 'masterCard', [cardNumberFieldValue])

    const triggerEditCard = useCallback(() => {
        editCard(cardNumberFieldValue);
    }, [editCard, cardNumberFieldValue])

    const renderCardNumber = useCallback(() => {
        return cardNumberFieldValue.split(' ').map((cardNumberPiece: string) => (
            <span style={{ 'marginRight': '15px' }}>{cardNumberPiece}</span>
        ));
    }, [cardNumberFieldValue]);

    return (
        <CardElement cardType={cardType}>
            <Header>
                <Icon src={cardType === 'masterCard' ? MasterCard : Visa} showIcon={true} scope='cardLogo' />
                <CvcExpiryWrapper>
                    <div style={{ 'marginRight': '16px'}}>
                        <CvcExpiryLabel cardType={cardType}>CVC</CvcExpiryLabel>
                        <CvcExpiry>{cvc}</CvcExpiry>
                    </div>
                    <div>
                        <CvcExpiryLabel cardType={cardType}>EXPIRES</CvcExpiryLabel>
                        <CvcExpiry>{expiryDate}</CvcExpiry>
                    </div>
                </CvcExpiryWrapper>
            </Header>
            <div style={{
                'marginTop': '83px',
                'fontSize': '14px'
            }}>
                <UserName>
                    {userNameFieldValue}
                </UserName>
                <div style={{
                    'display': 'flex',
                }}>
                    <CardNumber cardType={cardType}>
                        {renderCardNumber()}
                    </CardNumber>
                    {!editMode && <Icon src={Edit} showIcon={true} scope='cardEdit' onClick={triggerEditCard} />}
                </div>
            </div>
        </CardElement>
    );
}

export const Card: React.ComponentType<CardComponentPublicProps> = connect<{}, CardComponentDispatchProps, {}, AppState>(
  null,
    {
        editCard: triggerEdit,
    },
)(CardComponent);
