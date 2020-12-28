import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MultiPageButtonsProps as Props, StyledProps } from './../../../types';

const Button = styled(Link)<StyledProps<{ $active?: boolean; disabled?: boolean }>>`
    background-color: ${({ $active, theme }): string => ($active ? theme.colors.brand : 'transparent')};
    color: ${({ $active, theme }): string => ($active ? 'white' : theme.colors.brand)};
    padding: 10px;
    text-decoration: none;

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

const Container = styled.div<StyledProps>`
    border: solid 2px ${({ theme }): string => theme.colors.offset};
    border-radius: 10px;
    display: inline-flex;
    margin-top: 30px;
    overflow: hidden;
`;

export const MultiPageButtons: FC<Props> = ({
    currentPage,
    numberOfButtons,
    numberOfPages,
    skip,
    to,
}: Props): ReactElement => {
    let firstButton = Math.max(currentPage - Math.floor(numberOfButtons / 2), 1);

    if (numberOfPages - firstButton < numberOfButtons - 1) {
        firstButton = firstButton - (numberOfButtons - 1 - (numberOfPages - firstButton));
    }

    return (
        <Container>
            {skip && (
                <Button data-test-id="skip" disabled={currentPage - skip < 1} to={to(currentPage - skip)}>
                    -{skip}
                </Button>
            )}
            {[...new Array(Math.min(numberOfButtons, numberOfPages))].map((_, i) => {
                const newPage = firstButton + i;
                return (
                    <Button data-test-id="button" $active={newPage === currentPage} key={newPage} to={to(newPage)}>
                        {newPage}
                    </Button>
                );
            })}
            {skip && (
                <Button data-test-id="skip" disabled={currentPage + skip > numberOfPages} to={to(currentPage + skip)}>
                    +{skip}
                </Button>
            )}
        </Container>
    );
};
