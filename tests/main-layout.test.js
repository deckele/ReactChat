import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

import MainLayout from '../dist/components/main-layout';

describe('A suite', function () {
    it('should render without throwing an error', function () {
        expect(shallow(<MainLayout />).contains(<h1 className="chat-title">Chat Away!</h1>)).toBe(true);
    });

    it('should be selectable by class "app-wrapper"', function () {
        expect(shallow(<MainLayout />).is('.app-wrapper')).toBe(true);
    });

    it('should mount in a full DOM', function () {
        expect(mount(<MainLayout />).find('.app-wrapper')).toHaveLength(1);
    });

    it('should render to static HTML', function () {
        expect(render(<MainLayout />).text()).toEqual('Logged in as: guestChat Away!');
    });

    it('matches existing snapshot', () => {
        expect(toJson(render(<MainLayout />))).toMatchSnapshot();
    });
});