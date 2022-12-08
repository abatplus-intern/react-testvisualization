import { shallow } from 'enzyme';
import { Loading } from './Loading';

test('renders the Loading component', () => {
    const component = shallow(<Loading />);
    expect(component).toBeTruthy();
});
