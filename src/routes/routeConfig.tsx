import MainRoute from './MainRoute';
import { nameof } from '@plusng/react-common-components';
import I18nTexts from '../common/i18n/I18nTextsCommon';
import { Routes } from './routes';
import Main from '../components/Main';
import Testquadrant from '../components/Testquadrant';

export interface RouteConfigEx {
    /**
     * @type {string}
     */
    name: Routes;
    /**
     * @type {string}
     *
     * e.g. '/test3/:paramId', with optional parameter '/test3/:paramId?'
     */
    path: string;
    /**
     * @type {React.ComponentType<any>}
     */
    getComponent: () => React.ReactElement;

    /**
     * @type {string}
     */
    displayName: string;
    /**
     * Subroutes
     *
     * @type {RouteConfigEx[]}
     */
    routes?: RouteConfigEx[];
}

const routes: RouteConfigEx[] = [
    {
        getComponent: () => (
            <MainRoute>
                <Testquadrant />
            </MainRoute>
        ),
        name: Routes.testquadrant,
        path: '/testquadrant',
        displayName: nameof<I18nTexts>('app_title'),
    },
    {
        getComponent: () => (
            <MainRoute>
                <Main />
            </MainRoute>
        ),
        name: Routes.home,
        path: '/',
        displayName: nameof<I18nTexts>('app_title'),
    },
];

export default routes;
