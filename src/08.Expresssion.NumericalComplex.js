Expression.NumericalComplex = function(real, imag) {
	this._real = real;
	this._imag = imag;
};

Expression.NumericalComplex.prototype = Object.create(Expression.Constant.prototype);
Expression.NumericalComplex.prototype.real = function() {
	return new Expression.NumericalReal(this._real);
};
Expression.NumericalComplex.prototype.imag = function() {
	return new Expression.NumericalReal(this._imag);
};
Expression.NumericalComplex.prototype.realimag = function() {
	return Expression.List.ComplexCartesian([
		new Expression.NumericalReal(this._real),
		new Expression.NumericalReal(this._imag)
	]);
};
Expression.NumericalComplex.prototype.conjugate = function() {
	return new Expression.NumericalComplex(this._real, -this._imag);
};
Expression.NumericalComplex.prototype['+'] = function (x) {
	if(this._real === 0 && this._imag === 0) {
		return x;
	}
	if(x.constructor === this.constructor){
		return new Expression.NumericalComplex(this._real + x._real, this._imag + x._imag);
	} else if (x.constructor === Expression.NumericalReal) {
		return new Expression.NumericalComplex(this._real + x.value, this._imag);
	} else if(x.constructor === Expression.List.ComplexCartesian) {
		return (x)['+'](this);
	} else if(x.constructor === Expression.List.ComplexPolar) {	
		return (x)['+'](this);
	} else if(x.constructor === Expression.List.Real) {
		return (x)['+'](this);
	} else if(x.constructor === Expression.Symbol.Real) {
		return (x)['+'](this);
	} else if(x.constructor === Expression.List) {
		return (x)['+'](this);
	} else {
		throw ('Unknown Type for NumericalComplex +');
	}
};
Expression.NumericalComplex.prototype['-'] = function (x) {
	if(this._real === 0 && this._imag === 0) {
		return x['@-']();
	}
	if(x.constructor === this.constructor){
		return new Expression.NumericalComplex(this._real - x._real, this._imag - x._imag);
	} else if (x.constructor === Expression.NumericalReal) {
		return new Expression.NumericalComplex(this._real - x.value, this._imag);
	} else if(x.constructor === Expression.List.ComplexCartesian) {
		return (x['@-']())['+'](this);
	} else if(x.constructor === Expression.List.ComplexPolar) {	
		return (x['@-']())['+'](this);
	} else if(x.constructor === Expression.List.Real) {
		return (x['@-']())['+'](this);
	} else if(x.constructor === Expression.Symbol.Real) {
		return (x['@-']())['+'](this);
	} else if(x.constructor === Expression.List) {
		return (x['@-']())['+'](this);
	} else {
		throw ('Unknown Type for NumericalComplex -');
	}
};
Expression.NumericalComplex.prototype['*'] = function (x) {
	if(this._imag === 0) {
		if(this._real === 0) {
			return Global.Zero;
		}
		if(this._real === 1) {
			return x;
		}
	}
	
	if(x.constructor === this.constructor){
		return new Expression.NumericalComplex(this._real * x._real - this._imag * x._imag, this._real * x._imag + this._imag * x._real);
	} else if (x.constructor === Expression.NumericalReal) {
		return new Expression.NumericalComplex(this._real * x.value, this._imag * x.value);
	} else if(x.constructor === Expression.List.ComplexCartesian) {
		return (x)['*'](this);
	} else if(x.constructor === Expression.List.ComplexPolar) {	
		return (x)['*'](this);
	} else if(x.constructor === Expression.List.Real) {
		return (x)['*'](this);
	} else if(x.constructor === Expression.Symbol.Real) {
		return (x)['*'](this);
	} else if(x.constructor === Expression.List) {
		return (x)['*'](this);
	} else {
		throw ('Unknown Type for NumericalComplex *');
	}
};

Expression.NumericalComplex.prototype['/'] = function (x) {
	if(this._imag === 0 && this._real === 0) {
		// TODO: Provided x != 0
		return Global.Zero;
	}
	
	if(x.constructor === this.constructor){
		var cc_dd = x._real * x._real + x._imag * x._imag;
		return new Expression.NumericalComplex((this._real * x._real + this._imag * x._imag)/cc_dd, (this._imag * x._real - this._real * x._imag) / cc_dd);
	} else if (x.constructor === Expression.NumericalReal) {
		return new Expression.NumericalComplex(this._real / x.value, this._imag / x.value);
	} else if(x.constructor === Expression.List.ComplexCartesian) {
		return this.realimag()['/'](x);
	} else if(x.constructor === Expression.List.ComplexPolar) {	
		return this.polar()['/'](x);
	} else if(x.constructor === Expression.List.Real) {
		return Expression.List([this, x], '/');
	} else if(x.constructor === Expression.Symbol.Real) {
		return Expression.List([this, x], '/');
	} else if(x.constructor === Expression.List) {
		return Expression.List([this, x], '/');
	} else {
		throw ('Unknown Type for NumericalComplex /');
	}
};

