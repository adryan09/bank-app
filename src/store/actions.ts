import { OpenAddNewCardScreenAction, CloseAddNewCardScreenAction, TriggerEditAction } from './actions';
import { AddCardAction, RemoveCardAction } from './cardActions';
import { AppThunk } from './thunks';
import { CardInfo } from '../add-new-card/add-new-card';
import { Dispatch } from 'redux';
import { getStorage, removeCardFromLocalStorages, storeCardToLocalStorage } from '../storage';

export const openAddNewCardScreen = (): OpenAddNewCardScreenAction => ({
    type: 'OPEN_ADD_NEW_CARD_SCREEN',
});

export const closeAddNewCardScreen = (): CloseAddNewCardScreenAction => ({
    type: 'CLOSE_ADD_NEW_CARD_SCREEN',
});

export const triggerEdit = (cardNumber: string): TriggerEditAction => ({
    type: 'TRIGGER_EDIT',
    payload: {
        cardNumber
    }
});

export const addNewCard = (cardInfo: CardInfo): AddCardAction => ({
    type: 'ADD_CARD',
    payload: {
        cardInfo,
    }
});

export const removeCard = (cardInfo: CardInfo): RemoveCardAction => ({
    type: 'REMOVE_CARD',
    payload: {
        cardInfo,
    }
});

export const addCardThunk = (card: CardInfo): AppThunk => 
    (dispatch: Dispatch): void => {
        storeCardToLocalStorage(card);
        dispatch(addNewCard(card));
    };

export const removeCardThunk = (card: CardInfo): AppThunk => 
    (dispatch: Dispatch): void => {
        removeCardFromLocalStorages(card);
        dispatch(removeCard(card));
    };

export const initCardsThunk = (): AppThunk => 
    (dispatch: Dispatch): void => {
        const cards: CardInfo[] = getStorage<CardInfo[]>('cardInfo') || [];
        cards.forEach((card: CardInfo) => {
            dispatch(addNewCard(card))
        });
    };
