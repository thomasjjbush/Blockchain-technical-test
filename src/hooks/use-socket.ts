import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { SocketOptions } from '../../types';

export const useSocket = <T>(url: string, options?: SocketOptions<T>): void => {
    const socket = useRef<WebSocket>();
    const dispatch = useDispatch();

    useEffect(() => {
        socket.current = new WebSocket(url);

        socket.current.onclose = () => socket.current.send(JSON.stringify({ op: options.onClose }));
        socket.current.onopen = () => socket.current.send(JSON.stringify({ op: options.onOpen }));
        socket.current.onerror = () => dispatch({ type: options.onError });
        socket.current.onmessage = (e) => dispatch({ type: options.onMessage, payload: JSON.parse(e.data).x });

        return () => socket.current.close();
    }, []);
};
