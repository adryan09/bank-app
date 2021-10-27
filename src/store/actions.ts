import {
    ActionTypes,
    AddCardAction,
    AppThunk,
    CloseAddNewCardScreenAction,
    OpenAddNewCardScreenAction,
    RemoveCardAction,
    TriggerEditAction,
} from './constants';
import { CardInfo } from '../add-new-card/add-new-card';
import { Dispatch } from 'redux';
import { getStorage, removeCardFromLocalStorages, storeCardToLocalStorage } from '../storage';

export const openAddNewCardScreen = ():OpenAddNewCardScreenAction => {
    return {
        type: ActionTypes.OpenAddNewCardScreen,
    }
};

export const closeAddNewCardScren = ():CloseAddNewCardScreenAction => {
    return {
        type: ActionTypes.CloseAddNewCardScreen,
    }
};

export const triggerEdit = (cardNumber: string):TriggerEditAction => {
    return {
        type: ActionTypes.TriggerEdit,
        payload: {
            cardNumber
        }
    }
};

export const addNewCard = (cardInfo: CardInfo): AddCardAction => {
    return {
        type: ActionTypes.AddCard,
        payload: {
            cardInfo,
        }
    }
}

export const removeCard = (cardInfo: CardInfo): RemoveCardAction => {
    return {
        type: ActionTypes.RemoveCard,
        payload: {
            cardInfo,
        }
    }
}

export const addCardThunk = (card: CardInfo): AppThunk => {
    return (dispatch: Dispatch): void => {
        storeCardToLocalStorage(card);
        dispatch(addNewCard(card));
    }
}

export const removeCardThunk = (card: CardInfo): AppThunk => {
    return (dispatch: Dispatch): void => {
        removeCardFromLocalStorages(card);
        dispatch(removeCard(card));
    }
}

export const initCardsThunk = (): AppThunk => {
    return (dispatch: Dispatch): void => {
        const cards: CardInfo[] = getStorage<CardInfo[]>('cardInfo') || [];
        cards.forEach((card: CardInfo) => {
            dispatch(addNewCard(card))
        });
    }
}

