import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

import MessageItem from '../dist/components/message-item';
const genericMessage = {body: "yo", from:{name: "Dambo"}};
let messageItem;

beforeEach(function () {
    messageItem = <MessageItem message={genericMessage} />;
});
describe('A suite', function () {
    it('should render without throwing an error', function () {
        expect(shallow(messageItem).contains(<span className="message-body">yo</span>)).toBe(true);
    });

    it('should be selectable by class "message-item"', function () {
        expect(shallow(messageItem).is('.message-item')).toBe(true);
    });

    it('should mount in a full DOM', function () {
        expect(mount(messageItem).find('.message-item')).toHaveLength(1);
    });

    it('should render to static HTML', function () {
        expect(render(messageItem).text()).toEqual('Dambo: yo');
    });

    it('matches existing snapshot', () => {
        expect(toJson(render(messageItem))).toMatchSnapshot();
    });
});