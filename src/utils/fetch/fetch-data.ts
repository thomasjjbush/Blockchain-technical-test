import { FetchParams } from '../../../types';

export const fetchData = <T>(route: string, overrides?: FetchParams): Promise<T> => {
    const params: FetchParams = { cors: true, ...overrides };
    const queryParams = Object.keys(params).reduce((acc, key, i) => acc + `${i ? '&' : '?'}${key}=${params[key]}`, '');

    return fetch(`https://blockchain.info/${route}${queryParams}`).then((r) => r.json());
};
