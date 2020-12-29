import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Json } from 'enzyme-to-json';
import HtmlWebPackPlugin from 'html-webpack-plugin';

export type Action = ThunkAction<Promise<AnyAction> | AnyAction, Store, unknown, AnyAction>;

export interface Address {
    address?: string;
    error?: boolean;
    final_balance?: number;
    hash160?: string;
    n_tx?: number;
    total_received?: number;
    total_sent?: number;
    tx_per_page: number;
    txs?: Txs[];
}

export enum AddressActions {
    ERROR = 'address/ERROR',
    LOADED = 'address/LOADED',
}

export type Dispatch = ThunkDispatch<Store, void, AnyAction>;

export type FetchParams = Record<string, boolean | number | string>;

export interface Home {
    error?: boolean;
    latest_transactions: Txs[];
}

export enum HomeActions {
    ERROR = 'home/ERROR',
    LATEST_TRANSACTION = 'home/LATEST_TRANSACTION',
}

export interface MultiPageButtonsProps {
    currentPage: number;
    numberOfButtons: number;
    numberOfPages: number;
    skip?: number;
    to: (i: number) => Partial<Location>;
}

export interface SearchInputProps {
    onChange: (text: string) => void;
    placeholder?: string;
    value: string;
}

export interface SerializerMap extends Json {
    node: {
        type: {
            componentStyle?: {
                baseStyle?: {
                    rules: (string | ((props: StyledProps) => string))[];
                };
                rules: (string | ((props: StyledProps) => string))[];
            };
        };
    };
}

export interface SocketOptions<T> {
    onClose: string;
    onError: T;
    onMessage: T;
    onOpen: string;
}

export interface Store {
    address: Address;
    home: Home;
}

export type StyledProps<Props = {}> = { theme: Theme } & Props;

export interface Theme {
    colors: {
        brand: string;
        offset: string;
    };
}

export interface TransactionProps extends Partial<Txs> {
    search?: string;
}

export interface Txs {
    balance: number;
    fee: number;
    hash: string;
    result: number;
    size: number;
}

export interface WebpackConfig {
    devServer: { historyApiFallback: boolean; hot: boolean; open: boolean };
    entry: string[];
    mode: string;
    module: {
        rules: WebpackRule[];
    };
    output: { path?: string; publicPath: string };
    plugins: HtmlWebPackPlugin[];
    resolve: { extensions: string[] };
}

interface WebpackRule {
    exclude?: (RegExp | string)[];
    test: RegExp;
    use: {
        loader: string;
        options?: { plugins: string[] };
    };
}
