Ember.NativeArray
Defined in packages/ember-runtime/lib/system/native_array.js:107
Creates an Ember.NativeArray from an Array like object. Does not modify the original object. Ember.A is not needed if Ember.EXTEND_PROTOTYPES is true (the default value). However, it is recommended that you use Ember.A when creating addons for ember or when you can not guarantee that Ember.EXTEND_PROTOTYPES will be true.

Example

1
2
3
4
5
6
7
8
9
10
11
var Pagination = Ember.CollectionView.extend({
  tagName: 'ul',
  classNames: ['pagination'],

  init: function() {
    this._super();
    if (!this.get('content')) {
      this.set('content', Ember.A());
    }
  }
});
Returns:
Ember.NativeArray
addBeforeObserver (obj, path, target, method)
Defined in packages/ember-metal/lib/observer.js:62
Parameters:
obj
path String
target Object|Function
method [Function|String]
addListener (obj, eventName, target, method, once)
Defined in packages/ember-metal/lib/events.js:107
Add an event listener

Parameters:
obj
eventName String
target Object|Function
A target object or a function
method Function|String
A function or the name of a function to be called on `target`
once Boolean
A flag whether a function should only be called once
addObserver (obj, path, targetOrMethod, method)
Defined in packages/ember-metal/lib/observer.js:28
Parameters:
obj
path String
targetOrMethod Object|Function
method [Function|String]
aliasMethod (methodName) Ember.Descriptor
Defined in packages/ember-metal/lib/mixin.js:746
Makes a method available via an additional name.

1
2
3
4
5
6
7
8
9
10
11
App.Person = Ember.Object.extend({
  name: function() {
    return 'Tomhuda Katzdale';
  },
  moniker: Ember.aliasMethod('name')
});

var goodGuy = App.Person.create();

goodGuy.name();    // 'Tomhuda Katzdale'
goodGuy.moniker(); // 'Tomhuda Katzdale'
Parameters:
methodName String
name of the method to alias
Returns:
Ember.Descriptor
arrayComputed (dependentKeys*, options) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/array_computed.js:53
Creates a computed property which operates on dependent arrays and is updated with "one at a time" semantics. When items are added or removed from the dependent array(s) an array computed only operates on the change instead of re-evaluating the entire array. This should return an array, if you'd like to use "one at a time" semantics and compute some value other then an array look at Ember.reduceComputed.

If there are more than one arguments the first arguments are considered to be dependent property keys. The last argument is required to be an options object. The options object can have the following three properties.

initialize - An optional initialize function. Typically this will be used to set up state on the instanceMeta object.

removedItem - A function that is called each time an element is removed from the array.

addedItem - A function that is called each time an element is added to the array.

The initialize function has the following signature:

1
function(array, changeMeta, instanceMeta)
array - The initial value of the arrayComputed, an empty array.

changeMeta - An object which contains meta information about the computed. It contains the following properties:

property the computed property
propertyName the name of the property on the object
instanceMeta - An object that can be used to store meta information needed for calculating your computed. For example a unique computed might use this to store the number of times a given element is found in the dependent array.

The removedItem and addedItem functions both have the following signature:

1
function(accumulatedValue, item, changeMeta, instanceMeta)
accumulatedValue - The value returned from the last time removedItem or addedItem was called or an empty array.

item - the element added or removed from the array

changeMeta - An object which contains meta information about the change. It contains the following properties:

property the computed property
propertyName the name of the property on the object
index the index of the added or removed item
item the added or removed item: this is exactly the same as the second arg
arrayChanged the array that triggered the change. Can be useful when depending on multiple arrays.
For property changes triggered on an item property change (when depKey is something like someArray.@each.someProperty), changeMeta will also contain the following property:

previousValues an object whose keys are the properties that changed on the item, and whose values are the item's previous values.
previousValues is important Ember coalesces item property changes via Ember.run.once. This means that by the time removedItem gets called, item has the new values, but you may need the previous value (eg for sorting & filtering).

instanceMeta - An object that can be used to store meta information needed for calculating your computed. For example a unique computed might use this to store the number of times a given element is found in the dependent array.

The removedItem and addedItem functions should return the accumulated value. It is acceptable to not return anything (ie return undefined) to invalidate the computation. This is generally not a good idea for arrayComputed but it's used in eg max and min.

Example

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
Ember.computed.map = function(dependentKey, callback) {
  var options = {
    addedItem: function(array, item, changeMeta, instanceMeta) {
      var mapped = callback(item);
      array.insertAt(changeMeta.index, mapped);
      return array;
    },
    removedItem: function(array, item, changeMeta, instanceMeta) {
      array.removeAt(changeMeta.index, 1);
      return array;
    }
  };

  return Ember.arrayComputed(dependentKey, options);
};
Parameters:
dependentKeys* [String]
options Object
Returns:
Ember.ComputedProperty
assert (desc, test)
Defined in packages/ember-debug/lib/main.js:18
Define an assertion that will throw an exception if the condition is not met. Ember build tools will remove any calls to Ember.assert() when doing a production build. Example:

1
2
3
4
5
// Test for truthiness
Ember.assert('Must pass a valid object', obj);

// Fail unconditionally
Ember.assert('This code path should never be run');
Parameters:
desc String
A description of the assertion. This will become the text of the Error thrown if the assertion fails.
test Boolean
Must be truthy for the assertion to pass. If falsy, an exception will be thrown.
beforeObserver (propertyNames, func) 
Defined in packages/ember-metal/lib/mixin.js:860
When observers fire, they are called with the arguments obj, keyName.

Note, @each.property observer is called per each add or replace of an element and it's not called with a specific enumeration item.

A beforeObserver fires before a property changes.

A beforeObserver is an alternative form of .observesBefore().

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
App.PersonView = Ember.View.extend({
  friends: [{ name: 'Tom' }, { name: 'Stefan' }, { name: 'Kris' }],

  valueWillChange: Ember.beforeObserver('content.value', function(obj, keyName) {
    this.changingFrom = obj.get(keyName);
  }),

  valueDidChange: Ember.observer('content.value', function(obj, keyName) {
      // only run if updating a value already in the DOM
      if (this.get('state') === 'inDOM') {
        var color = obj.get(keyName) > this.changingFrom ? 'green' : 'red';
        // logic
      }
  }),

  friendsDidChange: Ember.observer('friends.@each.name', function(obj, keyName) {
    // some logic
    // obj.get(keyName) returns friends array
  })
});
Also available as Function.prototype.observesBefore if prototype extensions are enabled.

Parameters:
propertyNames String
func Function
Returns:
func
bind (obj, to, from) Ember.Binding
Defined in packages/ember-metal/lib/binding.js:462
Global helper method to create a new binding. Just pass the root object along with a to and from path to create and connect the binding.

Parameters:
obj Object
The root object of the transform.
to String
The path to the 'to' side of the binding. Must be relative to obj.
from String
The path to the 'from' side of the binding. Must be relative to obj or a global path.
Returns:
Ember.Binding
binding instance
cacheFor (obj, key) Object
Defined in packages/ember-metal/lib/computed.js:574
Returns the cached value for a property, if one exists. This can be useful for peeking at the value of a computed property that is generated lazily, without accidentally causing it to be created.

