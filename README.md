# get-from

[![Build Status](https://travis-ci.org/eddmann/get-from.svg?branch=master)](https://travis-ci.org/eddmann/get-from)

Safely returns the value(s) in a nested object/array structure.

Having to do boilerplate checks such as `obj["a"] && obj["a"]["b"] && obj["a"]["b"]["c"]` complicates code!
Instead all you need to do is provide you desired final path and optional default value.

## Usage

```js
import get from "get-from";

// multi-level objects
get("a", { a: "🎉" }); // => "🎉"
get("a.b", { a: { b: "🎉" } }); // => "🎉"
get("a.c", { a: { b: "🎉" } }); // => undefined
get("a.c", { a: { b: "🎉" } }, "😥"); // => "😥"

// array index access
get("a.0", { a: [{ b: "🎉" }] }); // => { b: "🎉" }

// multi-map array access
get("a[].b", { a: [{ b: "🎉" }, { b: "🎂" }] }); // => ["🎉", "🎂"]
get("a[].b[].c", { a: [{ b: [{ c: "🎉" }] }, { b: [{ c: "🎂" }] }] }); // => [["🎉"], ["🎂"]]

// all together!
get("a.b[].c.0.d", { a: { b: [{ c: [{ d: "🎉" }, { e: "🎂" }] }] } }); // => ["🎉"]
```
