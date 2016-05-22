import ImmutablePropTypes from 'react-immutable-proptypes';

const value = (type) =>
  ImmutablePropTypes.contains({
    value: type,
    originalValue: type,
  });

export default {
  value
};
