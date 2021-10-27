import React from 'react';
import { AddNewCard, CardInfo } from '../add-new-card/add-new-card';
import { connect } from 'react-redux';
import { AppState } from '../store/reducer';

interface EditYourCardStoreProps {
    readonly card: CardInfo | undefined;
    readonly editCardScreen: boolean;
}
function EditYourCardComponent({ card, editCardScreen }: EditYourCardStoreProps) {
    if (!card && !editCardScreen) {
        return null;
    }

    return <AddNewCard card={card} editCardScreen={editCardScreen} />
}

export const EditCard: React.ComponentType<{}> = connect<EditYourCardStoreProps, {}, {}, AppState>(
    (state: AppState) => {
        const cardDataNumber: string = Object.keys(state.editCardData)[0];
        const card: CardInfo | undefined = state.cards.find((card: CardInfo) => card.cardNumberFieldValue === cardDataNumber);

        return {
            card,
            editCardScreen: state.editCardScreen,
        }
    },
)(EditYourCardComponent);
