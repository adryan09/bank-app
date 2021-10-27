import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store/reducer';
import { Input } from '../input/input';
import { dateCheck, getNewSplitedCardNumber, luhnCheck } from '../utils';
import Success from '../assets/form-success.svg';
import Error from '../assets/form-error.svg';
import Close from '../assets/close.svg';
import { Icon } from '../icon/Icon';
import { addCardThunk, closeAddNewCardScren, removeCardThunk } from '../store/actions';
import { Card } from '../card/card';
import { FormWrapper, FormTitle, Submit, Label, DeleteButton, ErrorElement } from './styled-components';

enum ERROR {
    USER_NAME_FIELD ,
    CARD_NUMBER,
    EXPIRY_DATE,
    CVC,
}

interface FormFieldErrors {
    readonly usernameErrorText: string | null,
    readonly cardNumberErrorText: string | null,
    readonly expiryDateErrorText: string | null,
    readonly cvc: string | null,
}

const MapErrorTypeToText = {
    [ERROR.USER_NAME_FIELD]: 'Please fill in your name',
    [ERROR.CARD_NUMBER]: 'Please enter a valid card number',
    [ERROR.EXPIRY_DATE]: 'Please enter a valid expiry date',
    [ERROR.CVC]: 'Please enter a valid security code',
}

enum FieldType {
    USERNAME = 'username',
    CARD_NUMBER = 'cardnumber',
    EXPIRY_DATE = 'expirydate',
    CVC = 'cvc',
}

export interface CardInfo {
    readonly userNameFieldValue: string;
    readonly cardNumberFieldValue: string;
    readonly expiryDate: string;
    readonly cvc: string;
}

interface AddNewCardStoreProps {
    readonly openCardScreen: boolean;
}

interface AddNewCardDispatchProps {
    readonly addCard: typeof addCardThunk;
    readonly close: typeof closeAddNewCardScren;
    readonly removeCard: typeof removeCardThunk;
}

interface AddCardPublicProps {
    readonly card?: CardInfo;
    readonly editCardScreen?: boolean;
}

type AddNewCardComponentProps = AddNewCardDispatchProps & AddCardPublicProps & AddNewCardStoreProps;

