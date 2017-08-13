var but=document.getElementById('counter');
but.onclick= function(){
    
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechanged = function(){
      if(request.readystate === XMLHttpRequest.DONE){
          if(request.status === 200){
              var counter = request.responseText;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
          }
      }
        
    };
    
    
    request.open('GET','http://mastersabhinav.imad.hasura-app.io/counter',true);
    request.send(null);
};

var im= document.getElementById('ma');
im.onclick = function() {
  im.style.marginLeft='100px';  
};