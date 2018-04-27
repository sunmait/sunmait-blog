import * as React from "react";
import { shallow } from "enzyme";

import LoginPage from "../pages/LoginPage";

describe("LoginPage component", () => {
    test("renders the LoginPage component with <div className='LoginPage'></div>", () => {
      const result = shallow(<LoginPage />).exists(<div className='LoginPage'></div>);
      expect(result).toBe(true);
    });

    test("renders the LoginPage component with <h2 className='title'></h2>", () => {
      const result = shallow(<LoginPage />).exists(<h2 className='title'></h2>);
      expect(result).toBe(true);
    });

    test("renders the LoginPage component with <input className='field'></input>", () => {
      const result = shallow(<LoginPage />).exists(<input className='field'></input>);
      expect(result).toBe(true);
    });

    test('should respond to change event and change the state of the LoginPage Component', () => {
      const wrapper = shallow(<LoginPage />);
      wrapper.find('#login').simulate('change', {target: {name: 'login', value: 'vadim'}});
      
      expect(wrapper.state('login')).toEqual('vadim');
    });

    test('should respond to change event and change the state of the LoginPage Component', () => {
      const wrapper = shallow(<LoginPage />);
      wrapper.find('#password').simulate('change', {target: {name: 'password', value: '11111111'}});
      
      expect(wrapper.state('password')).toEqual('11111111');
    });
});