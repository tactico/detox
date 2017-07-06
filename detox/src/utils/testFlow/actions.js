import _ from 'lodash';

const getSelector = (descriptor, elSelectorSuffix = '') => {
  const selector = by[descriptor.by](descriptor.value + elSelectorSuffix);

  if (descriptor.and)
    return selector.and(getSelector(descriptor.and));

  if (descriptor.with)
    return selector[`with${_.capitalize(descriptor.with.relation)}`](getSelector(descriptor.with));

  return selector;
};

const getElement = (elName, elSelectorSuffix, el, context) => elName
  ? findElement(elName, elSelectorSuffix)(undefined, context)
  : el;

const findElement = (elName, elSelectorSuffix = '') => (prevResult, context) => {
  const screenDescriptor = context.currentScreen[elName];
  const selector = getSelector(screenDescriptor, elSelectorSuffix);
  const el = element(selector);

  return screenDescriptor.index !== undefined
    ? el.atIndex(screenDescriptor.index)
    : el;
};

const atScreen = (name) => (prevResult, context) => context.setCurrentScreen(name);

const tap = (elName, elSelectorSuffix) => (el, context) =>
  getElement(elName, elSelectorSuffix, el, context)
    .tap();

const longPress = (elName, elSelectorSuffix) => (el, context) =>
  getElement(elName, elSelectorSuffix, el, context)
    .longPress();

const multiTap = (times, elName, elSelectorSuffix) => (el, context) =>
  getElement(elName, elSelectorSuffix, el, context)
    .multiTap(times);

const typeText = (text, elName, elSelectorSuffix) => (el, context) =>
  getElement(elName, elSelectorSuffix, el, context)
    .typeText(text);

const replaceText = (text, elName, elSelectorSuffix) => (el, context) =>
  getElement(elName, elSelectorSuffix, el, context)
    .replaceText(text);

const clearText = (elName, elSelectorSuffix) => (el, context) =>
  getElement(elName, elSelectorSuffix, el, context)
    .clearText();

const scroll = (pixels, direction, elName, elSelectorSuffix) => (el, context) =>
  getElement(elName, elSelectorSuffix, el, context)
    .scroll(pixels, direction);

const scrollTo = (edge, elName, elSelectorSuffix) => (el, context) =>
  getElement(elName, elSelectorSuffix, el, context)
    .scrollTo(edge);

const swipe = (direction, speed, percentage, elName, elSelectorSuffix) => (el, context) =>
  getElement(elName, elSelectorSuffix, el, context)
    .swipe(direction, speed, percentage);

export {
  atScreen,
  findElement,
  tap,
  longPress,
  multiTap,
  typeText,
  replaceText,
  clearText,
  scroll,
  scrollTo,
  swipe,
}
