import { CardInfo } from './add-new-card/add-new-card';

export const setStorage = <T>(key: string, data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getStorage = <T>(key: string): T => {
    const value: string | null = localStorage.getItem(key);
    return value && JSON.parse(value);
};

export function storeCardToLocalStorage(card: CardInfo) {
    const storage: CardInfo[] = getStorage<CardInfo[]>('cardInfo') || [];
    setStorage<CardInfo[]>('cardInfo', [...storage, card]);
}

export function removeCardFromLocalStorages(card: CardInfo) {
    const storage: CardInfo[] = getStorage<CardInfo[]>('cardInfo') || [];
    const newStorage: CardInfo[] = storage.filter((localStorageCard: CardInfo) => localStorageCard.cvc !== card.cvc);
    setStorage<CardInfo[]>('cardInfo', [...newStorage]);
}
