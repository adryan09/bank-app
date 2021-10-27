export const luhnCheck = (num: number) => {
    let arr = (num + '')
        .split('')
        .reverse()
        .map(x => parseInt(x));
    let lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce(
        (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val)),
        0
    );
    sum += lastDigit;
    return sum % 10 === 0;
};

export const dateCheck = (value: string): boolean => {
    const splitted: string[] = value.split('/');

    if (splitted.length !== 2) {
        return false;
    }

    if (splitted[0].indexOf('.') !== -1 || splitted[1].indexOf(',') !== -1) {
        return false;
    }

    const month: number = parseInt(splitted[0]);
    const day: number = parseInt(splitted[1]);

    if (isNaN(month) || isNaN(day)){
        return false;
    }

    return month > 0 && month <= 12 && day > 0 && day <= 31;
}

export function splitCardNumber(cardNumber: string): Array<any>{
    let mutableRef: Array<any>= [];
    for (let i=0; i< cardNumber.length; i+=4) {
        const arrayed = cardNumber.substring(i, i+4);
        mutableRef = [...mutableRef, [arrayed]]
    }
    return mutableRef;
}

export function getNewSplitedCardNumber(cardNumber: string): string {
    const result = splitCardNumber(cardNumber);
    let newCardNumber: string = '';

    result.forEach((intervalOfCardNumber: string[]) => {
        if (intervalOfCardNumber[0].length === 4) {
            newCardNumber = newCardNumber.concat(intervalOfCardNumber[0].concat(' '));
        }
    })
    return newCardNumber;
}
