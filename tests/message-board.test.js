import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

import MessageBoard from '../dist/components/message-board';

describe('A suite', function () {
    it('should render without throwing an error', function () {
        expect(shallow(<MessageBoard />).contains(<ul className="messages-list" />)).toBe(true);
    });

    it('should be selectable by class "chat-area"', function () {
        expect(shallow(<MessageBoard />).is('.chat-area')).toBe(true);
    });

    it('should mount in a full DOM', function () {
        expect(mount(<MessageBoard />).find('.chat-area')).toHaveLength(1);
    });

    it('should render to static HTML', function () {
        expect(render(<MessageBoard />).text()).toEqual('');
    });

    it('matches existing snapshot', () => {
        expect(toJson(render(<MessageBoard />))).toMatchSnapshot();
    });
});