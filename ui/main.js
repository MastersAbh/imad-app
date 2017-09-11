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



var submit=document.getElementById('submit_btn');

submit.onclick= function() {
    var input=document.getElementById('name');
var name=input.value;
    var request=new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                alert("Logged In");
            }
            else{
                alert("Incorrect");
            }
        }
    };
    var username= document.getElementById('username').value;
    var password= document.getElementById('password').value;
    request.open('POST', 'http://mastersabhinav.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username, password: password}));
    
}