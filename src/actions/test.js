import { LOAD, LOAD_SUCCESS, LOAD_FAIL, LOAD_TEST, LOAD_TEST_SUCCESS, LOAD_TEST_FAIL, LOAD_PRODUCTNAME, LOAD_PRODUCTNAME_SUCCESS, LOAD_PRODUCTNAME_FAIL } from '../constants/test';
import requestAPI from './config';

export function load(filterCondition) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: requestAPI('/protests/v1/', filterCondition, 'get'),
  };
}

export function loadTest(id) {
  return {
    types: [LOAD_TEST, LOAD_TEST_SUCCESS, LOAD_TEST_FAIL],
    promise: requestAPI(`/protests/v1/${id}`, null, 'get'),
  };
}

export function loadProductName() {
  return {
    types: [LOAD_PRODUCTNAME, LOAD_PRODUCTNAME_SUCCESS, LOAD_PRODUCTNAME_FAIL],
    promise: requestAPI('/protests/v1/proname/', null, 'get'),
  };
}
