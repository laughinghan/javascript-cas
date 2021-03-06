/*
// TODO: Linked list?
function Multiset(x) {
	x.__proto__ = Multiset.prototype;
	return x;
}
Multiset.prototype.intersect = function () {
	
};
Multiset.prototype.union = function (x){
	return Multiset(Array.prototype.concat.call(this, x));
};
Multiset.prototype.add = function (x){
	this[this.length] = x;
	return this;
};
Multiset.prototype.remove = function (x) {
	var i = this.indexOf(x);
	this[i] = this[this.length - 1];
	this.length--;
	return this;
};
Multiset.prototype.map = function (x) {
	return Multiset(Array.prototype.map.call(this, x));
};
Multiset.prototype.filter = function (x) {
	return Multiset(Array.prototype.filter.call(this, x));
};
*/
function MultiSet(A, m) {
	this.A = A || [];
	this.m = m || [];
}
MultiSet.prototype.add = function (x) {
	// CHeck if it already exists
	var i = this.A.indexOf(x);
	if (i === -1) {
		var l = this.length;
		this.A[l] = x;
		this.m[l] = 1;
	} else {
		this.m[i]++;
	}
	return this;
};
MultiSet.prototype.remove = function (x) {
	var i = this.A.indexOf(x);
	this.m[i]--;
	return this;
};
MultiSet.prototype.intersect = function (x) {
	// -> Multiset
	throw ('What is multiset intersection?');
};
MultiSet.prototype.map = function (x) {
	// TODO: Should this supply m(A) ?
	return Multiset(Array.prototype.map.call(this.A, x), this.m);
};
MultiSet.fromArray = function (arr) {
	// O(n^2 ?)
	var A = [];
	var m = [];
	return new MultiSet(A, m);
};