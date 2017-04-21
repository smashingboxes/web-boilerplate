function mapFormValues(formElements) {
  return Array.prototype.reduce.call(formElements, (memo, element) => {
    if (element.name && element.value) {
      memo[element.name] = element.value;
    }

    return memo;
  }, {});
}

export default mapFormValues;
