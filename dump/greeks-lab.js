function parseChain(text){

let lines=text.trim().split("\n");

let data=[];

for(let i=1;i<lines.length;i++){

let parts=lines[i].trim().split(/\s+/);

data.push({
strike:parseFloat(parts[0]),
delta:parseFloat(parts[1]),
theta:parseFloat(parts[2]),
gamma:parseFloat(parts[3]),
vega:parseFloat(parts[4])
});

}

return data;
}



function combineGreeks(a,b,c,d){

return{

delta:a.delta+b.delta+c.delta+d.delta,
theta:a.theta+b.theta+c.theta+d.theta,
gamma:a.gamma+b.gamma+c.gamma+d.gamma,
vega:a.vega+b.vega+c.vega+d.vega

}

}



function checkCondor(g){

return(
g.delta>=-20 &&
g.delta<=20 &&
g.theta>=20 &&
g.gamma<1 &&
g.vega<0
);

}



function checkFly(g){

return(
g.delta>=-10 &&
g.delta<=10 &&
g.theta>=60 &&
g.gamma<3 &&
g.vega<0
);

}



function analyzeChain(){

let text=document.getElementById("chainInput").value;

let chain=parseChain(text);

let best=null;

for(let i=0;i<chain.length;i++){

for(let j=0;j<chain.length;j++){

for(let k=0;k<chain.length;k++){

for(let l=0;l<chain.length;l++){

if(i===j||i===k||i===l||j===k||j===l||k===l) continue;

let g=combineGreeks(
chain[i],
chain[j],
chain[k],
chain[l]
);

if(checkCondor(g)||checkFly(g)){

best={
legs:[
chain[i].strike,
chain[j].strike,
chain[k].strike,
chain[l].strike
],
greeks:g,
type:checkFly(g)?"Iron Fly":"Iron Condor"
};

}

}

}

}

}

displayResult(best);

}



function displayResult(res){

let box=document.getElementById("resultBox");

if(!res){

box.innerHTML="❌ No valid strategy found";

return;

}

box.innerHTML=`

Strategy: ${res.type}

Strikes:
${res.legs.join(" | ")}

Greeks
Delta: ${res.greeks.delta.toFixed(2)}
Theta: ${res.greeks.theta.toFixed(2)}
Gamma: ${res.greeks.gamma.toFixed(2)}
Vega: ${res.greeks.vega.toFixed(2)}

✅ GO

`;

}
