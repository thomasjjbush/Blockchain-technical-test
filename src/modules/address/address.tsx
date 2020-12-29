import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { loadAddress } from './address.redux';
import { MultiPageButtons } from '../../components/multi-page-buttons/multi-page-buttons';
import { SearchInput } from '../../components/input/input';
import { Address, Store, StyledProps } from '../../../types';
import { Transaction } from '../../components/transaction/transaction';

const Block = styled.div`
    background-color: white;
    margin-bottom: 30px;
    padding: 30px;

    &:last-of-type {
        margin-bottom: 0;
    }
`;

const Container = styled.div`
    max-width: 1024px;
    margin: auto;
    padding: 30px;
`;

const Title = styled.h1<StyledProps>`
    color: ${(props): string => props.theme.colors.brand};
    margin: 0;
`;

const Address: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const address = useSelector<Store, Address>((state) => state.address);
    const page = Math.max(Number(new URLSearchParams(useLocation().search).get('page')), 1);
    const { slug } = useParams<{ slug: string }>();
    const [search, setSearch] = useState('');

    const changePage = useCallback((i: number): Partial<Location> => ({ search: `?page=${i}` }), []);

    useEffect(() => {
        setSearch('');
        dispatch(loadAddress(slug, page - 1));
    }, [page, slug]);

    if (address.error) return <p>error</p>;
    if (!address.address) return <p>loading</p>;

    const numberOfPages = Math.floor(address.n_tx / address.tx_per_page);

    return (
        <Container>
            <Block>
                <Title>Address</Title>
                <p>Transactions: {address.n_tx}</p>
                <p>Total received: {address.total_received}</p>
                <p>Total sent: {address.total_sent}</p>
                <p>Final Balance: {address.final_balance}</p>
            </Block>
            <Block>
                <Title>
                    Transactions (Page {page}/{numberOfPages})
                </Title>
                <SearchInput onChange={setSearch} placeholder="Filter by hash" value={search} />
                {address.txs
                    .filter(({ hash }) => hash.includes(search))
                    .map(({ fee, hash }) => (
                        <Transaction key={hash} fee={fee} hash={hash} search={search} />
                    ))}
                <MultiPageButtons
                    currentPage={page}
                    numberOfButtons={5}
                    numberOfPages={numberOfPages}
                    skip={10}
                    to={changePage}
                />
            </Block>
        </Container>
    );
};

export default Address;
