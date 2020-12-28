import React from 'react';
import { shallow } from 'enzyme';
import { SearchInput } from './input';
import { SearchInputProps as Props } from '../../../types';

describe('SearchInput', () => {
    let props: Props;

    beforeEach(() => {
        props = {
            onChange: jest.fn(),
            value: '',
        };
    });

    it('should match snapshot', () => {
        const wrapper = shallow(<SearchInput {...props} placeholder="placeholder" value="value" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should invoke onChange cb on input change', () => {
        const wrapper = shallow(<SearchInput {...props} />);
        wrapper.find({ 'data-test-id': 'search' }).prop('onChange')({ currentTarget: { value: 'howdy' } });

        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenCalledWith('howdy');
    });

    it('should disable clear button if value resolves to false', () => {
        const wrapper = shallow(<SearchInput {...props} />);
        expect(wrapper.find({ 'data-test-id': 'clear' }).prop('disabled')).toBe(true);

        wrapper.setProps({ value: 'something else' });
        expect(wrapper.find({ 'data-test-id': 'clear' }).prop('disabled')).toBe(false);
    });

    it('should invoke onChange cb with empty string on clear click', () => {
        const wrapper = shallow(<SearchInput {...props} />);
        wrapper.find({ 'data-test-id': 'clear' }).simulate('click');
        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenCalledWith('');
    });
});
