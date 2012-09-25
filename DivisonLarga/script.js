function div(){

	var dividendo = document.getElementById('dividendo').value;
	var divisor = document.getElementById('divisor').value;
	var cociente = document.getElementById('cociente');

	document.getElementById('residuos').innerHTML = "";

	document.getElementById('dividendo').style.background = "background: rgba(56,56,56,0.5)";
	document.getElementById('divisor').style.background = "background: rgba(56,56,56,0.5)";

	var dotAtDiv = divisor.indexOf(".");
	if(dotAtDiv>=0)
	{	
		var u = (divisor.length - 1 ) - dotAtDiv;
		dividendo = parseFloat(dividendo) * (Math.pow(10,u));
		divisor = parseFloat(divisor) * (Math.pow(10,u));
	}

	var div = dividendo.toString();
	var cos="",res,d = 0;

	if(div === "0"){
		cos += "0";
		cociente.innerHTML = cos;
		return false;
	}


	div = div.split('')

	var i=0,j=0;
	
	while(i<div.length){
		

		var dt = parseFloat(div[i]);

		if(div[i+1] == '.' && parseFloat(divisor) > dt){
			cos += ".";
			d++;
			div.splice(i+1,1);

			continue;
		}

		if(div.length == 1 && parseFloat(divisor) > dt)
		{	
			if(d<1)
				cos += ".";
			if(d>10)
			 break;

			document.getElementById('dividendo').value += "0";
			putGfxM((dt.toString() + "0"),j);

			d++;
			div[0] = (dt * 10);
			dt = dt * 10;
		}

		if(parseFloat(divisor) > dt)
		{
			div[i] = addDigit(dt,div[i+1]);
			div.splice(i+1,1);

			dt = parseFloat(div[i]);
			if(parseFloat(divisor) > dt)
			{
				cos += "0";
				cociente.innerHTML = cos;
			}

			if(j>0)
				putGfxM(div[i],j)

			continue;
		}else{
			
			cos += (Math.floor(div[0] / divisor)).toString();
			res = div[0]%divisor;

			if(res == 0 && div.length == 1){
				div.splice(0,1);					
				cos += div.join('');
				putGfx(res,j);
				j++;
				cociente.innerHTML = cos;
				break;
			} 	
			putGfx(res,j);
			j++;
			cociente.innerHTML = cos;
			div[0] = res;
		}
	}
}

function addDigit(base,digit)
{
	base = base.toString();
	base += digit;
	return base;
}

function putGfx(res,j){
	var ar = document.createElement('article');
	var rs = document.getElementById('residuos');
	var rell = "";

	for(k=0;k<j;k++)
		rell+="_";

	var ch = document.createTextNode(rell+res);
	ar.setAttribute('id','res'+j.toString());

	ar.appendChild(ch);
	rs.appendChild(ar);
}

//
function putGfxM(res,j){
	var ar = document.getElementById('res'+j);
	var rs = document.getElementById('residuos');
	var rell = "";
	try{
	ar.innerHTML = "";}catch(err){
		return false;
	}
	for(k=0;k<(j);k++)
		rell+="_";

	var ch = document.createTextNode(rell+res);

	ar.appendChild(ch);
}

function check(){
	var dividendo = document.getElementById('dividendo');
	var divisor = document.getElementById('divisor');

	var ddv = dividendo.value.toString();
	var dsv = divisor.value.toString();

	if(ddv === ""){
		dividendo.style.background = "rgba(225,24,24,0.6)";
		dividendo.focus();
		return false;
	}
	if(dsv === ""){
		divisor.style.background = "rgba(225,24,24,0.6)";
		divisor.focus();
		return false;
	}

	if(dsv === "0")
	{
		divisor.style.background = "rgba(225,24,24,0.6)";
		divisor.focus();
		return;
	}

	if((/[A-z]/g).test((divisor.value).toString())){
		divisor.style.background = "rgba(225,24,24,0.6)";
		return false;
	}

	if((/[A-z]/g).test((dividendo.value).toString())){
		dividendo.style.background = "rgba(225,24,24,0.6)";
		return false;
	}


	div();
}