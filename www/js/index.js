$(function ()
{
    if (isLogged() == null)
    {
        window.location.href = "login.html";
    }
    goToExit();
    getAllHashtags();
    goToMyPhotoView();
    goUploadPhoto();
    goListallUsers();
    goToChangeEmail();
    goToAllPhotosOf();
});

function isLogged()
{
    return localStorage.getItem("id_user");
}

function goToExit()
{
    $("#exit").on("click", function (e)
    {
        localStorage.removeItem("id_user");
        window.location.href = "login.html";
    });
}

function goToChangeEmail(){
        $("#changeEmail").on("click", function (e){
        window.location.href = "changeEmail.html";
    });
}

function goUploadPhoto()
{
    $("#upload-photo").on("click", function (e)
    {
        window.location.href = "upload-photo.html";
    });
}

function goListallUsers(){
    $("#allUsers").on("click", function (e){
        window.location.href = "listAllUsers.html";
    });
}

function goToMyPhotoView()
{
    $("#my-photo").on("click", function (e)
    {
        window.location.href = "my-photo.html";
    });
}

function goToAllPhotosOf()
{
    $("#showPhotos").on("click", function (e)
    {
        window.location.href = "showAllPhotosOf.html";
    });
}

function getAllHashtags()
{

    $.ajax({
        "method": "POST",
        "url"   : "https://instacordovapp.000webhostapp.com/GetHashTag.php",
    }).done(function (info)
    {
        console.log(info);

        //mostrar respuesta del server

        var message = JSON.parse(info);
        var html = `<table><tr><th>HashTag</th>`;
        for (var i in message.data)
        {
            html += `<tr>
                <td><a href="hashtag.html?id=${message.data[i].id}">${message.data[i].hash_tag_name}</a></td>
                </tr>`;

        }
        html += `</table>`;
        $("#hashtag-list-table").html(html);

    });

}
