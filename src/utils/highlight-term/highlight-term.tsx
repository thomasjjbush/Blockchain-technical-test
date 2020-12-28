import React from 'react';

export const highlightTerm = (string: string, term: string): string | (JSX.Element | string)[] => {
    if (!term) return string;

    return string
        .split(new RegExp(`(${term})`, 'gi'))
        .map((part, i) => (part === term ? <span key={string + part + i}>{part}</span> : part))
        .filter(Boolean);
};
