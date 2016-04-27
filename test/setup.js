import extensiblePolyfill from 'extensible-polyfill';
extensiblePolyfill('immutable');

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import 'babel-polyfill';
import { jsdom } from 'jsdom';

chai.use(chaiImmutable);

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
window.localStorage = window.sessionStorage = {
  getItem(key) {
    return this[key];
  },
  setItem(key, value) {
    this[key] = value;
  },
  removeItem(key) {
    this[key] = undefined;
  },
};
