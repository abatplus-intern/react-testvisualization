import { shallow } from 'enzyme';
import { ChucknorrisData } from './ChuckNorrisJoke';
import Main from './Main';
import { mockUseQuery } from '../common/rest/testHelpers';

test('renders the main component', () => {
    const chuckNorrisMockData = { value: 'Unit Test Chuck Norris joke' } as ChucknorrisData;
    mockUseQuery(chuckNorrisMockData);
    const component = shallow(<Main />);
    expect(component).toBeTruthy();
});
