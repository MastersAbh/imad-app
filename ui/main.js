var but=document.getElementById('counter');
var c=0;
but.onclick= function(){
  
  
  
  c= c + 1;
  var sp=document.getElementById('c');
  sp.innerHTML=c.toString();
};

var im= document.getElementById('ma');
im.onclick = function() {
  im.style.marginLeft='100px';  
};