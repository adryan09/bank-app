import React, { FC, memo, useCallback } from 'react';
import styled from 'styled-components';

const InputElement = styled.input`
  width: 100%;
  margin: 8px 0;
  border: none;
  border-bottom: 1px solid #000000;
  outline: none;
  box-shadow: none;
  border-color: #E5E5E5
`

interface InputPublicProps {
    readonly onChange?: (value: string, fieldType: string) => unknown;
    readonly value: string;
    readonly onBlur: () => void;
    readonly name: string;
    readonly placeholder: string;
}
export const Input: FC<InputPublicProps> = memo((
    {
        onChange,
        value,
        onBlur,
        name,
        placeholder,
    }: InputPublicProps
) => {
    const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value, name);
    }, [onChange, name]);

    const handleOnBlur = useCallback(() => {
        onBlur();
    }, [onBlur]);

    const eventsListeners: Record<string, (event: any) => void> = {
        onChange: handleOnChange,
        onBlur: handleOnBlur,
    }

    return (
        <InputElement
            placeholder={placeholder}
            value={value}
            name={name}
            {...eventsListeners}
        />
    )
})
