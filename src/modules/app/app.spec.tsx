import React from 'react';
import { shallow } from 'enzyme';
import { App } from './app';

jest.mock('react', () => ({ ...jest.requireActual('react'), lazy: jest.fn(() => 'Component') }));

describe('App', () => {
    it('should match snapshot', () => {
        expect(shallow(<App />)).toMatchSnapshot();
    });
});