function AddNewCardComponent({ addCard, card, close, removeCard, editCardScreen, openCardScreen }: AddNewCardComponentProps){
    const [fieldsValues, setFieldsValues] = useState<CardInfo>({
        userNameFieldValue: '',
        cardNumberFieldValue: '',
        expiryDate: '',
        cvc: '',
    });
    const [errors, setErrors] = useState<FormFieldErrors>({
        usernameErrorText: null,
        cardNumberErrorText: null,
        expiryDateErrorText: null,
        cvc: null,
    });
    const [disabled, setDisabled] = useState<boolean>(false);
    const [deleteCard, setDeleteCard] = useState<boolean>(false);

    useEffect(() => {
        if (editCardScreen && card) {
            setFieldsValues((prev: CardInfo) => {
                return {
                    ...prev,
                    cardNumberFieldValue: card.cardNumberFieldValue,
                    userNameFieldValue: card.userNameFieldValue,
                    cvc: card.cvc,
                    expiryDate: card.expiryDate,
                }
            })
        } else  {
            setFieldsValues((prev: CardInfo) => {
                return {
                    ...prev,
                    cardNumberFieldValue: '',
                    userNameFieldValue: '',
                    cvc: '',
                    expiryDate: '',
                }
            })
        }
    }, [card, editCardScreen]);

    useEffect(() => {
        const disabled: boolean =  Object.values(errors).some((errorValue: string | null) => {
            return errorValue === null || errorValue !== '';
        });
        if (disabled) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [errors])

    const onChange = useCallback((value: string, fieldType: string) => {
        if (fieldType === FieldType.USERNAME) {
            setFieldsValues({
                ...fieldsValues,
                userNameFieldValue: value,
            });
        }

        if (fieldType === FieldType.CARD_NUMBER) {
            setFieldsValues({
                ...fieldsValues,
                cardNumberFieldValue: value,
            });
        }

        if (fieldType === FieldType.EXPIRY_DATE) {
            setFieldsValues({
                ...fieldsValues,
                expiryDate: value,
            });
        }

        if (fieldType === FieldType.CVC) {
            setFieldsValues({
                ...fieldsValues,
                cvc: value,
            });
        }
    }, [fieldsValues]);

    const validateUserName = useCallback((): boolean => {
        const usernameElemenet = document.getElementsByName(FieldType.USERNAME)[0];
        if (fieldsValues.userNameFieldValue.length === 0) {
            setErrors({
                ...errors,
                usernameErrorText: MapErrorTypeToText[ERROR.USER_NAME_FIELD],
            });
            usernameElemenet.style.borderColor = '#FC484C';
            usernameElemenet.style.color = '#FC484C';
            return false;
        }
        setErrors({
            ...errors,
            usernameErrorText: '',
        });

        usernameElemenet.style.borderColor = '#19AC51';
        usernameElemenet.style.color = '#19AC51';
        return true;
    }, [errors, setErrors, fieldsValues]);


    const validateCardNumber = useCallback((cardNumber: string): boolean => {
        const isValid: boolean = luhnCheck(parseInt(cardNumber));
        const cardnumberElement = document.getElementsByName(FieldType.CARD_NUMBER)[0];
        if (!isValid) {
            setErrors((prev: FormFieldErrors) => ({
                ...prev,
                cardNumberErrorText: MapErrorTypeToText[ERROR.CARD_NUMBER],
            }))
            cardnumberElement.style.borderColor = '#FC484C';
            cardnumberElement.style.color = '#FC484C';
            return false;
        }

        setErrors((prev: FormFieldErrors) => ({
            ...prev,
            cardNumberErrorText: '',
        }));

        cardnumberElement.style.borderColor = '#19AC51';
        cardnumberElement.style.color = '#19AC51';
        return true;
    }, [setErrors]);

    const validateExpiryDate = useCallback((expiryDate: string) => {
        const isValid = dateCheck(expiryDate);
        const expirydateElement = document.getElementsByName(FieldType.EXPIRY_DATE)[0];
        if (!isValid) {
            setErrors((prev: FormFieldErrors) => ({
                ...prev,
                expiryDateErrorText: MapErrorTypeToText[ERROR.EXPIRY_DATE],
            }))
            expirydateElement.style.borderColor = '#FC484C';
            expirydateElement.style.color = '#FC484C';
            return false;
        }
        setErrors((prev: FormFieldErrors) => ({
            ...prev,
            expiryDateErrorText: '',
        }));

        expirydateElement.style.borderColor = '#19AC51';
        expirydateElement.style.color = '#19AC51';
        return true;
    }, [setErrors]);

    const validateCVC = useCallback((cvc: string) : boolean => {
        const cvcElement = document.getElementsByName(FieldType.CVC)[0];
        const regex: RegExp = /^[0-9]{3}$/;
        if (!regex.test(cvc)) {
            setErrors((prev: FormFieldErrors) => ({
                ...prev,
                cvc: MapErrorTypeToText[ERROR.CVC],
            }));

            cvcElement.style.borderColor = '#FC484C';
            cvcElement.style.color = '#FC484C';
            return false;
        }
        setErrors((prev: FormFieldErrors) => ({
            ...prev,
            cvc: '',
        }));

        cvcElement.style.borderColor = '#19AC51';
        cvcElement.style.color = '#19AC51';
        return true;
    }, [setErrors]);

    const handleOnBlur = useCallback(() => {
        validateUserName();
    }, [validateUserName]);

    const closeScreen = useCallback(() => {
        close();
    }, [close]);

    const handleOnBlurCardNumberField = useCallback(() => {
        setFieldsValues((prev) => {
            return {
                ...prev,
                cardNumberFieldValue: getNewSplitedCardNumber(fieldsValues.cardNumberFieldValue)
            }
        })
        validateCardNumber(fieldsValues.cardNumberFieldValue);
    }, [setFieldsValues, fieldsValues, validateCardNumber]);

    const handleOnBlurExpiryDateField = useCallback(() => {
        validateExpiryDate(fieldsValues.expiryDate);
    }, [validateExpiryDate, fieldsValues]);

    const renderTitle = useCallback(() => {
        return card && editCardScreen ? (
                <div>
                    Edit your card
                </div>
            )
            : (
                <div>
                    Add your card details
                </div>
            );
    }, [card, editCardScreen]);

    const handleOnBlurCvcField = useCallback(() => {
        validateCVC(fieldsValues.cvc);
    }, [validateCVC, fieldsValues]);

    const handleDelete = useCallback(() => {
        removeCard(card!)
        closeScreen();
    }, [removeCard, card, closeScreen]);

    if (!openCardScreen && !editCardScreen) {
        return null;
    }

    return (
        <FormWrapper>
            <FormTitle>
                <div>
                    <Icon
                        showIcon={true}
                        src={Close}
                        scope='formFields'
                        onClick={closeScreen}
                    />
                    {renderTitle()}
                </div>
            </FormTitle>
            <div>
                {card && editCardScreen && <Card {...card} editMode={true} />}
            </div>
        <form
            onSubmit={(event) => {
                    const {
                        userNameFieldValue,
                        cardNumberFieldValue,
                        expiryDate,
                        cvc,
                    } = fieldsValues;

                    addCard({
                        userNameFieldValue,
                        cardNumberFieldValue,
                        expiryDate,
                        cvc,
                    });
                }}>
                <div style={{ position: 'relative', padding: '16px 40px', 'fontSize': '12px'}}>
                    <Label>Name in card</Label>
                    <Input
                        value={fieldsValues.userNameFieldValue}
                        onChange={onChange}
                        onBlur={handleOnBlur}
                        name='username'
                        placeholder='John Doe'
                    />
                    {errors?.usernameErrorText === ''
                        ? <Icon
                            src={Success}
                            showIcon={errors?.usernameErrorText === ''}
                            scope='formFields'
                        />
                        : <Icon
                            src={Error}
                            showIcon={errors?.usernameErrorText !== '' && errors?.usernameErrorText !== null}
                            scope='formFields'
                        />
                    }
                    {errors?.usernameErrorText && <ErrorElement>{errors.usernameErrorText}</ErrorElement>}
                </div>
                <div style={{ position: 'relative', padding: '16px 40px', 'fontSize': '12px'}}>
                    <Label>Card number</Label>
                    <Input
                        value={fieldsValues.cardNumberFieldValue}
                        onChange={onChange}
                        name='cardnumber'
                        placeholder='0000 0000 0000 0000'
                        onBlur={handleOnBlurCardNumberField}
                    />
                    {errors?.cardNumberErrorText === ''
                        ? <Icon
                            src={Success}
                            showIcon={errors?.cardNumberErrorText === ''}
                            scope='formFields'
                        />
                        : <Icon
                            src={Error}
                            showIcon={errors?.cardNumberErrorText !== '' && errors?.cardNumberErrorText !== null}
                            scope='formFields'
                        />
                    }
                    {errors?.cardNumberErrorText && <ErrorElement>{errors.cardNumberErrorText}</ErrorElement>}
                </div>
                <div style={{ position: 'relative', padding: '16px 40px', 'fontSize': '12px'}}>
                    <Label>Expiry date</Label>
                    <Input
                        value={fieldsValues.expiryDate}
                        name='expirydate'
                        onChange={onChange}
                        placeholder='00/00'
                        onBlur={handleOnBlurExpiryDateField}
                    />
                    {errors?.expiryDateErrorText === ''
                        ? <Icon
                            src={Success}
                            showIcon={errors?.expiryDateErrorText === ''}
                            scope='formFields'
                        />
                        : <Icon
                            src={Error}
                            showIcon={errors?.expiryDateErrorText !== '' && errors?.expiryDateErrorText !== null}
                            scope='formFields'
                        />
                    }
                    {errors?.expiryDateErrorText && <ErrorElement>{errors.expiryDateErrorText}</ErrorElement>}
                </div>
                <div style={{ position: 'relative', padding: '16px 40px', 'fontSize': '12px'}}>
                    <label>CVC(Security Code)</label>
                    <Input
                        value={fieldsValues.cvc}
                        name='cvc'
                        onChange={onChange}
                        placeholder='000'
                        onBlur={handleOnBlurCvcField}
                    />
                    {errors?.cvc === ''
                        ? <Icon
                            src={Success}
                            showIcon={errors?.cvc === ''}
                            scope='formFields'
                        />
                        : <Icon
                            src={Error}
                            showIcon={errors?.cvc !== '' && errors?.cvc !== null}
                            scope='formFields'
                        />
                    }
                    {errors?.cvc && <ErrorElement>{errors.cvc}</ErrorElement>}
                </div>
                <Submit
                    type="submit"
                    value="Confirm"
                    name='submit'
                    edit={!!card}
                    disabled={(card ? false : disabled)}
                />
            {card && editCardScreen && <DeleteButton
                type="submit"
                value="Delete"
                name="submit"
                onMouseEnter={() => {
                    setDeleteCard(true);
                }}
                onClick={handleDelete}
                clicked={deleteCard}
            />}
            </form>
        </FormWrapper>
    );
}

export const AddNewCard: React.ComponentType<AddCardPublicProps> = connect<AddNewCardStoreProps, AddNewCardDispatchProps, {}, AppState>(
(state: AppState) => {
    return {
        openCardScreen: state.openCardScreen,
    }
},
    {
        addCard: addCardThunk,
        close: closeAddNewCardScren,
        removeCard: removeCardThunk,
    },
)(AddNewCardComponent);