Expression.NumericalComplex.prototype['!'] = function (){
	return Global.Gamma.default(this);
};
(function(){
	return;
	var one_on_rt2 = 1/Math.sqrt(2);
	Expression.NumericalComplex.prototype.apply = function(operator, x) {
		switch (operator){
			case '^':
				if(this._real === 0 && this._imag === 0) {
					return Global.Zero; // Contradicts x^0 = 1
				}
				break;
			case '+':
				if(this._real === 0 && this._imag === 0) {
					return x;
				}
				break;
			case '-':
				if(this.value === 0) {
					return x.apply('@-');
				}
				break;
			case undefined:
			case '*':
				if(this._real === 1 && this._imag === 0){
					return x;
				}
				//Note: There is not meant to be a break here.
			case '/':
				if(this._real === 0 && this._imag === 0){
					return Global.Zero; //Contradics x/0 = Infinity
				}
		}
		if (operator === ',') {
			return Expression.Vector([this, x]);
		} else if (x === undefined) {
			switch (operator) {
				
				case '@+':
					return this;
				case '@-':
					return new Expression.NumericalComplex(-this._real, -this._imag);
				case '\u221A':
					throw('OLD SQRT. New one is a function, not operator.')
					return new Expression.NumericalComplex(p, q);
				case '++':
				case '--':
					throw(new TypeError('Postfix ' +operator + ' operator applied to value that is not a reference.'));
				case '+=':
				case '-=':
				case '*=':
				case '/=':
					throw(new ReferenceError('Left side of assignment is not a reference.'));
				case '!':
					return Global.Gamma.apply(undefined, new Expression.NumericalComplex(this._real + 1, this._imag));
			}
		} else if (x.constructor === Expression.NumericalReal) {
			switch (operator) {
				case '*':
				case undefined:
					return new Expression.NumericalComplex(this._real * x.value, this._imag * x.value);
				case '+':
					return new Expression.NumericalComplex(this._real + x.value, this._imag);
				case '-':
					return new Expression.NumericalComplex(this._real - x.value, this._imag);
				case '/':
					return new Expression.NumericalComplex(this._real / x.value, this._imag / x.value);
				case '^':
					var a = this._real;
				    var b = this._imag;
				    var c = x.value;

				    var hlm = 0.5 * Math.log(a*a + b*b);
				    var theta = Math.atan2(b, a);
				    var hmld_tc = theta * c;
				    var e_hmlc_td = Math.exp(hlm * c);
                    return new Expression.NumericalComplex(
                        (e_hmlc_td * Math.cos(hmld_tc)),
				        (e_hmlc_td * Math.sin(hmld_tc))
                    );
				default:
			}
		} else if (x.constructor === this.constructor) {
			switch (operator) {
				case '*':
				case undefined:
					// (a+bi)(c+di) = (ac-bd) + (ad+bc)i 
					return new Expression.NumericalComplex(this._real * x._real - this._imag * x._imag, this._real * x._imag + this._imag * x._real);
				case '+':
					return new Expression.NumericalComplex(this._real + x._real, this._imag + x._imag);
				case '-':
					return new Expression.NumericalComplex(this._real - x._real, this._imag - x._imag);
				case '/':
					//	(a+bi)/(c+di) 
					//= [(a+bi)(c-di)]/[(c+di)(c-di)]
					//= [(a+bi)(c-di)]/[cc + dd]
					//=	[ac -dai +bci + bd]/[cc+dd]
					//= [ac + bd + (bc - da)]/[cc+dd]
					var cc_dd = x._real * x._real + x._imag * x._imag;
					return new Expression.NumericalComplex((this._real * x._real + this._imag * x._imag)/cc_dd, (this._imag * x._real - this._real*x._imag)/cc_dd);
				case '^':
				    var a = this._real;
				    var b = this._imag;
				    var c = x._real;
				    var d = x._imag;

				    var hlm = 0.5 * Math.log(a*a + b*b);
				    var theta = Math.atan2(b, a);
				    var hmld_tc = hlm * d + theta * c;
				    var e_hmlc_td = Math.exp(hlm * c - theta * d);
                    return new Expression.NumericalComplex(
                        (e_hmlc_td * Math.cos(hmld_tc)),
				        (e_hmlc_td * Math.sin(hmld_tc))
                    );
				default:
			}
		} else if(x.constructor === Expression.List.ComplexCartesian) {
			return this.realimag().apply(operator, x);
		} else if(x.constructor === Expression.List.ComplexPolar) {
			return this.polar().apply(operator, x);
		} else if(x.constructor === Expression.List.Real) {
			return this.realimag().apply(operator, x);
		} else if(x.constructor === Expression.Symbol.Real) {
			return this.realimag().apply(operator, x);
		}
		console.error('cmplx . ' + operator + ' => E.List?');
		/*
		if(this._real === 0.0 && this._imag === 0.0){
			return this;
		}
		*/
		
		
		return this.realimag().apply(operator, x);
		return Expression.List([this, x], operator);
	}
	
}());

Expression.NumericalComplex.prototype.constructor = Expression.NumericalComplex;