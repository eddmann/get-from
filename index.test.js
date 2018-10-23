const get = require("./index");

describe("single level object", () => {
  test("present scalar value", () => {
    expect(get("a", { a: "🎉" })).toBe("🎉");
  });

  test("present object value", () => {
    expect(get("a", { a: { b: "🎉" } })).toEqual({ b: "🎉" });
  });

  test("missing value", () => {
    expect(get("b", { a: "🎉" })).toBe(undefined);
  });

  test("missing undefined value", () => {
    expect(get("a", undefined)).toBe(undefined);
  });

  test("custom default scalar value", () => {
    expect(get("b", { a: "🎉" }, "😥")).toBe("😥");
  });

  test("custom default object value", () => {
    expect(get("b", { a: "🎉" }, { a: "😥" })).toEqual({ a: "😥" });
  });
});

describe("multi-level object", () => {
  describe("2-level", () => {
    test("present scalar value", () => {
      expect(get("a.b", { a: { b: "🎉" } })).toBe("🎉");
    });

    test("present object value", () => {
      expect(get("a.b", { a: { b: { c: "🎉" } } })).toEqual({ c: "🎉" });
    });

    test("missing value", () => {
      expect(get("a.c", { a: { b: "🎉" } })).toBe(undefined);
    });

    test("missing undefined value", () => {
      expect(get("a.c", { a: undefined })).toBe(undefined);
    });

    test("custom default scalar value", () => {
      expect(get("a.c", { a: { b: "🎉" } }, "😥")).toBe("😥");
    });

    test("custom default object value", () => {
      expect(get("a.c", { a: { b: "🎉" } }, { a: "😥" })).toEqual({
        a: "😥"
      });
    });
  });

  describe("3-level", () => {
    test("present value", () => {
      expect(get("a.b.c", { a: { b: { c: "🎉" } } })).toBe("🎉");
    });

    test("missing value", () => {
      expect(get("a.c.b", { a: { b: { c: "🎉" } } })).toBe(undefined);
    });

    test("missing undefined value", () => {
      expect(get("a.b.c", { a: { b: undefined } })).toBe(undefined);
    });

    test("missing value and custom default value", () => {
      expect(get("a.c.b", { a: { b: { c: "🎉" } } }, "😥")).toBe("😥");
    });
  });
});

describe("array index access", () => {
  test("present scalar value", () => {
    expect(get("a.0", { a: ["🎉"] })).toBe("🎉");
  });

  test("present object value", () => {
    expect(get("a.0", { a: [{ b: "🎉" }] })).toEqual({ b: "🎉" });
  });

  test("missing value", () => {
    expect(get("a.1", { a: ["🎉"] })).toBe(undefined);
  });

  test("missing undefined value", () => {
    expect(get("a.1", { a: undefined })).toBe(undefined);
  });

  test("custom default scalar value", () => {
    expect(get("a.1", { a: ["🎉"] }, "😥")).toBe("😥");
  });

  test("custom default array value", () => {
    expect(get("a.1", { a: ["🎉"] }, [])).toEqual([]);
  });
});

describe("single map array access", () => {
  test("present scalar values", () => {
    expect(get("a[].b", { a: [{ b: "🎉" }, { b: "🎂" }] })).toEqual([
      "🎉",
      "🎂"
    ]);
  });

  test("partially present scalar values", () => {
    expect(get("a[].b", { a: [{ b: "🎉" }, { c: "🎂" }] })).toEqual(["🎉"]);
  });

  test("present object values", () => {
    expect(
      get("a[].b", { a: [{ b: { c: "🎉" } }, { b: { c: "🎂" } }] })
    ).toEqual([{ c: "🎉" }, { c: "🎂" }]);
  });

  test("missing value", () => {
    expect(get("a[].c", { a: [{ b: { c: "🎉" } }, { b: { c: "🎂" } }] })).toBe(
      undefined
    );
  });

  test("custom default scalar value", () => {
    expect(
      get("a[].c", { a: [{ b: { c: "🎉" } }, { b: { c: "🎂" } }] }, "😥")
    ).toBe("😥");
  });

  test("custom default array value", () => {
    expect(
      get("a[].c", { a: [{ b: { c: "🎉" } }, { b: { c: "🎂" } }] }, [])
    ).toEqual([]);
  });
});

describe("multi-map array access", () => {
  test("present scalar values", () => {
    expect(
      get("a[].b[].c", {
        a: [{ b: [{ c: "🎉" }] }, { b: [{ c: "🎂" }] }]
      })
    ).toEqual([["🎉"], ["🎂"]]);
  });

  test("partially present scalar values", () => {
    expect(
      get("a[].b[].c", { a: [{ b: [{ c: "🎉" }] }, { b: [{ d: "🎂" }] }] })
    ).toEqual([["🎉"]]);
  });

  test("present object values", () => {
    expect(
      get("a[].b[].c", {
        a: [{ b: [{ c: { d: "🎉" } }] }, { b: [{ c: { d: "🎂" } }] }]
      })
    ).toEqual([[{ d: "🎉" }], [{ d: "🎂" }]]);
  });

  test("missing value", () => {
    expect(
      get("a[].b[].d", {
        a: [{ b: [{ c: { d: "🎉" } }] }, { b: [{ c: { d: "🎂" } }] }]
      })
    ).toBe(undefined);
  });

  test("custom default scalar value", () => {
    expect(
      get(
        "a[].b[].d",
        {
          a: [{ b: [{ c: { d: "🎉" } }] }, { b: [{ c: { d: "🎂" } }] }]
        },
        "😥"
      )
    ).toBe("😥");
  });

  test("custom default array value", () => {
    expect(
      get(
        "a.b[].c[].e",
        {
          a: [{ b: [{ c: { d: "🎉" } }] }, { b: [{ c: { d: "🎂" } }] }]
        },
        []
      )
    ).toEqual([]);
  });
});

test("handles all cases in one path", () => {
  expect(
    get("a.b[].c.0.d", { a: { b: [{ c: [{ d: "🎉" }, { e: "🎂" }] }] } })
  ).toEqual(["🎉"]);
});
