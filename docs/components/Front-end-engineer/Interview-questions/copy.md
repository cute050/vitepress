# 前端面试题 深拷贝、浅拷贝

## 1. 赋值 - 浅拷贝

js

```
const obj1 = { name: "唐三" };
const obj2 = obj1;

obj2.name = "张三";

console.log(obj1); // 张三
console.log(obj2); // 张三
```

## 2. 可扩展运算符和字面量对象 - 浅拷贝

js

```
const obj1 = { name: "唐三" };
const obj2 = { ...obj1 }; // 浅拷贝

obj2.name = "张三";

console.log(obj1); // 唐三
console.log(obj2); // 张三
```

## 3. 可扩展运算符 - 浅拷贝

js

```
const obj1 = { name: "唐三", say: { age: 23 } };
const obj2 = { ...obj1, name: "张三" }; // 浅拷贝
obj2.say.age = 30;

console.log(obj1.say.age); // 30
console.log(obj1.name); // 唐三
console.log(obj2.say.age); // 30
console.log(obj2.name); // 张三
```

## 4. Object.assign - 浅拷贝

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

Object.assign() 静态方法将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象。

js

```
const obj1 = { name: "唐三", say: { age: 23 }, height: 1.8 };
const obj2 = Object.assign(obj1, { name: "张三" });
obj2.say.age = 30;

console.log(obj1.say.age); // 30
console.log(obj1.name); // 张三
console.log(obj2.say.age); // 30
console.log(obj2.name); // 张三

console.log(obj1.say === obj2.say); // true

console.log(obj1.height); // 1.8
console.log(obj2.height); // 1.8
```

## 5. JSON.parse(JSON.stringify(obj)) - 深拷贝

js

```
const obj1 = {
  name: "唐三",
  say: { age: 23 },
  getName() {},
  height: 1.8,
};
const obj2 = JSON.parse(JSON.stringify(obj1));
obj2.say.age = 30;
obj2.name = "张三";

console.log(obj1.say.age); // 23
console.log(obj1.name); // 唐三
console.log(obj2.say.age); // 30
console.log(obj2.name); // 张三

console.log(obj1.say === obj2.say); // false

console.log("obj1", obj1);
console.log("obj2", obj2);

// 23
// 唐三
// 30
// 张三
// false
// obj1 {
//   name: '唐三',
//   say: { age: 23 },
//   getName: [Function: getName],
//   height: 1.8
// }
// obj2 { name: '张三', say: { age: 30 }, height: 1.8 }
```

## 6. Vuex 中的深拷贝 - 深拷贝

利用递归 对象中的 key 来实现深拷贝

js

```
function deepCopy(obj, cache = []) {
  function find(list, f) {
    return list.filter(f)[0];
  }

  // just return if obj is immutable value
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, (c) => c.original === obj);
  if (hit) {
    return hit.copy;
  }
  const copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache a first
  // because we want to refer it in recursive deepCopy
  cache.push({ original: obj, copy });

  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy(obj[key], cache);
  });
  return copy;
}
```

这是一个在 Vuex 源码中用于深拷贝对象的实现，它考虑到了对象的循环引用问题。在复制一个对象的过程中，这个方法首先检查这个对象是否已经被复制过（也就是查看它是否在缓存中）。如果对象已经被复制过，那么直接返回复制的对象，避免了无限递归。如果对象还没有被复制过，那么创建一个新的空对象或空数组，然后递归地复制原始对象的所有属性。

这个函数的工作原理如下：

1. 定义一个 `find` 函数，用于查找一个满足特定条件的元素。
2. 检查 `obj` 是否是一个不可变的值。如果 `obj` 是 `null` 或者不是对象（也就是说，`obj` 是一个原始值），那么直接返回 `obj`。
3. 检查 `obj` 是否在 `cache` 中，也就是说，`obj` 是否已经被复制过。如果 `obj` 在 `cache` 中，那么返回 `cache` 中的复制。
4. 创建一个新的空对象或空数组，用于存储复制的属性。
5. 把 `obj` 和新创建的空对象或空数组加入到 `cache` 中。
6. 遍历 `obj` 的所有属性，递归地调用 `deepCopy` 函数复制这些属性。
7. 返回复制的对象。

这个函数可以有效地深拷贝一个对象，即使这个对象中存在循环引用。然而，这个函数不能复制函数、日期对象、正则表达式对象等特殊对象，这是因为这些对象的行为不能通过复制属性来完全复制。

当使用上述的`deepCopy`函数时，下面是一些测试用例和对应的结果：

**测试用例 1：** 简单对象的深拷贝

javascript

```
const obj1 = { a: 1, b: 2, c: 3 };
const copy1 = deepCopy(obj1);
console.log(copy1);
```

**结果 1：**



```
{ a: 1, b: 2, c: 3 }
```

在这个测试用例中，`obj1`是一个简单的对象。`deepCopy`函数会创建一个新的对象 `copy1`，并且将`obj1`的属性值完整地拷贝到 `copy1` 中。

**测试用例 2：** 包含嵌套对象的深拷贝

javascript

```
const obj2 = { a: 1, b: { c: 2 } };
const copy2 = deepCopy(obj2);
console.log(copy2);
```

**结果 2：**



```
{ a: 1, b: { c: 2 } }
```

在这个测试用例中，`obj2`包含一个嵌套的对象`{ c: 2 }`。`deepCopy`函数会创建一个新的对象 `copy2`，并将`obj2`的属性值完整地拷贝到 `copy2` 中，包括嵌套的对象。

**测试用例 3：** 循环引用的深拷贝

javascript

```
const obj3 = { a: 1 };
obj3.b = obj3;
const copy3 = deepCopy(obj3);
console.log(copy3);
```

**结果 3：**



```
{ a: 1, b: [Circular] }
```

在这个测试用例中，`obj3`包含了一个循环引用，即属性`b`引用了`obj3`本身。由于循环引用可能导致无限递归，`deepCopy`函数会检测到循环引用并避免无限递归。结果中的 `[Circular]` 表示循环引用的属性被替换为一个占位符。

**测试用例 4：** 包含数组的深拷贝

javascript

```
const obj4 = { a: [1, 2, 3] };
const copy4 = deepCopy(obj4);
console.log(copy4);
```

**结果 4：**



```
{ a: [1, 2, 3] }
```

在这个测试用例中，`obj4`包含一个数组 `[1, 2, 3]`。`deepCopy`函数会创建一个新的对象 `copy4`，并将`obj4`的属性值完整地拷贝到 `copy4` 中，包括数组。

**测试用例 5：** 拷贝 null 或非对象类型的值

javascript

```
const obj5 = null;
const copy5 = deepCopy(obj5);
console.log(copy5); // null

const obj6 = 42;
const copy6 = deepCopy(obj6);
console.log(copy6); // 42
```

**结果 5：**



```
null
42
```

在这个测试用例中，`obj5`为`null`，`obj6`为一个非对象类型的值。`deepCopy`函数会直接返回这些不可变的值。

总之，`deepCopy`函数可以用于深拷贝对象，并处理循环引用的情况，以确保返回的对象是一个完全独立且拷贝了原始对象的副本。