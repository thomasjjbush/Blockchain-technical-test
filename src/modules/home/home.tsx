import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Home, HomeActions, Store, StyledProps } from '../../../types';
import { Transaction } from '../../components/transaction/transaction';
import { useSocket } from '../../hooks/use-socket';

const Title = styled.h1<StyledProps>`
    color: ${({ theme }) => theme.colors.brand};
`;

const Transactions = styled.div<StyledProps>`
    background-color: white;
    padding: 30px;
    margin: 30px;
`;

const Home: FC = (): ReactElement => {
    const { error, latest_transactions } = useSelector<Store, Home>((state) => state.home);

    useSocket<HomeActions>('wss://ws.blockchain.info/inv', {
        onClose: 'unconfirmed_unsub',
        onError: HomeActions.ERROR,
        onMessage: HomeActions.LATEST_TRANSACTION,
        onOpen: 'unconfirmed_sub',
    });

    if (error) return <p>error</p>;
    return (
        <Transactions>
            <Title>Latest unconfirmed transactions</Title>
            {latest_transactions.map(({ hash, size }) => (
                <Transaction key={hash} hash={hash} size={size} />
            ))}
        </Transactions>
    );
};

export default Home;
