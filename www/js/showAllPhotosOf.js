$(function ()
  {
      getListAllPhoto();
  });
  
function getUser(){
    
}


function getListAllPhoto(userEmail)
{
     $("#showPhotos").on("click", function (e)
    {
        var email = document.getElementById("email").value;
        console.log(email);
        $.ajax( {
               "method": "POST",
               "url"   : "https://instacordovapp.000webhostapp.com/GetAllPhotosOf.php",
               "data"  : {"email": email}
           })
     .done(function (info)
           {
               var message = JSON.parse(info);
               console.log(message);
               var html = `<table>
                        <tr>
                            <th>photo</th>
                        </tr>`;

               for (var i in
                   message.data)
               {
                   html += `<tr>
                <td><img src = "${message.data[i]}" /></td>`;
               }
               html += `</table>`;
               $("#tabla")
                   .html(html);
           });
    });
}