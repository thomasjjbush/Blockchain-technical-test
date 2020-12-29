import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { SocketOptions } from '../../types';

export const useSocket = <T>(url: string, options?: SocketOptions<T>): void => {
    const { current: socket } = useRef(new WebSocket(url));
    const dispatch = useDispatch();

    useEffect(() => {
        socket.onclose = () => socket.send(JSON.stringify({ op: options.onClose }));
        socket.onerror = () => dispatch({ type: options.onError });
        socket.onopen = () => socket.send(JSON.stringify({ op: options.onOpen }));
        socket.onmessage = (e) => dispatch({ type: options.onMessage, payload: JSON.parse(e.data).x });

        return () => socket.close();
    }, []);
};
