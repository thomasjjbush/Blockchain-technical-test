import React, { FC, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SearchInput } from '../../components/input/input';

const Button = styled(Link)`
    background-color: ${(props): string => props.theme.colors.brand};
    border-radius: 5px;
    color: white;
    line-height: 30px;
    padding: 0 15px;
    margin-left: 10px;
`;

const Container = styled.nav`
    background-color: white;
    box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.3);
    display: flex;
    height: 50px;
    justify-content: center;
    padding: 10px;
`;

export const Nav: FC = (): ReactElement => {
    const [address, setAddress] = useState('');

    return (
        <Container>
            <SearchInput onChange={setAddress} placeholder="Enter Bitcoin address" value={address} />
            <Button data-test-id="go" to={`/address/${address}`}>
                Go!
            </Button>
        </Container>
    );
};
