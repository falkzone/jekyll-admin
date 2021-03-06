import React from 'react';
import { shallow } from 'enzyme';

import { PageNew } from '../PageNew';
import Errors from '../../../components/Errors';
import Button from '../../../components/Button';

import { config } from './fixtures';

const defaultProps = {
  errors: [],
  fieldChanged: false,
  updated: false,
  router: {},
  route: {},
  config: config,
  params: { splat: 'page-dir' },
};

function setup(props = defaultProps) {
  const actions = {
    createPage: jest.fn(),
    updateTitle: jest.fn(),
    updateBody: jest.fn(),
    updatePath: jest.fn(),
    updateDraft: jest.fn(),
    clearErrors: jest.fn(),
  };

  const component = shallow(<PageNew {...actions} {...props} />);

  return {
    component,
    actions,
    saveButton: component.find(Button),
    errors: component.find(Errors),
    props,
  };
}

describe('Containers::PageNew', () => {
  it('should not render error messages initially', () => {
    const { errors } = setup();
    expect(errors.node).toBeFalsy();
  });

  it('should render error messages', () => {
    const { errors } = setup({
      ...defaultProps,
      errors: ['The path field is required!'],
    });
    expect(errors.node).toBeTruthy();
  });

  it('should not call createPage if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.createPage).not.toHaveBeenCalled();
  });

  it('should call createPage if a field is changed.', () => {
    const { saveButton, actions } = setup({
      ...defaultProps,
      fieldChanged: true,
    });
    saveButton.simulate('click');
    expect(actions.createPage).toHaveBeenCalled();
  });
});
