function Person() {}
Person.prototype.eyes = 2;
Person.prototype.nose = 1;
var kim  = new Person();
var park = new Person();

kim.eyes = 1

console.log(kim.eyes); // => 2
console.log(park.eyes); // => 2
