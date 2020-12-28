import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from './nav';
import { SearchInput } from '../../components/input/input';

describe('Nav', () => {
    it('should match snapshot', () => {
        expect(shallow(<Nav />)).toMatchSnapshot();
    });

    it('should update address on input change', () => {
        const wrapper = shallow(<Nav />);
        expect(wrapper.find({ 'data-test-id': 'go' }).prop('to')).toBe('/address/');

        wrapper.find(SearchInput).prop('onChange')('888');
        expect(wrapper.find({ 'data-test-id': 'go' }).prop('to')).toBe('/address/888');
    });
});