Parameters:
obj Object
the object whose property you want to check
key String
the name of the property whose cached value you want to return
Returns:
Object
the cached value
canInvoke (obj, methodName) Boolean
Defined in packages/ember-metal/lib/utils.js:518
Checks to see if the methodName exists on the obj.

1
2
3
4
5
var foo = { bar: function() { return 'bar'; }, baz: null };

Ember.canInvoke(foo, 'bar'); // true
Ember.canInvoke(foo, 'baz'); // false
Ember.canInvoke(foo, 'bat'); // false
Parameters:
obj Object
The object to check for the method
methodName String
The method name to check for
Returns:
Boolean
changeProperties (callback, binding)
Defined in packages/ember-metal/lib/property_events.js:250
Make a series of property changes together in an exception-safe way.

1
2
3
4
Ember.changeProperties(function() {
  obj1.set('foo', mayBlowUpWhenSet);
  obj2.set('bar', baz);
});
Parameters:
callback Function
binding []
compare (v, w) Number
Defined in packages/ember-runtime/lib/compare.js:26
This will compare two javascript values of possibly different types. It will tell you which one is greater than the other by returning:

-1 if the first is smaller than the second,
0 if both are equal,
1 if the first is greater than the second.
The order is calculated based on Ember.ORDER_DEFINITION, if types are different. In case they have the same type an appropriate comparison for this type is made.

1
2
3
 Ember.compare('hello', 'hello');  // 0
 Ember.compare('abc', 'dfg');      // -1
 Ember.compare(2, 1);              // 1
Parameters:
v Object
First value to compare
w Object
Second value to compare
Returns:
Number
-1 if v < w, 0 if v = w and 1 if v > w.
computed (dependentKeys*, func) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed.js:502
This helper returns a new property descriptor that wraps the passed computed property function. You can use this helper to define properties with mixins or via Ember.defineProperty().

The function you pass will be used to both get and set property values. The function should accept two parameters, key and value. If value is not undefined you should set the value first. In either case return the current value of the property.

A computed property defined in this way might look like this:

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
var Person = Ember.Object.extend({
  firstName: 'Betty',
  lastName: 'Jones',

  fullName: Ember.computed('firstName', 'lastName', function(key, value) {
    return this.get('firstName') + ' ' + this.get('lastName');
  })
});

var client = Person.create();

client.get('fullName'); // 'Betty Jones'

client.set('lastName', 'Fuller');
client.get('fullName'); // 'Betty Fuller'
Note: This is the preferred way to define computed properties when writing third-party libraries that depend on or use Ember, since there is no guarantee that the user will have prototype extensions enabled.

You might use this method if you disabled Prototype Extensions. The alternative syntax might look like this (if prototype extensions are enabled, which is the default behavior):

