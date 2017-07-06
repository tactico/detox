import {validateSelectorDescriptor, getErrorFuncFor} from './selectorDescriptorValidator';

const TestFlow = (...commands) =>
  async (prevRes = undefined, context = new TestContext()) => {
    for (let command of commands)
      prevRes = await command(prevRes, context);
};

const throwError = msg => {throw new Error(msg)};
const test = (...screens) => (prevRes, context) => context.registerScreens(screens);
const reloadReactOn = device => (prevRes, context) =>
  device
    ? device.reloadReactNative
      ? device.reloadReactNative()
      : throwError(`Can't reload the device, because it is not a react native device.`)
    : throwError(`You have to provide device to reload react on it.`);

class TestContext {
  constructor() {
    this.screens = {};
    this.currentScreen = undefined;
  }

  registerScreens(screenDescriptors) {
    this.validateScreenDescriptors(screenDescriptors);

    for (let screenDescriptor of  screenDescriptors)
      this.screens[screenDescriptor.name] = screenDescriptor.selectors;
  }

  setCurrentScreen(name) {
    this.currentScreen = this.screens[name];

    if (!this.currentScreen)
      throw new Error(`Screen named ${name} is not registered. Please add the screen descriptor to Regina through a 'test' function`);
  }

  validateScreenDescriptors(screenDescriptors) {
    screenDescriptors
      .forEach(({name, selectors}) =>
        Object
          .keys(selectors)
          .forEach(selectorName =>
            validateSelectorDescriptor(selectors[selectorName], getErrorFuncFor(selectorName, name))));
  }
}

export {
  TestFlow,
  test,
  reloadReactOn,
};
