import { fetchData } from './fetch-data';

describe('fetchData', () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue('success') });
    });

    it('should invoke fetch with correct argument if only route is provided', async () => {
        await fetchData('mock-end-point');
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('https://blockchain.info/mock-end-point?cors=true');
    });

    it('should invoke fetch with correct argument if route and optional overrides are provided', async () => {
        await fetchData('mock-end-point', { foo: 1, bar: 2 });
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('https://blockchain.info/mock-end-point?cors=true&foo=1&bar=2');
    });

    it('should return correct response', async () => {
        expect(await fetchData('mock-end-point')).toEqual('success');
    });

    it('should not handle error internally', async () => {
        try {
            (global.fetch as jest.Mock).mockRejectedValue('failed');
            await fetchData('mock-end-point');
        } catch (err) {
            expect(err).toBe('failed');
        }
    });
});
