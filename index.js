const get = (path, value, _default = undefined) => {
  let seperator, subject, isArrayAccess;

  while (path !== "") {
    seperator = path.indexOf(".");
    subject = seperator === -1 ? path : path.substr(0, seperator);
    path = seperator === -1 ? "" : path.substr(seperator + 1);

    if (value !== Object(value)) {
      return _default;
    }

    if (subject.endsWith("[]")) {
      subject = subject.slice(0, -2);
      isArrayAccess = true;
    }

    if (!value.hasOwnProperty(subject)) {
      return _default;
    }

    value = value[subject];

    if (isArrayAccess) {
      if (!Array.isArray(value)) {
        return _default;
      }

      const arr = value
        .map(v => get(path, v, _default))
        .filter(v => v !== _default);

      return arr.length > 0 ? arr : _default;
    }
  }

  return value;
};

module.exports = get;
