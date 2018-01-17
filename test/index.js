import React from 'react';
import { Debiaser } from '../src/index';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import assert from 'assert';

Enzyme.configure({ adapter: new Adapter() });

let component;

describe('Debiaser', () => {
  beforeEach(() => {
    component = shallow(<Debiaser />);
  });

  describe('dom', () => {
    it('renders a \'hello world\'', () => {
      assert.equal(component.find('p').length, 1);
    });
  });
});
