import React from 'react';
import styled from 'styled-components';
import { FC, ReactElement } from 'react';
import { highlightTerm } from '../../utils/highlight-term/highlight-term';
import { StyledProps, TransactionProps as Props } from '../../../types';

const Hash = styled.h3<StyledProps>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    span {
        background-color: ${({ theme }): string => theme.colors.brand};
        color: white;
    }
`;

const Container = styled.div<StyledProps>`
    border-bottom: solid ${(props): string => props.theme.colors.offset};
`;

export const Transaction: FC<Props> = ({ fee, hash, search, size }: Props): ReactElement => {
    return (
        <Container>
            <Hash data-test-id="hash">Hash: {highlightTerm(hash, search)}</Hash>
            {fee && <h3>Fee: {fee}</h3>}
            {size && <h3>Size: {size}</h3>}
        </Container>
    );
};
