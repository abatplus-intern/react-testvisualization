import { shallow } from 'enzyme';
import { Frame } from './Frame';

test('renders the frame component', () => {
    const component = shallow(<Frame children={<></>} />);
    expect(component).toBeTruthy();
});
