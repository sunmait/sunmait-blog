import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from './enzyme_test';
import setup from './setupTests';

// describe what we are testing
describe('Login Component', () => {
 
  // make our assertion and what we expect to happen 
  test('should render without throwing an error', () => {
    expect(shallow(<Login />).exists(<form className='login'></form>)).toBe(true)
  })
 })

 // within the Login components describe function
 test('renders a email input', () => {
  expect(shallow(<Login />).find('#email').length).toEqual(1)
 })
 test('renders a password input', () => {
  expect(shallow(<Login />).find('#password').length).toEqual(1)
 })

 // within the Login components describe function
describe('Email input', () => {
  
  test('should respond to change event and change the state of the Login Component', () => {
   
   const wrapper = shallow(<Login />);
   wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
   
  expect(wrapper.state('email')).toEqual('blah@gmail.com');
  })
 })
 
 describe('Password input', () => {
  
  test('should respond to change event and change the state of the Login Component', () => {
   
   const wrapper = shallow(<Login />);
   wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'cats'}});
   
   expect(wrapper.state('password')).toEqual('cats');
  })
 })