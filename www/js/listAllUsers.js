let idUser;
$(function ()
  {
      idUser = localStorage.getItem("id_user");
      getListAllUsers();
  });
  
  function getListAllUsers(){
    $.ajax( {
               "method": "POST",
               "url"   : "https://instacordovapp.000webhostapp.com/GetListAllUsers.php",
               "data"  : {"id_user": idUser}
           })
     .done(function (info)
           {
               var message = JSON.parse(info);
               console.log(message);
               var html = `<li>`;

               for (var i in
                   message.data)
               {
                   html += `<ul>${message.data[i].email}</ul>`;
               }
               html += `</li>`;
               $("#listaUsuarios")
                   .html(html);
           });
}
