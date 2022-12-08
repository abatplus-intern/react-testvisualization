import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { EndpointConfig } from '../src/configuration/configuration';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-intl', () => {
    const reactIntl = jest.requireActual('react-intl');
    const intlProvider = new reactIntl.IntlProvider(
        {
            locale: 'en',
            messages: [],
        },
        {}
    );
    return {
        ...reactIntl,
        useIntl: () => {
            return intlProvider.state.intl;
        },
    };
});

jest.mock(
    '../src/configuration/configuration',
    () =>
        ({
            env: {
                K8S_NAMESPACE: '',
                NAME: 'LOCAL',
                API_ENDPOINT: '',
                SERVICES_BASE_URL: 'http://localhost',
                THIRD_PARTY_SERVICE_BASE_URL: 'https://api.chucknorris.io',
            },
            name: 'TEST',
            settings: {},
        } as EndpointConfig)
);

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}));
