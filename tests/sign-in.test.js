import React from 'react';
import { shallow, mount } from 'enzyme';
// import toJson from 'enzyme-to-json';
import ReactModal from 'react-modal';
// import { findDOMNode } from 'react-dom';

import SignIn from '../dist/components/sign-in';

const minimalModalOptions = {isOpen: true};
const signIn = <SignIn modalOptions={minimalModalOptions} />;
const shallowWrapper = shallow(signIn);
const shallowModal = shallowWrapper.find(ReactModal);
const mountWrapper = mount(signIn);
const mountedModal = mountWrapper.find(ReactModal);

describe('A suite', function () {
    it('should render without throwing an error', function () {
        expect(shallowModal.contains(<input className="sign-in-submit" type="submit" value="Sign In" />)).toBe(true);
    });

    it('should be selectable by class "ReactModalPortal"', function () {
        expect(shallowModal.is(ReactModal)).toBe(true);
    });

    it('should mount in a full DOM', function () {
        expect(mountedModal).toHaveLength(1);
    });
});