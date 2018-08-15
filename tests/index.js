import React from 'react';
import { mount } from 'enzyme';
import NetworkInformation from '../src';

global.navigator = {};

class Dumb extends React.Component {
  render(){ 
    return `rtt ${this.props.rtt}`
  };
}

describe('NetworkInformation', () => {
  beforeEach(() => {
    global.navigator.connection = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      rtt: 100
    }
  })

  it('it should be able to wrap a React Component and pass the NetworkInfo props', () => {
    const wrapper = mount(<NetworkInformation><Dumb/></NetworkInformation>);
    expect(wrapper.text()).toEqual("rtt 100")
  });

  it('it should be able to wrap a function', () => {
    const wrapper = mount(<NetworkInformation>
      { props => `rtt ${props.rtt}`}
    </NetworkInformation>);
    expect(wrapper.text()).toEqual("rtt 100")
  });

  it('it should add event listener on mount', () => {
    const wrapper = mount(<NetworkInformation><Dumb/></NetworkInformation>);
    expect(global.navigator.connection.addEventListener).toHaveBeenCalled();
  });

  it('it remove event listener on umounting', () => {
    const wrapper = mount(<NetworkInformation><Dumb/></NetworkInformation>);
    wrapper.unmount()
    expect(global.navigator.connection.removeEventListener).toHaveBeenCalled();
  });
});