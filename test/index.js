import React from 'react';
import { Debiaser } from '../src/index';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import assert from 'assert';

Enzyme.configure({ adapter: new Adapter() });

let component;

describe('Debiaser', () => {
  beforeEach(() => {
    component = shallow(<Debiaser articles={[]}/>);
  });

  describe('dom', () => {
    it('renders any content', () => {
      assert.equal(component.find('div').length, 1);
    });
  });
});
