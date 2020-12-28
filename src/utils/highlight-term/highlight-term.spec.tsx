import React from 'react';
import { highlightTerm } from './highlight-term';

describe('highlightTerm', () => {
    it('should early return original string if no term is provided', () => {
        expect(highlightTerm('mock-term', '')).toBe('mock-term');
    });

    it('should wrap term inside span tag if it exists within string', () => {
        expect(highlightTerm('mock-term', 'term')).toEqual(['mock-', <span key="mock-termterm1">term</span>]);
    });
});
