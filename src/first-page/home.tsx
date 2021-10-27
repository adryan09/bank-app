import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { initCardsThunk, openAddNewCardScreen } from '../store/actions';
import { AppState } from '../store/reducer';
import { CardInfo } from '../add-new-card/add-new-card';
import { Card } from '../card/card';
import { ActionText, AddCardButton, FirstPageWrapper, GreetingTextWrapper, Title } from './styled-components';

interface HomeComponentStoreProps {
    readonly cards: CardInfo[];
    readonly openedCardScreen: boolean;
}

interface HomeComponentDispatchProps {
    readonly openAddNewCardScreen: typeof openAddNewCardScreen;
    readonly initCardsThunk: typeof initCardsThunk;
}

type HomeComponentProps = HomeComponentStoreProps & HomeComponentDispatchProps;

function HomeComponent(
    {
        openAddNewCardScreen,
        initCardsThunk,
        cards,
        openedCardScreen,
    }: HomeComponentProps
) {

    const handleClick = useCallback(() => {
        openAddNewCardScreen();
    },[openAddNewCardScreen]);

    useEffect(() => {
    }, [cards]);

    useEffect(() => {
        initCardsThunk();
    }, [initCardsThunk]);

    const renderCards = useCallback(() => {
        return cards.map((card: CardInfo) => (
            <Card
                userNameFieldValue={card.userNameFieldValue}
                cardNumberFieldValue={card.cardNumberFieldValue}
                expiryDate={card.expiryDate}
                cvc={card.cvc}
                editMode={false}
            />
        ))
    }, [cards]);

    return (
        <FirstPageWrapper dimBackground={openedCardScreen}>
            <GreetingTextWrapper>
                <Title>Your cards</Title>
                <ActionText>Add, edit or delete your cards any time</ActionText>
            </GreetingTextWrapper>
            {renderCards()}
            <AddCardButton cardsLength={cards.length} onClick={handleClick}>Add a new card</AddCardButton>
        </FirstPageWrapper>
    )
}

export const Home: React.ComponentType<{}> = connect<HomeComponentStoreProps, HomeComponentDispatchProps, {}, AppState>(
    (state: AppState) => {
        return {
            cards: state.cards,
            openedCardScreen: state.openCardScreen,
        }
    },
    {
        openAddNewCardScreen,
        initCardsThunk,
    },
)(HomeComponent);
