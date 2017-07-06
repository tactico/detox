const validate = (...validators) => (selector, throwError = getErrorFuncFor('unknown', 'unknown')) => {
  validators.reduce((prevRes, validator) => validator(selector, throwError), undefined);
};

const getErrorFuncFor = (selectorName, screenName) => (msg) => {
  throw new Error(`The screen descriptor of ${screenName} screen, has invalid selector '${selectorName}' - ${msg}`);
};

const field = (name, validator) => validator(name);

const object = (validator, ...fields) => validator(...fields);

const isDefined = () => fieldName => (selector, throwError) =>
  selector[fieldName] === undefined
    ? throwError(`field '${fieldName}' is mandatory for the selector descriptor. Please add it.`)
    : selector;

const hasValueOf = (...values) => fieldName => (selector, throwError) =>
  selector[fieldName] && !values.includes(selector[fieldName])
    ? throwError(`field '${fieldName}' should have one of the following values: ${values.join(', ')}, but has instead ${selector[fieldName]}.`)
    : selector;

const isOfType = (type) => fieldName => (selector, throwError) =>
  selector[fieldName] && typeof selector[fieldName] !== type
    ? throwError(`field '${fieldName}' should have type: ${type} but has instead ${typeof selector[fieldName]}.`)
    : selector;

const hasEitherOrFields = () => (...fieldNames) => (selector, throwError) => {
  const fieldNamesIntersection = Object
    .keys(selector)
    .filter(key => fieldNames.includes(key));

  return fieldNamesIntersection.length > 1
    ? throwError(`selector descriptor should contain only one of this fields: '${fieldNamesIntersection.join(', ')}'. Please remove unnecessary one.`)
    : selector;
};

const isValidSelector = () => fieldName => (selector, throwError) => selector[fieldName]
  ? fieldName === 'with'
    ? validate(
      field('relation', isDefined()),
      getDescriptorValidator(),
    )(selector[fieldName], throwError)
    : getDescriptorValidator()(selector[fieldName], throwError)
  : undefined;

const getDescriptorValidator = () => validate(
  field('by', isDefined()),
  field('value', isDefined()),
  field('by', hasValueOf('type', 'id', 'label', 'text', 'trait')),
  field('value', isOfType('string')),
  field('index', isOfType('number')),
  object(hasEitherOrFields(), 'with', 'and'),
  field('and', isValidSelector()),
  field('with', isValidSelector()),
);

const validateSelectorDescriptor = getDescriptorValidator();

export {
  getErrorFuncFor,
  validateSelectorDescriptor,
}
