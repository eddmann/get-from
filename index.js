const get = (path, value, _default = undefined) => {
  let seperator, subject;

  while (path !== "") {
    seperator = path.indexOf(".");
    subject = seperator === -1 ? path : path.substr(0, seperator);
    path = seperator === -1 ? "" : path.substr(seperator + 1);

    if (subject.endsWith("[]")) {
      subject = subject.slice(0, -2);

      if (!Array.isArray(value[subject])) {
        return _default;
      }

      const arr = value[subject]
        .map(v => get(path, v, _default))
        .filter(v => v !== _default);

      return arr.length > 0 ? arr : _default;
    }

    if (value === undefined || value[subject] === undefined) {
      return _default;
    }

    value = value[subject];
  }

  return value;
};

module.exports = get;
