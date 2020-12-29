import React, { FC, lazy, ReactElement, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { store } from '../../store/store';
import { Nav } from '../nav/nav';
import { StyledProps } from '../../../types';

const GlobalStyles = createGlobalStyle<StyledProps>`
    body {
        background-color: ${(props): string => props.theme.colors.offset};
        font-family: Sans-serif;
        margin: 0;

        * {
            box-sizing: border-box;
        }
    }
`;

const routes = [
    { component: lazy(() => import('./../address/address')), path: '/address/:slug' },
    { component: lazy(() => import('./../home/home')), path: '/' },
];

const theme = {
    colors: {
        brand: '#0C6CF2',
        offset: '#C0C0C0',
    },
};

export const App: FC = (): ReactElement => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Router>
                <Nav />
                <Suspense fallback={<div>Loading!</div>}>
                    <Switch>
                        {routes.map(({ component: Component, path }) => (
                            <Route exact key={path} path={path}>
                                <Component />
                            </Route>
                        ))}
                    </Switch>
                </Suspense>
            </Router>
        </ThemeProvider>
    </Provider>
);
