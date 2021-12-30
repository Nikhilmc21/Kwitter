//YOUR FIREBASE LINKS

//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyBXsBdtU7AHdJXeZMD8JC9QUwAx4AtIz4w",
      authDomain: "kwitter-ae008.firebaseapp.com",
      databaseURL: "https://kwitter-ae008-default-rtdb.firebaseio.com",
      projectId: "kwitter-ae008",
      storageBucket: "kwitter-ae008.appspot.com",
      messagingSenderId: "429206430735",
      appId: "1:429206430735:web:d524b32c176fa1199daf7a"
    };
    
    // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");
    function send()
    {
          msg = document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0    
          });
          document.getElementById("msg").value = "";
    }
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
      firebase_message_id = childKey;
      message_data = childData;
      name1 = message_data['name'];
      message = message_data['message'];
      like = message_data['like'];
      name_with_tag = "<h4>"+name1+"<img class='user_tick' src='tick.png'></h4>";
      message_with_tag = "<h4 class='message_h4'>"+message+"</h4>";
      like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatedLike(this.id)'>";
      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
      row = name_with_tag + message_with_tag+like_button+span_with_tag;
      document.getElementById("output").innerHTML += row;
   } });  }); }
getData();
function updatedLike(message_id)
{
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes)+1;
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}