1
2
3
fullName: function () {
  return this.get('firstName') + ' ' + this.get('lastName');
}.property('firstName', 'lastName')
Parameters:
dependentKeys* [String]
Optional dependent keys that trigger this computed property.
func Function
The computed property function.
Returns:
Ember.ComputedProperty
property descriptor instance
computed.alias (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:524
Creates a new property that is an alias for another property on an object. Calls to get or set this property behave as though they were called on the original property.

1
2
3
4
5
6
7
8
9
10
11
12
var Person = Ember.Object.extend({
  name: 'Alex Matchneer',
  nomen: Ember.computed.alias('name')
});

var alex = Person.create();

alex.get('nomen'); // 'Alex Matchneer'
alex.get('name');  // 'Alex Matchneer'

alex.set('nomen', '@machty');
alex.get('name');  // '@machty'
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which creates an alias to the original value for property.
computed.and (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:384
A computed property that performs a logical and on the original values for the provided dependent properties.

Example

1
2
3
4
5
6
7
8
9
10
11
var Hamster = Ember.Object.extend({
  readyForCamp: Ember.computed.and('hasTent', 'hasBackpack')
});

var hamster = Hamster.create();

hamster.get('readyForCamp'); // false
hamster.set('hasTent', true);
hamster.get('readyForCamp'); // false
hamster.set('hasBackpack', true);
hamster.get('readyForCamp'); // true
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which performs a logical `and` on the values of all the original values for properties.
computed.any (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:452
A computed property that returns the first truthy value from a list of dependent properties.

Example

1
2
3
4
5
6
7
8
9
var Hamster = Ember.Object.extend({
  hasClothes: Ember.computed.any('hat', 'shirt')
});

var hamster = Hamster.create();

hamster.get('hasClothes'); // null
hamster.set('shirt', 'Hawaiian Shirt');
hamster.get('hasClothes'); // 'Hawaiian Shirt'
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which returns the first truthy value of given list of properties.
computed.bool (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:166
A computed property that converts the provided dependent property into a boolean value.

1
2
3
4
5
6
7
8
9
10
11
12
13
var Hamster = Ember.Object.extend({
  hasBananas: Ember.computed.bool('numBananas')
});

var hamster = Hamster.create();

hamster.get('hasBananas'); // false
hamster.set('numBananas', 0);
hamster.get('hasBananas'); // false
hamster.set('numBananas', 1);
hamster.get('hasBananas'); // true
hamster.set('numBananas', null);
hamster.get('hasBananas'); // false
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which converts to boolean the original value for property
computed.collect (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:485
A computed property that returns the array of values for the provided dependent properties.

Example

1
2
3
4
5
6
7
8
9
10
var Hamster = Ember.Object.extend({
  clothes: Ember.computed.collect('hat', 'shirt')
});

var hamster = Hamster.create();

hamster.get('clothes'); // [null, null]
hamster.set('hat', 'Camp Hat');
hamster.set('shirt', 'Camp Shirt');
hamster.get('clothes'); // ['Camp Hat', 'Camp Shirt']
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which maps values of all passed in properties to an array.
computed.deprecatingAlias (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:676 
Available since 1.7.0
Creates a new property that is an alias for another property on an object. Calls to get or set this property behave as though they were called on the original property, but also print a deprecation warning.

Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which creates an alias with a deprecation to the original value for property.
computed.empty (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:44 
Available since 1.6.0
A computed property that returns true if the value of the dependent property is null, an empty string, empty array, or empty function.

Example

1
2
3
4
5
6
7
8
9
10
11
var ToDoList = Ember.Object.extend({
  isDone: Ember.computed.empty('todos')
});

var todoList = ToDoList.create({
  todos: ['Unit Test', 'Documentation', 'Release']
});

todoList.get('isDone'); // false
todoList.get('todos').clear();
todoList.get('isDone'); // true
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which negate the original value for property
computed.equal (dependentKey, value) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:229
A computed property that returns true if the provided dependent property is equal to the given value.

Example

1
2
3
4
5
6
7
8
9
10
11
var Hamster = Ember.Object.extend({
  napTime: Ember.computed.equal('state', 'sleepy')
});

var hamster = Hamster.create();

hamster.get('napTime'); // false
hamster.set('state', 'sleepy');
hamster.get('napTime'); // true
hamster.set('state', 'hungry');
hamster.get('napTime'); // false
Parameters:
dependentKey String
value String|Number|Object
Returns:
Ember.ComputedProperty
computed property which returns true if the original value for property is equal to the given value.
computed.filter (dependentKey, callback) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/reduce_computed_macros.js:241
Filters the array by the callback.

The callback method you provide should have the following signature. item is the current item in the iteration. index is the integer index of the current item in the iteration. array is the dependant array itself.

1
function(item, index, array);
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
var Hamster = Ember.Object.extend({
  remainingChores: Ember.computed.filter('chores', function(chore, index, array) {
    return !chore.done;
  })
});

var hamster = Hamster.create({
  chores: [
    { name: 'cook', done: true },
    { name: 'clean', done: true },
    { name: 'write more unit tests', done: false }
  ]
});

hamster.get('remainingChores'); // [{name: 'write more unit tests', done: false}]
Parameters:
dependentKey String
callback Function
Returns:
Ember.ComputedProperty
the filtered array
computed.filterBy (dependentKey, propertyKey, value) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/reduce_computed_macros.js:308
Filters the array by the property and value

1
2
3
4
5
6
7
8
9
10
11
12
13
var Hamster = Ember.Object.extend({
  remainingChores: Ember.computed.filterBy('chores', 'done', false)
});

var hamster = Hamster.create({
  chores: [
    { name: 'cook', done: true },
    { name: 'clean', done: true },
    { name: 'write more unit tests', done: false }
  ]
});

hamster.get('remainingChores'); // [{ name: 'write more unit tests', done: false }]
Parameters:
dependentKey String
propertyKey String
value *
Returns:
Ember.ComputedProperty
the filtered array
computed.gt (dependentKey, value) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:260
A computed property that returns true if the provided dependent property is greater than the provided value.

Example

1
2
3
4
5
6
7
8
9
10
11
var Hamster = Ember.Object.extend({
  hasTooManyBananas: Ember.computed.gt('numBananas', 10)
});

var hamster = Hamster.create();

hamster.get('hasTooManyBananas'); // false
hamster.set('numBananas', 3);
hamster.get('hasTooManyBananas'); // false
hamster.set('numBananas', 11);
hamster.get('hasTooManyBananas'); // true
Parameters:
dependentKey String
value Number
Returns:
Ember.ComputedProperty
computed property which returns true if the original value for property is greater than given value.
computed.gte (dependentKey, value) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:291
A computed property that returns true if the provided dependent property is greater than or equal to the provided value.

Example

1
2
3
4
5
6
7
8
9
10
11
var Hamster = Ember.Object.extend({
  hasTooManyBananas: Ember.computed.gte('numBananas', 10)
});

var hamster = Hamster.create();

hamster.get('hasTooManyBananas'); // false
hamster.set('numBananas', 3);
hamster.get('hasTooManyBananas'); // false
hamster.set('numBananas', 10);
hamster.get('hasTooManyBananas'); // true
Parameters:
dependentKey String
value Number
Returns:
Ember.ComputedProperty
computed property which returns true if the original value for property is greater or equal then given value.
computed.intersect (propertyKey) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/reduce_computed_macros.js:435
A computed property which returns a new array with all the duplicated elements from two or more dependent arrays.

Example

1
2
3
4
5
6
7
var obj = Ember.Object.createWithMixins({
  adaFriends: ['Charles Babbage', 'John Hobhouse', 'William King', 'Mary Somerville'],
  charlesFriends: ['William King', 'Mary Somerville', 'Ada Lovelace', 'George Peacock'],
  friendsInCommon: Ember.computed.intersect('adaFriends', 'charlesFriends')
});

obj.get('friendsInCommon'); // ['William King', 'Mary Somerville']
Parameters:
propertyKey String
Returns:
Ember.ComputedProperty
computes a new array with all the duplicated elements from the dependent arrays
computed.lt (dependentKey, value) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:322
A computed property that returns true if the provided dependent property is less than the provided value.

Example

1
2
3
4
5
6
7
8
9
10
11
var Hamster = Ember.Object.extend({
  needsMoreBananas: Ember.computed.lt('numBananas', 3)
});

var hamster = Hamster.create();

hamster.get('needsMoreBananas'); // true
hamster.set('numBananas', 3);
hamster.get('needsMoreBananas'); // false
hamster.set('numBananas', 2);
hamster.get('needsMoreBananas'); // true
Parameters:
dependentKey String
value Number
Returns:
Ember.ComputedProperty
computed property which returns true if the original value for property is less then given value.
computed.lte (dependentKey, value) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:353
A computed property that returns true if the provided dependent property is less than or equal to the provided value.

Example

1
2
3
4
5
6
7
8
9
10
11
var Hamster = Ember.Object.extend({
  needsMoreBananas: Ember.computed.lte('numBananas', 3)
});

var hamster = Hamster.create();

hamster.get('needsMoreBananas'); // true
hamster.set('numBananas', 5);
hamster.get('needsMoreBananas'); // false
hamster.set('numBananas', 3);
hamster.get('needsMoreBananas'); // true
Parameters:
dependentKey String
value Number
Returns:
Ember.ComputedProperty
computed property which returns true if the original value for property is less or equal than given value.
computed.map (dependentKey, callback) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/reduce_computed_macros.js:149
Returns an array mapped via the callback

The callback method you provide should have the following signature. item is the current item in the iteration. index is the integer index of the current item in the iteration.

1
function(item, index);
Example

1
2
3
4
5
6
7
8
9
10
11
var Hamster = Ember.Object.extend({
  excitingChores: Ember.computed.map('chores', function(chore, index) {
    return chore.toUpperCase() + '!';
  })
});

var hamster = Hamster.create({
  chores: ['clean', 'write more unit tests']
});

hamster.get('excitingChores'); // ['CLEAN!', 'WRITE MORE UNIT TESTS!']
Parameters:
dependentKey String
callback Function
Returns:
Ember.ComputedProperty
an array mapped via the callback
computed.mapBy (dependentKey, propertyKey) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/reduce_computed_macros.js:198
Returns an array mapped to the specified key.

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
var Person = Ember.Object.extend({
  childAges: Ember.computed.mapBy('children', 'age')
});

var lordByron = Person.create({ children: [] });

lordByron.get('childAges'); // []
lordByron.get('children').pushObject({ name: 'Augusta Ada Byron', age: 7 });
lordByron.get('childAges'); // [7]
lordByron.get('children').pushObjects([{
  name: 'Allegra Byron',
  age: 5
}, {
  name: 'Elizabeth Medora Leigh',
  age: 8
}]);
lordByron.get('childAges'); // [7, 5, 8]
Parameters:
dependentKey String
propertyKey String
Returns:
Ember.ComputedProperty
an array mapped to the specified key
computed.match (dependentKey, regexp) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:196
A computed property which matches the original value for the dependent property against a given RegExp, returning true if they values matches the RegExp and false if it does not.

Example

1
2
3
4
5
6
7
8
9
10
11
var User = Ember.Object.extend({
  hasValidEmail: Ember.computed.match('email', /^.+@.+\..+$/)
});

var user = User.create({loggedIn: false});

user.get('hasValidEmail'); // false
user.set('email', '');
user.get('hasValidEmail'); // false
user.set('email', 'ember_hamster@example.com');
user.get('hasValidEmail'); // true
Parameters:
dependentKey String
regexp RegExp
Returns:
Ember.ComputedProperty
computed property which match the original value for property against a given RegExp
computed.max (dependentKey) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/reduce_computed_macros.js:51
A computed property that calculates the maximum value in the dependent array. This will return -Infinity when the dependent array is empty.

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
var Person = Ember.Object.extend({
  childAges: Ember.computed.mapBy('children', 'age'),
  maxChildAge: Ember.computed.max('childAges')
});

var lordByron = Person.create({ children: [] });

lordByron.get('maxChildAge'); // -Infinity
lordByron.get('children').pushObject({
  name: 'Augusta Ada Byron', age: 7
});
lordByron.get('maxChildAge'); // 7
lordByron.get('children').pushObjects([{
  name: 'Allegra Byron',
  age: 5
}, {
  name: 'Elizabeth Medora Leigh',
  age: 8
}]);
lordByron.get('maxChildAge'); // 8
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computes the largest value in the dependentKey's array
computed.min (dependentKey) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/reduce_computed_macros.js:100
A computed property that calculates the minimum value in the dependent array. This will return Infinity when the dependent array is empty.

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
var Person = Ember.Object.extend({
  childAges: Ember.computed.mapBy('children', 'age'),
  minChildAge: Ember.computed.min('childAges')
});

var lordByron = Person.create({ children: [] });

lordByron.get('minChildAge'); // Infinity
lordByron.get('children').pushObject({
  name: 'Augusta Ada Byron', age: 7
});
lordByron.get('minChildAge'); // 7
lordByron.get('children').pushObjects([{
  name: 'Allegra Byron',
  age: 5
}, {
  name: 'Elizabeth Medora Leigh',
  age: 8
}]);
lordByron.get('minChildAge'); // 5
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computes the smallest value in the dependentKey's array
computed.none (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:107
A computed property that returns true if the value of the dependent property is null or undefined. This avoids errors from JSLint complaining about use of ==, which can be technically confusing.

Example

1
2
3
4
5
6
7
8
9
10
11
var Hamster = Ember.Object.extend({
  isHungry: Ember.computed.none('food')
});

var hamster = Hamster.create();

hamster.get('isHungry'); // true
hamster.set('food', 'Banana');
hamster.get('isHungry'); // false
hamster.set('food', null);
hamster.get('isHungry'); // true
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which returns true if original value for property is null or undefined.
computed.not (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:138
A computed property that returns the inverse boolean value of the original value for the dependent property.

Example

1
2
3
4
5
6
7
8
9
var User = Ember.Object.extend({
  isAnonymous: Ember.computed.not('loggedIn')
});

var user = User.create({loggedIn: false});

user.get('isAnonymous'); // true
user.set('loggedIn', true);
user.get('isAnonymous'); // false
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which returns inverse of the original value for property
computed.notEmpty (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:77
A computed property that returns true if the value of the dependent property is NOT null, an empty string, empty array, or empty function.

Example

1
2
3
4
5
6
7
8
9
var Hamster = Ember.Object.extend({
  hasStuff: Ember.computed.notEmpty('backpack')
});

var hamster = Hamster.create({ backpack: ['Food', 'Sleeping Bag', 'Tent'] });

hamster.get('hasStuff');         // true
hamster.get('backpack').clear(); // []
hamster.get('hasStuff');         // false
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which returns true if original value for property is not empty.
computed.oneWay (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:552
Where computed.alias aliases get and set, and allows for bidirectional data flow, computed.oneWay only provides an aliased get. The set will not mutate the upstream property, rather causes the current property to become the value set. This causes the downstream property to permanently diverge from the upstream property.

Example

1
2
3
4
5
6
7
8
9
10
11
12
13
14
var User = Ember.Object.extend({
  firstName: null,
  lastName: null,
  nickName: Ember.computed.oneWay('firstName')
});

var teddy = User.create({
  firstName: 'Teddy',
  lastName:  'Zeenny'
});

teddy.get('nickName');              // 'Teddy'
teddy.set('nickName', 'TeddyBear'); // 'TeddyBear'
teddy.get('firstName');             // 'Teddy'
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which creates a one way computed property to the original value for property.
computed.or (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:419
A computed property which performs a logical or on the original values for the provided dependent properties.

Example

1
2
3
4
5
6
7
8
9
var Hamster = Ember.Object.extend({
  readyForRain: Ember.computed.or('hasJacket', 'hasUmbrella')
});

var hamster = Hamster.create();

hamster.get('readyForRain'); // false
hamster.set('hasJacket', true);
hamster.get('readyForRain'); // true
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which performs a logical `or` on the values of all the original values for properties.
computed.readOnly (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:600 
Available since 1.5.0
Where computed.oneWay provides oneWay bindings, computed.readOnly provides a readOnly one way binding. Very often when using computed.oneWay one does not also want changes to propagate back up, as they will replace the value.

This prevents the reverse flow, and also throws an exception when it occurs.

Example

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
var User = Ember.Object.extend({
  firstName: null,
  lastName: null,
  nickName: Ember.computed.readOnly('firstName')
});

var teddy = User.create({
  firstName: 'Teddy',
  lastName:  'Zeenny'
});

teddy.get('nickName');              // 'Teddy'
teddy.set('nickName', 'TeddyBear'); // throws Exception
// throw new Ember.Error('Cannot Set: nickName on: <User:ember27288>' );`
teddy.get('firstName');             // 'Teddy'
Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which creates a one way computed property to the original value for property.
computed.reads (dependentKey) Ember.ComputedProperty
Defined in packages/ember-metal/lib/computed_macros.js:588
This is a more semantically meaningful alias of computed.oneWay, whose name is somewhat ambiguous as to which direction the data flows.

Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computed property which creates a one way computed property to the original value for property.
computed.setDiff (setAProperty, setBProperty) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/reduce_computed_macros.js:515
A computed property which returns a new array with all the properties from the first dependent array that are not in the second dependent array.

Example

1
2
3
4
5
6
7
8
9
10
11
12
13
var Hamster = Ember.Object.extend({
  likes: ['banana', 'grape', 'kale'],
  wants: Ember.computed.setDiff('likes', 'fruits')
});

var hamster = Hamster.create({
  fruits: [
    'grape',
    'kale',
  ]
});

hamster.get('wants'); // ['banana']
Parameters:
setAProperty String
setBProperty String
Returns:
Ember.ComputedProperty
computes a new array with all the items from the first dependent array that are not in the second dependent array
computed.sort (dependentKey, sortDefinition) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/reduce_computed_macros.js:626
A computed property which returns a new array with all the properties from the first dependent array sorted based on a property or sort function.

The callback method you provide should have the following signature:

1
function(itemA, itemB);
itemA the first item to compare.
itemB the second item to compare.
This function should return negative number (e.g. -1) when itemA should come before itemB. It should return positive number (e.g. 1) when itemA should come after itemB. If the itemA and itemB are equal this function should return 0.

Therefore, if this function is comparing some numeric values, simple itemA - itemB or itemA.get( 'foo' ) - itemB.get( 'foo' ) can be used instead of series of if.

Example

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
var ToDoList = Ember.Object.extend({
  // using standard ascending sort
  todosSorting: ['name'],
  sortedTodos: Ember.computed.sort('todos', 'todosSorting'),

  // using descending sort
  todosSortingDesc: ['name:desc'],
  sortedTodosDesc: Ember.computed.sort('todos', 'todosSortingDesc'),

  // using a custom sort function
  priorityTodos: Ember.computed.sort('todos', function(a, b){
    if (a.priority > b.priority) {
      return 1;
    } else if (a.priority < b.priority) {
      return -1;
    }

    return 0;
  })
});

var todoList = ToDoList.create({todos: [
  { name: 'Unit Test', priority: 2 },
  { name: 'Documentation', priority: 3 },
  { name: 'Release', priority: 1 }
]});

todoList.get('sortedTodos');      // [{ name:'Documentation', priority:3 }, { name:'Release', priority:1 }, { name:'Unit Test', priority:2 }]
todoList.get('sortedTodosDesc');  // [{ name:'Unit Test', priority:2 }, { name:'Release', priority:1 }, { name:'Documentation', priority:3 }]
todoList.get('priorityTodos');    // [{ name:'Release', priority:1 }, { name:'Unit Test', priority:2 }, { name:'Documentation', priority:3 }]
Parameters:
dependentKey String
sortDefinition String or Function
a dependent key to an array of sort properties (add `:desc` to the arrays sort properties to sort descending) or a function to use when sorting
Returns:
Ember.ComputedProperty
computes a new sorted array based on the sort property array or callback function
computed.sum (dependentKey) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/reduce_computed_macros.js:26 
Available since 1.4.0
A computed property that returns the sum of the value in the dependent array.

Parameters:
dependentKey String
Returns:
Ember.ComputedProperty
computes the sum of all values in the dependentKey's array
computed.union (propertyKey) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/reduce_computed_macros.js:424
Alias for Ember.computed.uniq.

Parameters:
propertyKey String
Returns:
Ember.ComputedProperty
computes a new array with all the unique elements from the dependent array
computed.uniq (propertyKey) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/reduce_computed_macros.js:360
A computed property which returns a new array with all the unique elements from one or more dependent arrays.

Example

1
2
3
4
5
6
7
8
9
10
11
12
13
14
var Hamster = Ember.Object.extend({
  uniqueFruits: Ember.computed.uniq('fruits')
});

var hamster = Hamster.create({
  fruits: [
    'banana',
    'grape',
    'kale',
    'banana'
  ]
});

hamster.get('uniqueFruits'); // ['banana', 'grape', 'kale']
Parameters:
propertyKey String
Returns:
Ember.ComputedProperty
computes a new array with all the unique elements from the dependent array
copy (obj, deep) Object
Defined in packages/ember-runtime/lib/copy.js:65
Creates a clone of the passed object. This function can take just about any type of object and create a clone of it, including primitive values (which are not actually cloned because they are immutable).

If the passed object implements the copy() method, then this function will simply call that method and return the result. Please see Ember.Copyable for further details.

Parameters:
obj Object
The object to clone
deep Boolean
If true, a deep copy of the object is made
Returns:
Object
The cloned object
create
Defined in packages/ember-metal/lib/platform/create.js:15 
Available since 1.8.0
Identical to Object.create(). Implements if not available natively.

debug (message)
Defined in packages/ember-debug/lib/main.js:70
Display a debug notice. Ember build tools will remove any calls to Ember.debug() when doing a production build.

1
Ember.debug('I\'m a debug notice!');
Parameters:
message String
A debug message to display.
deprecate (message, test, options)
Defined in packages/ember-debug/lib/main.js:85
Display a deprecation warning with the provided message and a stack trace (Chrome and Firefox only). Ember build tools will remove any calls to Ember.deprecate() when doing a production build.

Parameters:
message String
A description of the deprecation.
test Boolean
An optional boolean. If falsy, the deprecation will be displayed.
options Object
An optional object that can be used to pass in a `url` to the transition guide on the emberjs.com website.
deprecateFunc (message, func) Function
Defined in packages/ember-debug/lib/main.js:147
Alias an old, deprecated method with its new counterpart.

Display a deprecation warning with the provided message and a stack trace (Chrome and Firefox only) when the assigned method is called.

Ember build tools will not remove calls to Ember.deprecateFunc(), though no warnings will be shown in production.

1
Ember.oldMethod = Ember.deprecateFunc('Please use the new, updated method', Ember.newMethod);
Parameters:
message String
A description of the deprecation.
func Function
The new function called to replace its deprecated counterpart.
Returns:
Function
a new function that wrapped the original function with a deprecation warning
destroy (obj) Void
Defined in packages/ember-metal/lib/watching.js:71
Tears down the meta on an object so that it can be garbage collected. Multiple calls will have no effect.

Parameters:
obj Object
the object to destroy
Returns:
Void
get (obj, keyName) Object
Defined in packages/ember-metal/lib/property_get.js:23
Gets the value of a property on an object. If the property is computed, the function will be invoked. If the property is not defined but the object implements the unknownProperty method then that will be invoked.

If you plan to run on IE8 and older browsers then you should use this method anytime you want to retrieve a property on an object that you don't know for sure is private. (Properties beginning with an underscore '_' are considered private.)

On all newer browsers, you only need to use this method to retrieve properties if the property might not be defined on the object and you want to respect the unknownProperty handler. Otherwise you can ignore this method.

Note that if the object itself is undefined, this method will throw an error.

Parameters:
obj Object
The object to retrieve from.
keyName String
The property key to retrieve
Returns:
Object
the property value or `null`.
getProperties (obj, list) Object
Defined in packages/ember-metal/lib/get_properties.js:4
To get multiple properties at once, call Ember.getProperties with an object followed by a list of strings or an array:

1
2
Ember.getProperties(record, 'firstName', 'lastName', 'zipCode');
// { firstName: 'John', lastName: 'Doe', zipCode: '10011' }
is equivalent to:

1
2
Ember.getProperties(record, ['firstName', 'lastName', 'zipCode']);
// { firstName: 'John', lastName: 'Doe', zipCode: '10011' }
Parameters:
obj Object
list String...|Array
of keys to get
Returns:
Object
immediateObserver (propertyNames, func) 
Defined in packages/ember-metal/lib/mixin.js:827
Specify a method that observes property changes.

1
2
3
4
5
Ember.Object.extend({
  valueObserver: Ember.immediateObserver('value', function() {
    // Executes whenever the "value" property changes
  })
});
In the future, Ember.observer may become asynchronous. In this event, Ember.immediateObserver will maintain the synchronous behavior.

Also available as Function.prototype.observesImmediately if prototype extensions are enabled.

Parameters:
propertyNames String
func Function
Returns:
func
inject.controller (name) Ember.InjectedProperty
Defined in packages/ember-runtime/lib/controllers/controller.js:25
Creates a property that lazily looks up another controller in the container. Can only be used when defining another controller.

Example:

1
2
3
App.PostController = Ember.Controller.extend({
  posts: Ember.inject.controller()
});
This example will create a posts property on the post controller that looks up the posts controller in the container, making it easy to reference other controllers. This is functionally equivalent to:

1
2
3
4
App.PostController = Ember.Controller.extend({
  needs: 'posts',
  posts: Ember.computed.alias('controllers.posts')
});
Parameters:
name String
(optional) name of the controller to inject, defaults to the property's name
Returns:
Ember.InjectedProperty
injection descriptor instance
inject.service (name) Ember.InjectedProperty
Defined in packages/ember-runtime/lib/system/service.js:14
Creates a property that lazily looks up a service in the container. There are no restrictions as to what objects a service can be injected into.

Example:

1
2
3
4
5
6
7
App.ApplicationRoute = Ember.Route.extend({
  authManager: Ember.inject.service('auth'),

  model: function() {
    return this.get('authManager').findCurrentUser();
  }
});
This example will create an authManager property on the application route that looks up the auth service in the container, making it easily accessible in the model hook.

Parameters:
name String
(optional) name of the service to inject, defaults to the property's name
Returns:
Ember.InjectedProperty
injection descriptor instance
inspect (obj) String
Defined in packages/ember-metal/lib/utils.js:812 
Available since 1.4.0
Convenience method to inspect an object. This method will attempt to convert the object into a useful string description.

It is a pretty simple implementation. If you want something more robust, use something like JSDump: https://github.com/NV/jsDump

Parameters:
obj Object
The object you want to inspect.
Returns:
String
A description of the object
isArray (obj) Boolean
Defined in packages/ember-metal/lib/utils.js:447
Returns true if the passed object is an array or Array-like.

Ember Array Protocol:

the object has an objectAt property
the object is a native Array
the object is an Object, and has a length property
Unlike Ember.typeOf this method returns true even if the passed object is not formally array but appears to be array-like (i.e. implements Ember.Array)

1
2
3
Ember.isArray();                                          // false
Ember.isArray([]);                                        // true
Ember.isArray(Ember.ArrayProxy.create({ content: [] }));  // true
Parameters:
obj Object
The object to test
Returns:
Boolean
true if the passed object is an array or Array-like
isBlank (obj) Boolean
Defined in packages/ember-metal/lib/is_blank.js:3 
Available since 1.5.0
A value is blank if it is empty or a whitespace string.

1
2
3
4
5
6
7
8
9
10
11
Ember.isBlank();                // true
Ember.isBlank(null);            // true
Ember.isBlank(undefined);       // true
Ember.isBlank('');              // true
Ember.isBlank([]);              // true
Ember.isBlank('\n\t');          // true
Ember.isBlank('  ');            // true
Ember.isBlank({});              // false
Ember.isBlank('\n\t Hello');    // false
Ember.isBlank('Hello world');   // false
Ember.isBlank([1,2,3]);         // false
Parameters:
obj Object
Value to test
Returns:
Boolean
isEmpty (obj) Boolean
Defined in packages/ember-metal/lib/is_empty.js:4
Verifies that a value is null or an empty string, empty array, or empty function.

Constrains the rules on Ember.isNone by returning true for empty string and empty arrays.

1
2
3
4
5
6
7
8
Ember.isEmpty();                // true
Ember.isEmpty(null);            // true
Ember.isEmpty(undefined);       // true
Ember.isEmpty('');              // true
Ember.isEmpty([]);              // true
Ember.isEmpty({});              // false
Ember.isEmpty('Adam Hawkins');  // false
Ember.isEmpty([0,1,2]);         // false
Parameters:
obj Object
Value to test
Returns:
Boolean
isEqual (a, b) Boolean
Defined in packages/ember-runtime/lib/core.js:6
Compares two objects, returning true if they are logically equal. This is a deeper comparison than a simple triple equal. For sets it will compare the internal objects. For any other object that implements isEqual() it will respect that method.

1
2
3
Ember.isEqual('hello', 'hello');  // true
Ember.isEqual(1, 2);              // false
Ember.isEqual([4, 2], [4, 2]);    // false
Parameters:
a Object
first object to compare
b Object
second object to compare
Returns:
Boolean
isNone (obj) Boolean
Defined in packages/ember-metal/lib/is_none.js:1
Returns true if the passed value is null or undefined. This avoids errors from JSLint complaining about use of ==, which can be technically confusing.

1
2
3
4
5
6
Ember.isNone();              // true
Ember.isNone(null);          // true
Ember.isNone(undefined);     // true
Ember.isNone('');            // false
Ember.isNone([]);            // false
Ember.isNone(function() {});  // false
Parameters:
obj Object
Value to test
Returns:
Boolean
isPresent (obj) Boolean
Defined in packages/ember-metal/lib/is_present.js:5 
Available since 1.8.0
A value is present if it not isBlank.

1
2
3
4
5
6
7
8
9
10
11
Ember.isPresent();                // false
Ember.isPresent(null);            // false
Ember.isPresent(undefined);       // false
Ember.isPresent('');              // false
Ember.isPresent([]);              // false
Ember.isPresent('\n\t');          // false
Ember.isPresent('  ');            // false
Ember.isPresent({});              // true
Ember.isPresent('\n\t Hello');    // true
Ember.isPresent('Hello world');   // true
Ember.isPresent([1,2,3]);         // true
Parameters:
obj Object
Value to test
Returns:
Boolean
keys (obj) Array
Defined in packages/ember-metal/lib/keys.js:3
Returns all of the keys defined on an object or hash. This is useful when inspecting objects for debugging. On browsers that support it, this uses the native Object.keys implementation.

Parameters:
obj Object
Returns:
Array
Array containing keys of obj
makeArray (obj) Array
Defined in packages/ember-metal/lib/utils.js:491
Forces the passed object to be part of an array. If the object is already an array or array-like, it will return the object. Otherwise, it will add the object to an array. If obj is null or undefined, it will return an empty array.

1
2
3
4
5
6
7
8
9
Ember.makeArray();            // []
Ember.makeArray(null);        // []
Ember.makeArray(undefined);   // []
Ember.makeArray('lindsay');   // ['lindsay']
Ember.makeArray([1, 2, 42]);  // [1, 2, 42]

var controller = Ember.ArrayProxy.create({ content: [] });

Ember.makeArray(controller) === controller;  // true
Parameters:
obj Object
the object
Returns:
Array
merge (original, updates) Object
Defined in packages/ember-metal/lib/merge.js:3
Merge the contents of two objects together into the first object.

1
2
3
Ember.merge({first: 'Tom'}, {last: 'Dale'}); // {first: 'Tom', last: 'Dale'}
var a = {first: 'Yehuda'}, b = {last: 'Katz'};
Ember.merge(a, b); // a == {first: 'Yehuda', last: 'Katz'}, b == {last: 'Katz'}
Parameters:
original Object
The object to merge into
updates Object
The object to copy properties from
Returns:
Object
mixin (obj, mixins) 
Defined in packages/ember-metal/lib/mixin.js:473
Parameters:
obj
mixins
Returns:
obj
observer (propertyNames, func) 
Defined in packages/ember-metal/lib/mixin.js:776
Specify a method that observes property changes.

1
2
3
4
5
Ember.Object.extend({
  valueObserver: Ember.observer('value', function() {
    // Executes whenever the "value" property changes
  })
});
In the future this method may become asynchronous. If you want to ensure synchronous behavior, use immediateObserver.

Also available as Function.prototype.observes if prototype extensions are enabled.

Parameters:
propertyNames String
func Function
Returns:
func
on (eventNames, func) 
Defined in packages/ember-metal/lib/events.js:381
Define a property as a function that should be executed when a specified event or events are triggered.

1
2
3
4
5
6
7
8
9
var Job = Ember.Object.extend({
  logCompleted: Ember.on('completed', function() {
    console.log('Job completed!');
  })
});

var job = Job.create();

Ember.sendEvent(job, 'completed'); // Logs 'Job completed!'
Parameters:
eventNames String
func Function
Returns:
func
onLoad (name, callback)
Defined in packages/ember-runtime/lib/system/lazy_load.js:15
Detects when a specific package of Ember (e.g. 'Ember.Handlebars') has fully loaded and is available for extension.

The provided callback will be called with the name passed resolved from a string into the object:

1
2
3
Ember.onLoad('Ember.Handlebars' function(hbars) {
  hbars.registerHelper(...);
});
Parameters:
name String
name of hook
callback Function
callback to be called
oneWay (obj, to, from) Ember.Binding
Defined in packages/ember-metal/lib/binding.js:479
Parameters:
obj Object
The root object of the transform.
to String
The path to the 'to' side of the binding. Must be relative to obj.
from String
The path to the 'from' side of the binding. Must be relative to obj or a global path.
Returns:
Ember.Binding
binding instance
propertyDidChange (obj, keyName) Void
Defined in packages/ember-metal/lib/property_events.js:57
This function is called just after an object property has changed. It will notify any observers and clear caches among other things.

Normally you will not need to call this method directly but if for some reason you can't directly watch a property you can invoke this method manually along with Ember.propertyWillChange() which you should call just before the property value changes.

Parameters:
obj Object
The object with the property that will change
keyName String
The property key (or path) that will change.
Returns:
Void
propertyWillChange (obj, keyName) Void
Defined in packages/ember-metal/lib/property_events.js:19
This function is called just before an object property is about to change. It will notify any before observers and prepare caches among other things.

Normally you will not need to call this method directly but if for some reason you can't directly watch a property you can invoke this method manually along with Ember.propertyDidChange() which you should call just after the property value changes.

Parameters:
obj Object
The object with the property that will change
keyName String
The property key (or path) that will change.
Returns:
Void
reduceComputed (dependentKeys*, options) Ember.ComputedProperty
Defined in packages/ember-runtime/lib/computed/reduce_computed.js:649
Creates a computed property which operates on dependent arrays and is updated with "one at a time" semantics. When items are added or removed from the dependent array(s) a reduce computed only operates on the change instead of re-evaluating the entire array.

If there are more than one arguments the first arguments are considered to be dependent property keys. The last argument is required to be an options object. The options object can have the following four properties:

initialValue - A value or function that will be used as the initial value for the computed. If this property is a function the result of calling the function will be used as the initial value. This property is required.

initialize - An optional initialize function. Typically this will be used to set up state on the instanceMeta object.

removedItem - A function that is called each time an element is removed from the array.

addedItem - A function that is called each time an element is added to the array.

The initialize function has the following signature:

1
function(initialValue, changeMeta, instanceMeta)
initialValue - The value of the initialValue property from the options object.

changeMeta - An object which contains meta information about the computed. It contains the following properties:

property the computed property
propertyName the name of the property on the object
instanceMeta - An object that can be used to store meta information needed for calculating your computed. For example a unique computed might use this to store the number of times a given element is found in the dependent array.

The removedItem and addedItem functions both have the following signature:

1
function(accumulatedValue, item, changeMeta, instanceMeta)
accumulatedValue - The value returned from the last time removedItem or addedItem was called or initialValue.

item - the element added or removed from the array

changeMeta - An object which contains meta information about the change. It contains the following properties:

property the computed property
propertyName the name of the property on the object
index the index of the added or removed item
item the added or removed item: this is exactly the same as the second arg
arrayChanged the array that triggered the change. Can be useful when depending on multiple arrays.
For property changes triggered on an item property change (when depKey is something like someArray.@each.someProperty), changeMeta will also contain the following property:

previousValues an object whose keys are the properties that changed on the item, and whose values are the item's previous values.
previousValues is important Ember coalesces item property changes via Ember.run.once. This means that by the time removedItem gets called, item has the new values, but you may need the previous value (eg for sorting & filtering).

instanceMeta - An object that can be used to store meta information needed for calculating your computed. For example a unique computed might use this to store the number of times a given element is found in the dependent array.

The removedItem and addedItem functions should return the accumulated value. It is acceptable to not return anything (ie return undefined) to invalidate the computation. This is generally not a good idea for arrayComputed but it's used in eg max and min.

Note that observers will be fired if either of these functions return a value that differs from the accumulated value. When returning an object that mutates in response to array changes, for example an array that maps everything from some other array (see Ember.computed.map), it is usually important that the same array be returned to avoid accidentally triggering observers.

Example

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
Ember.computed.max = function(dependentKey) {
  return Ember.reduceComputed(dependentKey, {
    initialValue: -Infinity,

    addedItem: function(accumulatedValue, item, changeMeta, instanceMeta) {
      return Math.max(accumulatedValue, item);
    },

    removedItem: function(accumulatedValue, item, changeMeta, instanceMeta) {
      if (item < accumulatedValue) {
        return accumulatedValue;
      }
    }
  });
};
Dependent keys may refer to @this to observe changes to the object itself, which must be array-like, rather than a property of the object. This is mostly useful for array proxies, to ensure objects are retrieved via objectAtContent. This is how you could sort items by properties defined on an item controller.

Example

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
App.PeopleController = Ember.ArrayController.extend({
  itemController: 'person',

  sortedPeople: Ember.computed.sort('@this.@each.reversedName', function(personA, personB) {
    // `reversedName` isn't defined on Person, but we have access to it via
    // the item controller App.PersonController.  If we'd used
    // `content.@each.reversedName` above, we would be getting the objects
    // directly and not have access to `reversedName`.
    //
    var reversedNameA = get(personA, 'reversedName');
    var reversedNameB = get(personB, 'reversedName');

    return Ember.compare(reversedNameA, reversedNameB);
  })
});

App.PersonController = Ember.ObjectController.extend({
  reversedName: function() {
    return reverse(get(this, 'name'));
  }.property('name')
});
Dependent keys whose values are not arrays are treated as regular dependencies: when they change, the computed property is completely recalculated. It is sometimes useful to have dependent arrays with similar semantics. Dependent keys which end in .[] do not use "one at a time" semantics. When an item is added or removed from such a dependency, the computed property is completely recomputed.

When the computed property is completely recomputed, the accumulatedValue is discarded, it starts with initialValue again, and each item is passed to addedItem in turn.

Example

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
Ember.Object.extend({
  // When `string` is changed, `computed` is completely recomputed.
  string: 'a string',

  // When an item is added to `array`, `addedItem` is called.
  array: [],

  // When an item is added to `anotherArray`, `computed` is completely
  // recomputed.
  anotherArray: [],

  computed: Ember.reduceComputed('string', 'array', 'anotherArray.[]', {
    addedItem: addedItemCallback,
    removedItem: removedItemCallback
  })
});
Parameters:
dependentKeys* [String]
options Object
Returns:
Ember.ComputedProperty
removeBeforeObserver (obj, path, target, method)
Defined in packages/ember-metal/lib/observer.js:103
Parameters:
obj
path String
target Object|Function
method [Function|String]
removeListener (obj, eventName, target, method)
Defined in packages/ember-metal/lib/events.js:141
Remove an event listener

Arguments should match those passed to Ember.addListener.

Parameters:
obj
eventName String
target Object|Function
A target object or a function
method Function|String
A function or the name of a function to be called on `target`
removeObserver (obj, path, target, method)
Defined in packages/ember-metal/lib/observer.js:47
Parameters:
obj
path String
target Object|Function
method [Function|String]
required
Defined in packages/ember-metal/lib/mixin.js:730
Denotes a required property for a mixin

runInDebug (func)
Defined in packages/ember-debug/lib/main.js:173 
Available since 1.5.0
Run a function meant for debugging. Ember build tools will remove any calls to Ember.runInDebug() when doing a production build.

1
2
3
4
5
6
7
Ember.runInDebug(function() {
  Ember.Handlebars.EachView.reopen({
    didInsertElement: function() {
      console.log('I\'m happy');
    }
  });
});
Parameters:
func Function
The function to be executed.
runLoadHooks (name, object)
Defined in packages/ember-runtime/lib/system/lazy_load.js:44
Called when an Ember.js package (e.g Ember.Handlebars) has finished loading. Triggers any callbacks registered for this event.

Parameters:
name String
name of hook
object Object
object to pass to callbacks
sendEvent (obj, eventName, params, actions) 
Defined in packages/ember-metal/lib/events.js:294
Send an event. The execution of suspended listeners is skipped, and once listeners are removed. A listener without a target is executed on the passed object. If an array of actions is not passed, the actions stored on the passed object are invoked.

Parameters:
obj
eventName String
params Array
Optional parameters for each listener.
actions Array
Optional array of actions (listeners).
Returns:
true
set (obj, keyName, value) Object
Defined in packages/ember-metal/lib/property_set.js:16
Sets the value of a property on an object, respecting computed properties and notifying observers and other listeners of the change. If the property is not defined but the object implements the setUnknownProperty method then that will be invoked as well.

Parameters:
obj Object
The object to modify.
keyName String
The property key to set
value Object
The value to set
Returns:
Object
the passed value.
setProperties (obj, properties) 
Defined in packages/ember-metal/lib/set_properties.js:5
Set a list of properties on an object. These properties are set inside a single beginPropertyChanges and endPropertyChanges batch, so observers will be buffered.

1
2
3
4
5
6
7
var anObject = Ember.Object.create();

anObject.setProperties({
  firstName: 'Stanley',
  lastName: 'Stuart',
  age: 21
});
Parameters:
obj
properties Object
Returns:
obj
tryCatchFinally (tryable, catchable, finalizer, binding) *
Defined in packages/ember-metal/lib/utils.js:642
Provides try/catch/finally functionality, while working around Safari's double finally bug.

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
var tryable = function() {
  for (i = 0, l = listeners.length; i < l; i++) {
    listener = listeners[i];
    beforeValues[i] = listener.before(name, time(), payload);
  }

  return callback.call(binding);
};

var catchable = function(e) {
  payload = payload || {};
  payload.exception = e;
};

var finalizer = function() {
  for (i = 0, l = listeners.length; i < l; i++) {
    listener = listeners[i];
    listener.after(name, time(), payload, beforeValues[i]);
  }
};

Ember.tryCatchFinally(tryable, catchable, finalizer);
Parameters:
tryable Function
The function to run the try callback
catchable Function
The function to run the catchable callback
finalizer Function
The function to run the finally callback
binding [Object]
The optional calling object. Defaults to 'this'
Returns:
*
The return value is the that of the finalizer, unless that value is undefined, in which case it is the return value of the tryable.
tryFinally (tryable, finalizer, binding) *
Defined in packages/ember-metal/lib/utils.js:578
Provides try/finally functionality, while working around Safari's double finally bug.

1
2
3
4
5
6
7
8
9
10
var tryable = function() {
  someResource.lock();
  runCallback(); // May throw error.
};

var finalizer = function() {
  someResource.unlock();
};

Ember.tryFinally(tryable, finalizer);
Parameters:
tryable Function
The function to run the try callback
finalizer Function
The function to run the finally callback
binding [Object]
The optional calling object. Defaults to 'this'
Returns:
*
The return value is the that of the finalizer, unless that value is undefined, in which case it is the return value of the tryable
tryInvoke (obj, methodName, args) *
Defined in packages/ember-metal/lib/utils.js:539
Checks to see if the methodName exists on the obj, and if it does, invokes it with the arguments passed.

1
2
3
4
5
var d = new Date('03/15/2013');

Ember.tryInvoke(d, 'getTime');              // 1363320000000
Ember.tryInvoke(d, 'setFullYear', [2014]);  // 1394856000000
Ember.tryInvoke(d, 'noSuchMethod', [2014]); // undefined
Parameters:
obj Object
The object to check for the method
methodName String
The method name to check for
args [Array]
The arguments to pass to the method
Returns:
*
the return value of the invoked method or undefined if it cannot be invoked
trySet (obj, path, value)
Defined in packages/ember-metal/lib/property_set.js:136
Error-tolerant form of Ember.set. Will not blow up if any part of the chain is undefined, null, or destroyed.

This is primarily used when syncing bindings, which may try to update after an object has been destroyed.

Parameters:
obj Object
The object to modify.
path String
The property path to set
value Object
The value to set
typeOf (item) String
Defined in packages/ember-metal/lib/utils.js:736
Returns a consistent type for the passed item.

Use this instead of the built-in typeof to get the type of an item. It will return the same result across all browsers and includes a bit more detail. Here is what will be returned:

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
| Return Value  | Meaning                                              |
|---------------|------------------------------------------------------|
| 'string'      | String primitive or String object.                   |
| 'number'      | Number primitive or Number object.                   |
| 'boolean'     | Boolean primitive or Boolean object.                 |
| 'null'        | Null value                                           |
| 'undefined'   | Undefined value                                      |
| 'function'    | A function                                           |
| 'array'       | An instance of Array                                 |
| 'regexp'      | An instance of RegExp                                |
| 'date'        | An instance of Date                                  |
| 'class'       | An Ember class (created using Ember.Object.extend()) |
| 'instance'    | An Ember object instance                             |
| 'error'       | An instance of the Error object                      |
| 'object'      | A JavaScript object not inheriting from Ember.Object |
Examples:

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
Ember.typeOf();                       // 'undefined'
Ember.typeOf(null);                   // 'null'
Ember.typeOf(undefined);              // 'undefined'
Ember.typeOf('michael');              // 'string'
Ember.typeOf(new String('michael'));  // 'string'
Ember.typeOf(101);                    // 'number'
Ember.typeOf(new Number(101));        // 'number'
Ember.typeOf(true);                   // 'boolean'
Ember.typeOf(new Boolean(true));      // 'boolean'
Ember.typeOf(Ember.makeArray);        // 'function'
Ember.typeOf([1, 2, 90]);             // 'array'
Ember.typeOf(/abc/);                  // 'regexp'
Ember.typeOf(new Date());             // 'date'
Ember.typeOf(Ember.Object.extend());  // 'class'
Ember.typeOf(Ember.Object.create());  // 'instance'
Ember.typeOf(new Error('teamocil'));  // 'error'

// 'normal' JavaScript object
Ember.typeOf({ a: 'b' });             // 'object'
Parameters:
item Object
the item to check
Returns:
String
the type
warn (message, test)
Defined in packages/ember-debug/lib/main.js:52
Display a warning with the provided message. Ember build tools will remove any calls to Ember.warn() when doing a production build.

Parameters:
message String
A warning to display.
test Boolean
An optional boolean. If falsy, the warning will be displayed.
