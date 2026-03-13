async function generate(){

let bookId=document.getElementById("bookId").value
let rating=document.getElementById("rating").value
let views=document.getElementById("views").value
let ads=document.getElementById("ads").value

let res=await fetch("https://dramabox.sansekai.my.id/api/dramabox/detail?bookId="+bookId)
let data=await res.json()

let title=data.bookName
let thumb=data.coverWap
let synopsis=data.introduction
let totalEpisode=data.chapterCount

let html=`

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>

body{
margin:0;
font-family:Arial;
background:#0f1115;
color:#e2e8f0;
}

.container{
max-width:800px;
margin:auto;
background:#1a1d24;
min-height:100vh;
}

.header{
padding:15px;
border-bottom:1px solid #333;
display:flex;
justify-content:space-between;
}

.player{
position:relative;
background:black;
cursor:pointer;
}

.player img{
width:100%;
opacity:0.6;
}

.play{
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
font-size:40px;
color:#facc15;
}

.loader{
position:absolute;
inset:0;
background:rgba(0,0,0,0.9);
display:none;
align-items:center;
justify-content:center;
}

.spinner{
border:4px solid #444;
border-top:4px solid #facc15;
border-radius:50%;
width:40px;
height:40px;
animation:spin 1s linear infinite;
}

@keyframes spin{
100%{transform:rotate(360deg);}
}

.info{
padding:15px;
}

.episodes{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:8px;
padding:15px;
}

.ep{
background:#272b36;
padding:10px;
text-align:center;
cursor:pointer;
border-radius:6px;
}

</style>

</head>

<body>

<div class="container">

<div class="header">
<h3>${title}</h3>
<span style="background:#facc15;color:black;padding:3px 6px;font-size:10px">VIP</span>
</div>

<div class="player" onclick="goAd()">

<img src="${thumb}">

<div class="play">▶</div>

<div id="ld" class="loader">
<div class="spinner"></div>
</div>

</div>

<div class="info">

<div>⭐ ${rating} | ${views} Views</div>

<p>${synopsis}</p>

</div>

<div class="episodes" id="ep"></div>

</div>

<script>

function goAd(){

document.getElementById("ld").style.display="flex"

setTimeout(function(){

window.location.href="${ads}"

},1800)

}

let ep=document.getElementById("ep")

for(let i=1;i<=${totalEpisode};i++){

let d=document.createElement("div")

d.className="ep"

d.innerText=i

d.onclick=goAd

ep.appendChild(d)

}

</script>

</body>
</html>

`

document.getElementById("output").value=html

document.getElementById("preview").srcdoc=html

}

function copyHTML(){

let text=document.getElementById("output")

text.select()

document.execCommand("copy")

alert("HTML Copied")

}
