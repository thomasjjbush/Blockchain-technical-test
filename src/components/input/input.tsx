import React, { ChangeEvent, FC, ReactElement } from 'react';
import styled from 'styled-components';
import { SearchInputProps as Props } from '../../../types';

const Container = styled.span`
    border: solid 2px ${(props): string => props.theme.colors.offset};
    border-radius: 5px;
    overflow: hidden;
`;

const Button = styled.button`
    border: none;
    height: 100%;
    padding: 0 10px;
`;

const Input = styled.input`
    border: none;
    height: 100%;
    padding: 0 10px;
`;

export const SearchInput: FC<Props> = ({ onChange, value, placeholder }: Props): ReactElement => {
    return (
        <Container>
            <Input
                data-test-id="search"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
                placeholder={placeholder}
                value={value}
                type="text"
            />
            <Button data-test-id="clear" disabled={!value} onClick={() => onChange('')}>
                x
            </Button>
        </Container>
    );
};
