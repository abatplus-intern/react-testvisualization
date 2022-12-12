import App from './App';
import { shallow } from 'enzyme';
import React from 'react';

test('renders the app', () => {
    const component = shallow(<App />);
    expect(component).toBeTruthy();
});
