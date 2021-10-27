import styled from 'styled-components';
import { FC, memo } from 'react';

export const FormFielsIcon = styled.img`
  position: absolute;
  top: 36px;
  right: 36px;
`
export const CardEditIcon = styled.img`
`;

export const CardLogo = styled.img`
  position: absolute;
  left: 6%;
`;

interface ImageScope {
    readonly formFields: boolean;
    readonly cardEdit: boolean;
    readonly cardLogo: boolean;
}

interface Icon {
    readonly showIcon: boolean;
    readonly src: string;
    readonly scope: keyof ImageScope;
    readonly onClick?: () => void;
}
export const Icon: FC<Icon> = memo((
    {
        src,
        showIcon,
        scope,
        onClick,
    }: Icon) => {
    if (!showIcon) {
        return null;
    }
    function getElement() {
        if (scope === 'formFields') {
            return FormFielsIcon;
        }

        if (scope === 'cardLogo') {
            return CardLogo;
        }

        return CardEditIcon

    }
    const Element = getElement();
    return (
        <>
            <Element src={src} onClick={onClick} />
        </>
    )
});
