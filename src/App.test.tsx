import App from './App';
import { shallow } from 'enzyme';

test('renders the app', () => {
    const component = shallow(<App />);
    expect(component).toBeTruthy();
});
