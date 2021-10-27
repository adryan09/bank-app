import { ActionTypes, AddCardAction, AppAction, RemoveCardAction, TriggerEditAction } from './constants';
import { CardInfo } from '../add-new-card/add-new-card';

export interface AppState {
    readonly openCardScreen: boolean;
    readonly editCardScreen: boolean;
    readonly cards: CardInfo[];
    readonly editCardData: Record<string, boolean>;
}
const initialState: AppState = {
    openCardScreen: false,
    editCardScreen: false,
    cards: [],
    editCardData: {},
}
export function AppReducer(state: AppState = initialState, action: AppAction): AppState{
    switch (action.type) {

        case ActionTypes.OpenAddNewCardScreen: {
            return {
                ...state,
                openCardScreen: true,
                editCardScreen: false,
            }
        }

        case ActionTypes.RemoveCard: {
            const { payload: { cardInfo } } = action as RemoveCardAction;
            return {
                ...state,
                cards: state.cards.filter((card: CardInfo) => card !== cardInfo),
            }
        }

        case ActionTypes.CloseAddNewCardScreen: {
            return {
                ...state,
                openCardScreen: false,
                editCardScreen: false,
            }
        }

        case ActionTypes.TriggerEdit: {
            const { payload: { cardNumber } } = action as TriggerEditAction;

            return {
                ...state,
                editCardScreen: true,
                openCardScreen: false,
                editCardData: {
                    [cardNumber]: true,
                },
            }
        }

        case ActionTypes.AddCard: {
            const { payload: { cardInfo } } = action as AddCardAction;
            const found: boolean = !!state.cards.find((card: CardInfo) => cardInfo.cardNumberFieldValue === card.cardNumberFieldValue);
            const newCards = state.cards.map((card: CardInfo) => card.cardNumberFieldValue === cardInfo.cardNumberFieldValue ? cardInfo : card);

            return {
                ...state,
                cards: found ? newCards : [...state.cards, cardInfo],
            }
        }
        default:
            return state;
    }
};
