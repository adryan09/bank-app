import { CardInfo } from '../add-new-card/add-new-card';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from './reducer';
import { AnyAction } from 'redux';

export enum ActionTypes {
    OpenAddNewCardScreen = 'OpenAddNewCardScreen',
    CloseAddNewCardScreen = 'CloseAddNewCardScreen',
    AddCard = 'AddCard',
    RemoveCard = 'RemoveCard',
    TriggerEdit = 'TriggerEdit',
}

export type AppAction<T = string,P = any> = {
    readonly type: T;
    readonly payload?: P;
}


export interface OpenAddNewCardScreenAction extends AppAction {
    readonly type: ActionTypes.OpenAddNewCardScreen;
}

export interface CloseAddNewCardScreenAction extends AppAction {
    readonly type: ActionTypes.CloseAddNewCardScreen;
}

export interface TriggerEditAction extends AppAction {
    readonly type: ActionTypes.TriggerEdit;
    readonly payload: {
        readonly cardNumber: string;
    }
}

export interface AddCardAction extends AppAction {
    readonly type: ActionTypes.AddCard;
    readonly payload: {
        cardInfo: CardInfo;
    }
}

export interface RemoveCardAction extends AppAction {
    readonly type: ActionTypes.RemoveCard;
    readonly payload: {
        cardInfo: CardInfo;
    }
}

export type AppDispatch = ThunkDispatch<AppState, void, AnyAction>;
export type AppThunk = (dispatch: AppDispatch, getState: () => AppState) => any;
export type GetAppState = () => AppState;
