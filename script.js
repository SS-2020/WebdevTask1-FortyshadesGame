var millisecLabel = document.getElementById("ms");
var secondsLabel = document.getElementById("sec");
var msec = 0,sec=0;
var sm=setInterval(setTime,1);
var ss=setInterval(setsec,1000);
var X,Y;
var ct;
function openform() {
	document.querySelector("#options").style.display = "block";
}
var t="";
function gamestart(x,y){
	document.querySelector("#Cover").style.display="none";
	document.querySelector("#Game").style.display="block";
	document.querySelector("#options").style.display = "none";
	const N = x*y;
	X=x;
	Y=y;
	if(N==20)
		if(normal.length!=0)
			t=normal[0];
	else if(N==25)
		if(easy.length!=0)
			t=easy[0];
	else if(N==30)
		if(med.length!=0)
			t=med[0];
	else if(N==36)
		if(hard.length!=0)
			t=hard[0];
	document.querySelector("#Bs").innerHTML=t;
	var arr = Array.from(Array(N+1).keys()).slice(1);
	var ranNums=shuffle(arr);
	var i=0;
	area = document.querySelector("#gamearea");
	var h=parseInt(window.innerHeight*0.95);
	var w=parseInt(window.innerWidth*0.85);
	h=h/(parseInt(x)*2);
	w=w/(parseInt(y)*2);
	var table = document.createElement("table");
	table.id="gametable";
	console.log(ranNums);
	for(var i=0;i<x;i++)
	{
		let tr = document.createElement("tr");
		for(var j=0;j<y;j++)
		{
			var k=i*y+j;
			let c=(ranNums[k])/(x*y*2);
			let td = document.createElement("td");
			td.id='n'+k;
			let no = document.createTextNode(ranNums[k]);
			t=td.innerHTML;
			td.style.width=w+"px";
			td.style.height=h+"px";
			if(N!=20){
				td.style.color="yellow";
				td.style.backgroundColor="rgba(34, 167, 240,"+c+")";
			}
			else{
				td.style.color="green";
				td.style.backgroundColor="black";
			}
			td.onclick= clicked;
			td.appendChild(no);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	area.appendChild(table);
}

function setTime()
{
    ++msec;
    millisecLabel.innerHTML = pad(msec%100);
}

function setsec()
{
    ++sec;
	secondsLabel.innerHTML = sec;
}

function pad(val)
{
    var valString = val + "";
	if(valString.length < 2)
	{
	return "0" + valString;
	}else{
        return valString;
    }
}

function shuffle(array) {
    var i = array.length,j = 0,temp;
    while (i--) {
		j = Math.floor(Math.random() * (i+1));
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
    }
    return array;
}

var count=0,correct=1;

var clicked=function()
{
	var m=X*Y;
	n=this.id;
	if(document.getElementById(n).innerHTML==correct)
	{
		document.querySelector('.move').play();
		if(count<m)
		{
			count=count+1; 
			document.getElementById(n).innerHTML=correct+m;
			if(m!=20)
			{
				var c= 0.5+ correct/(2*m);
				document.getElementById(n).style.backgroundColor="rgba(34, 167, 240,"+c+")";
			}
		}else if(count>=m)
        {
			document.getElementById(n).innerHTML=' ';
			count=count+1;
		}
		correct=correct+1;
		if(correct==2*m+1)
		{
			document.querySelector('.over').play();
			clearInterval(ss);
			clearInterval(sm);
			ct=document.getElementById("sec").innerHTML+"."+document.getElementById("ms").innerHTML;
			document.getElementById("score").innerHTML+=""+ct+"";
			update(m);
			document.querySelector("#Game").style.display="none";
			document.getElementById("endgame").style.display="block";
		} 
	}
}	
var normal=[],easy=[],med=[],hard=[];
window.onload
{
	getscores();
}
function getscores()
{
	normal=JSON.parse(localStorage.getItem("normal"));
	if(!normal)
	{
		normal=[];
	}
	easy=JSON.parse(localStorage.getItem("easy"));
	if(!easy)
	{
		easy=[];
	}
	med=JSON.parse(localStorage.getItem("med"));
	if(!med)
	{
		med=[];
	}
	hard=JSON.parse(localStorage.getItem("hard"));
	if(!hard)
	{
		hard=[];
	}
}

function sortbest(best)
{
    var lgt=best.length;
    for(var i=0;i<lgt;i++)
    {
        var si=parseFloat(best[i]);
        for(var j=0;j<i;j++)
        {
         	var sj=parseFloat(best[j]);
         	if(si<sj)
         	{
         		var tp=best[i];
         		best[i]=best[j];
         		best[j]=tp;
         	}
        }
    }
}

function update(m)
{
    if(m==20)
	{
		normal.push(ct);
		sortbest(normal);
		var str=JSON.stringify(normal);
		localStorage.setItem("normal",str);
	}
	else if(m==25)
	{
		easy.push(ct);
		sortbest(easy);
		var str=JSON.stringify(easy);
		localStorage.setItem("easy",str);
	}
	else if(m==30)
	{
		med.push(ct);
		sortbest(med);
		var str=JSON.stringify(med);
		localStorage.setItem("med",str);
	}
	else if(m==36)
	{
		hard.push(ct);
		sortbest(hard);
		var str=JSON.stringify(hard);
		localStorage.setItem("hard",str);
	}
		var l=normal.length;
		var j=(5<l?5:l);
		for(var i=0;i<j;i++)
		{
			document.getElementById("normal").innerHTML+="<p>"+(i+1)+")"+normal[i]+"</p>";
		}
		l=easy.length;
		j=(5<l?5:l);
		for(var i=0;i<j;i++)
		{
			document.getElementById("easy").innerHTML+="<p>"+(i+1)+")"+easy[i]+"</p>";
		}
		l=med.length;
		j=(5<l?5:l);
		for(var i=0;i<j;i++)
		{
			document.getElementById("med").innerHTML+="<p>"+(i+1)+")"+med[i]+"</p>";
		}
		l=hard.length;
		j=(5<l?5:l);
		for(var i=0;i<j;i++)
		{
			document.getElementById("hard").innerHTML+="<p>"+(i+1)+")"+hard[i]+"</p>";
		}
}
