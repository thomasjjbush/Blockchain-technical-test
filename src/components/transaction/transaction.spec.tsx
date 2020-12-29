import React from 'react';
import { shallow } from 'enzyme';
import { Transaction } from './transaction';
import { TransactionProps as Props } from '../../../types';

describe('Transaction', () => {
    const props: Props = {
        hash: 'hash',
        fee: 20,
        size: 50,
    };

    it('should match snapshot', () => {
        expect(shallow(<Transaction {...props} />)).toMatchSnapshot();
    });

    it('should highlight term if it is provided and exists inside hash', () => {
        const wrapper = shallow(<Transaction {...props} search="ash" />);
        expect(wrapper.find({ 'data-test-id': 'hash' }).find('span').text()).toBe('ash');
    });
});
