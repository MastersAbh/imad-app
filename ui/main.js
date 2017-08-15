/*var button = document.getElementById('counter');

button.onclick = function() {
    
    var request =new XMLHttpRequest();
    
    
    request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 200){
              var counter = request.responseText;
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
          }
      }
        
    };
    
    request.open('GET', 'http://mastersabhinav.imad.hasura-app.io/counter', true);
    request.send(null);
};*/

var button= document.getElementById('counter');
button.onclick = function(){
 
var request=new XMLHttpRequest();
request.onreadystatechange= function()
{
    if(request.readyState === XMLHttpRequest.DONE)
    {
        if(request.status===200){
        var counter=request.responseText;
        var span= document.getElementById('count');
        span.innerHTML=counter.toString();
    }
    }
};
 
 request.open('GET', 'http://mastersabhinav.imad.hasura-app.io/counter',true);
 request.send(null);
 

};

var submit=document.getElementById('sub');

submit.onclick= function() {
    var input=document.getElementById('name');
var name=input.value;
    var request=new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var names= request.responseText;
                names=JSON.parse(names);
                var list='';
                for(var i=0;i<names.length;i++){
                    list+= '<li>'+names[i]+'</li>';
                }
                var ul=document.getElementById('namelist');
                ul.innerHTML=list;
            }
        }
    };
    
    request.open('GET', 'http://mastersabhinav.imad.hasura-app.io/sub?name='+name, true);
    request.send(null);
    
}