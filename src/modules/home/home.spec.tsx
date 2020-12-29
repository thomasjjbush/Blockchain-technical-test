import React from 'react';
import { shallow } from 'enzyme';
import { useSocket } from '../../hooks/use-socket';
import Home from './home';

jest.mock('react-redux', () => ({
    useSelector: jest.fn().mockReturnValue({ latest_transactions: [{ hash: 'hash', size: 20 }] }),
}));

jest.mock('../../hooks/use-socket');

describe('Home', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should match snapshot', () => {
        expect(shallow(<Home />)).toMatchSnapshot();
    });

    it('should invoke useSocket hook with correct arguments', () => {
        shallow(<Home />);
        expect(useSocket).toHaveBeenCalledTimes(1);
        expect(useSocket).toHaveBeenCalledWith('wss://ws.blockchain.info/inv', {
            onClose: 'unconfirmed_unsub',
            onError: 'home/ERROR',
            onMessage: 'home/LATEST_TRANSACTION',
            onOpen: 'unconfirmed_sub',
        });
    });
});
