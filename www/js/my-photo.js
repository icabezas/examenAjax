let idUser;
$(function ()
  {
      if (isLogged() == null)
      {
          window.location.href = "login.html";
      }
      exit();
      idUser = localStorage.getItem("id_user");
      getListAllPhotoBy(idUser);
      deletePhoto();
  });

function getListAllPhotoBy(idUser)
{
    $.ajax( {
               "method": "POST",
               "url"   : "https://instacordovapp.000webhostapp.com/GetAllPhotoByIdUser.php",
               "data"  : {"id_user": idUser}
           })
     .done(function (info)
           {
               var message = JSON.parse(info);
               console.log(message);
               var html = `<table>
                        <tr>
                            <th>photo</th>
                            <th>hashtag</th>
                            <th>votos</th>
                        </tr>`;

               for (var i in
                   message.data)
               {
                   html += `<tr>
                <td><img src = "${message.data[i].photo_name}" /></td> 
                <td>${message.data[i].hash_tag_name}</td>
                <td>${message.data[i].total_score == null ? 0 : message.data[i].total_score}</td>
                <td><button class="delete-button" value="delete" name="${message.data[i].photo_id}" >X</button></td>
                </tr>`;
               }
               html += `</table>`;
               $("#tabla")
                   .html(html);
           });
}



function isLogged()
{
    return localStorage.getItem("id_user");
}

function deletePhoto()
{
    $(document)
        .on("click", ".delete-button", function ()
        {
            var $idPhoto = $(this)
                .attr("name");
            console.log(idUser);
            $.ajax({
                       "method": "POST",
                       "url"   : "https://instacordovapp.000webhostapp.com/BorrarPhoto.php",
                       "data"  : {"id_photo": $idPhoto}
                   })
             .done(function (info)
                   {
                       getListAllPhotoBy(idUser);
                       //TODO decoment alert(info);
                   });

        });
}

function exit()
{
    $("#exit")
        .on("click", function (e)
        {
            e.preventDefault();
            localStorage.removeItem("id_user");
            window.location.href = "login.html";
        });
}
