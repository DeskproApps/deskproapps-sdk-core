import { create, UIEvents, UIConstants } from '../../../main/javascript/UI'
import {EventDispatcher} from '../../../main/javascript/Core/EventDispatcher'

test('badgeCount property is stored after setting', done => {
  "use strict";

  const eventDispatcher = new EventDispatcher();

  const ui = create(eventDispatcher);
  ui.badgeCount = 5;
  expect(ui.badgeCount).toBe(5);
  done();
});

test('badge_countchanged event fires only if count actually changes', done =>
{
  const emitMock = jest.fn();
  const eventDispatcher = new EventDispatcher();
  eventDispatcher.emit = emitMock;

  const ui = create(eventDispatcher);
  ui.badgeCount = 5;
  ui.badgeCount = 5;

  expect(emitMock.mock.calls.length).toBe(1);
  expect(emitMock.mock.calls[0][0]).toBe(UIEvents.EVENT_BADGE_COUNTCHANGED);
  done();
});

test('badge_countchanged event fires everytime there is a change', done =>
{
  const emitMock = jest.fn();
  const eventDispatcher = new EventDispatcher();
  eventDispatcher.emit = emitMock;

  const ui = create(eventDispatcher);
  ui.badgeCount = 5;
  ui.badgeCount = 6;

  expect(emitMock.mock.calls.length).toBe(2);

  expect(emitMock.mock.calls[0][0]).toBe(UIEvents.EVENT_BADGE_COUNTCHANGED);
  expect(emitMock.mock.calls[0][1]).toBe(5);
  expect(emitMock.mock.calls[0][2]).toBe(0);

  expect(emitMock.mock.calls[1][0]).toBe(UIEvents.EVENT_BADGE_COUNTCHANGED);
  expect(emitMock.mock.calls[1][1]).toBe(6);
  expect(emitMock.mock.calls[1][2]).toBe(5);

  done();
});

test('badge_visibilitychanged event fires everytime badge visibility changes', done =>
{
  const emitMock = jest.fn();
  const eventDispatcher = new EventDispatcher();
  eventDispatcher.emit = emitMock;

  const ui = create(eventDispatcher);
  ui.showBadgeCount();
  ui.showBadgeCount();
  ui.hideBadgeCount();

  expect(emitMock.mock.calls.length).toBe(2);
  expect(emitMock.mock.calls[0][0]).toBe(UIEvents.EVENT_BADGE_VISIBILITYCHANGED);
  expect(emitMock.mock.calls[0][1]).toBe(UIConstants.VISIBILITY_VISIBLE);
  expect(emitMock.mock.calls[0][2]).toBe(UIConstants.VISIBILITY_HIDDEN);

  expect(emitMock.mock.calls[1][0]).toBe(UIEvents.EVENT_BADGE_VISIBILITYCHANGED);
  expect(emitMock.mock.calls[1][1]).toBe(UIConstants.VISIBILITY_HIDDEN);
  expect(emitMock.mock.calls[1][2]).toBe(UIConstants.VISIBILITY_VISIBLE);

  done();
});

test('menu visibility change event fires everytime menu visibility changes', done =>
{
  const emitMock = jest.fn();
  const eventDispatcher = new EventDispatcher();
  eventDispatcher.emit = emitMock;

  const ui = create(eventDispatcher);
  ui.hideMenu();
  ui.hideMenu();
  ui.showMenu();
  ui.showMenu();

  expect(emitMock.mock.calls.length).toBe(2);
  expect(emitMock.mock.calls[0][0]).toBe(UIEvents.EVENT_MENU_VISIBILITYCHANGED);
  expect(emitMock.mock.calls[0][1]).toBe(UIConstants.VISIBILITY_HIDDEN);
  expect(emitMock.mock.calls[0][2]).toBe(UIConstants.VISIBILITY_VISIBLE);

  expect(emitMock.mock.calls[1][0]).toBe(UIEvents.EVENT_MENU_VISIBILITYCHANGED);
  expect(emitMock.mock.calls[1][1]).toBe(UIConstants.VISIBILITY_VISIBLE);
  expect(emitMock.mock.calls[1][2]).toBe(UIConstants.VISIBILITY_HIDDEN);

  done();
});

test('showLoading does not emit event if ui is in loading state ', done => {
  "use strict";
  const emitMock = jest.fn();
  const eventDispatcher = new EventDispatcher();
  eventDispatcher.emit = emitMock;

  const ui = create(eventDispatcher);
  ui.showLoading();
  ui.showLoading();

  expect(emitMock.mock.calls.length).toBe(1);
  done();
});

test('hide does not emit event if ui is in not loading state ', done => {
  "use strict";
  const emitMock = jest.fn();
  const eventDispatcher = new EventDispatcher();
  eventDispatcher.emit = emitMock;

  const ui = create(eventDispatcher);
  ui.showLoading();
  ui.hideLoading();
  ui.hideLoading();

  expect(emitMock.mock.calls.length).toBe(2);
  done();
});