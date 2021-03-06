function Language(language) {
	var operators = {};
	var op_precedence = 0;
	
	function op(v, assoc,arg_c) {
		//Register an operator
		var memsave = [assoc, op_precedence++, arg_c];
		if (typeof v === 'object') {
			for (var i=0; i<v.length; i++) {
				operators[v[i]] = memsave;
			}
		} else {
			operators[v] = memsave;
		}
	}
	language.forEach(function(o) {
		op(o[0], o[1] || L, (o[2] === undefined) ? 2 : o[2]);
	});
	this.operators = operators;
	this._build();
}
Language.prototype.precedence = function (v) {
    //deprecated('Slow');
	if (!this.operators[v]) {
		throw('Precedence of ' + v + ' not known!');
	}
	return this.operators[v][1];
};

Language.prototype.postfix = function (o) {
	var op = this.operators[o];
	return op[0] === 0 && op[2] === 1;
};
Language.prototype.unary = function (o) {
	var unary_secondarys = ['+', '-', '±'];
	return (unary_secondarys.indexOf(o) != -1) ? ('@' + o) : false;
};

Language.prototype.assoc = function(o) {
	return this.operators[o][1] === true;
};

Language.prototype.Number = function(o) {
	// Support for integers
	var predefined = {
		'0': Global.Zero,
		'1': Global.One
	};
	return predefined[o] || new Expression.NumericalReal(Number(o));
};