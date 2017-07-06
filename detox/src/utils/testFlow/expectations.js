import {findElement} from './actions';


const getElement = (elName, elSelectorSuffix, el, context) => elName
  ? findElement(elName, elSelectorSuffix)(undefined, context)
  : el;

const isVisible = (elName, elSelectorSuffix) => (el, context) =>
  expect(getElement(elName, elSelectorSuffix, el, context))
    .toBeVisible();

const isNotVisible = (elName, elSelectorSuffix) => (el, context) =>
  expect(getElement(elName, elSelectorSuffix, el, context))
    .toBeNotVisible();

const doesExist = (elName, elSelectorSuffix) => (el, context) =>
  expect(getElement(elName, elSelectorSuffix, el, context))
    .toExist();

const doesNotExist = (elName, elSelectorSuffix) => (el, context) =>
  expect(getElement(elName, elSelectorSuffix, el, context))
    .toNotExist();

const hasText = (text, elName, elSelectorSuffix) => (el, context) =>
  expect(getElement(elName, elSelectorSuffix, el, context))
    .toHaveText(text);

const hasId = (id, elName, elSelectorSuffix) => (el, context) =>
  expect(getElement(elName, elSelectorSuffix, el, context))
    .toHaveId(id);

const hasValue = (value, elName, elSelectorSuffix) => (el, context) =>
  expect(getElement(elName, elSelectorSuffix, el, context))
    .toHaveValue(value);

export {
  isVisible,
  isNotVisible,
  doesExist,
  doesNotExist,
  hasText,
  hasId,
  hasValue,
}
