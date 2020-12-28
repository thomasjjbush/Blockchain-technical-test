import React from 'react';
import { useSelector } from 'react-redux';
import { mount, shallow } from 'enzyme';
import Address from './address';
import { loadAddress } from './address.redux';
import { MultiPageButtons } from '../../components/multi-page-buttons/multi-page-buttons';
import { SearchInput } from '../../components/input/input';

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn().mockReturnValue({ search: 'page=2' }),
    useParams: jest.fn().mockReturnValue({ slug: 'slug' }),
}));

jest.mock('react-redux', () => ({
    useDispatch: jest.fn().mockReturnValue(jest.fn()),
    useSelector: jest.fn().mockReturnValue({ tx_per_page: 10 }),
}));

jest.mock('./address.redux', () => ({
    loadAddress: jest.fn().mockReturnValue({ type: 'MOCK_ACTION' }),
}));

jest.mock('../../components/multi-page-buttons/multi-page-buttons', () => ({
    MultiPageButtons: () => 'MultiPageButtons',
}));

describe('Address', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return loading text if no address data is available', () => {
        const wrapper = shallow(<Address />);
        expect(wrapper.find('p').text()).toBe('loading');
    });

    it('should render error text if there is an error', () => {
        (useSelector as jest.Mock).mockReturnValue({ error: true });
        const wrapper = shallow(<Address />);
        expect(wrapper.find('p').text()).toBe('error');
    });

    it('should invoke loadAddress action on mount', () => {
        mount(<Address />);
        expect(loadAddress).toHaveBeenCalledTimes(1);
        expect(loadAddress).toHaveBeenCalledWith('slug', 1);
    });

    describe('with data', () => {
        beforeEach(() => {
            (useSelector as jest.Mock).mockReturnValue({
                address: 'lordSouron',
                final_balance: 29,
                n_tx: 20,
                total_received: 55,
                total_sent: 33,
                tx_per_page: 10,
                txs: [
                    {
                        balance: 20,
                        fee: 10,
                        hash: '24423423',
                        result: 14916,
                        size: 300,
                        time: 112313,
                    },
                    {
                        balance: 20,
                        fee: 10,
                        hash: '24423423SEARCHABLE',
                        result: 14916,
                        size: 300,
                        time: 112313,
                    },
                ],
            });
        });

        it('should match snapshot', () => {
            expect(shallow(<Address />)).toMatchSnapshot();
        });

        it('should filter based on hash', () => {
            const wrapper = shallow(<Address />);
            expect(wrapper.find({ 'data-test-id': 'transaction' }).length).toBe(2);

            wrapper.find(SearchInput).prop('onChange')('SEARCHABLE');
            expect(wrapper.find({ 'data-test-id': 'transaction' }).length).toBe(1);
            expect(wrapper.find({ 'data-test-id': 'hash' }).find('span').text()).toBe('SEARCHABLE');
        });

        it('should pass the correct cb to multi page buttons component', () => {
            const wrapper = shallow(<Address />);
            expect(wrapper.find(MultiPageButtons).prop('to')(5)).toEqual({ search: '?page=5' });
        });
    });
});
