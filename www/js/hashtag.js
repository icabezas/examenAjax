var idHashTag;
$(function ()
{
    if (isLogged() == null)
    {
        window.location.href = "login.html";
    }
    exit();

    var urlString = window.location.href;
    var url = new URL(urlString);
    idHashTag = url.searchParams.get("id");

    getHashtagNameBy(idHashTag)
        .done(function (info)
        {
            var message = JSON.parse(info);
            updateHashTagTitle(message.data[0].hash_tag_name);
        });
    getListAllPhotoBy(idHashTag);
    vote();

});

function getHashtagNameBy(id)
{
    return $.ajax({
        "method": "POST",
        "url"   : "https://instacordovapp.000webhostapp.com/GetHashtagName.php",
        "data"  : {"id": id}
    })
}

function updateHashTagTitle(hashtag)
{
    $("#hashtag-title").html(`#${hashtag}`);
}

function getListAllPhotoBy(hashtagId)
{
    $.ajax({
        "method": "POST",
        "url"   : "https://instacordovapp.000webhostapp.com/GetAllPhotoByHashtag.php",
        "data"  : {"id": hashtagId}
    }).done(function (info)
    {
        console.log(info);
        var message = JSON.parse(info);
        console.log(message);
        var html = `<table>
                        <tr>
                            <th>photo</th>
                            <th>hash tag</th>
                            <th>votos</th>
                        </tr>`;

        for (var i in message.data)
        {
            html += `<tr>
                <td><img src = "${message.data[i].photo_name}" /></td> 
                <td>${message.data[i].hash_tag_name}</td>
                <td>${message.data[i].total_score > 0 ? message.data[i].total_score : 0 }</td>
                <td><button class="vote_button" value="-1" name="${message.data[i].photo_id}" >-1</button></td>
                <td><button class="vote_button" value="0" name="${message.data[i].photo_id}">0</button></td>
                <td><button class="vote_button" value="1" name="${message.data[i].photo_id}">1</button></td>
                </tr>`;
        }
        html += `</table>`;
        $("#tabla").html(html);
    });
}

function isLogged()
{
    return localStorage.getItem("id_user");
}

function exit()
{
    $("#exit").on("click", function (e)
    {
        e.preventDefault();
        localStorage.removeItem("id_user");
        window.location.href = "login.html";
    });
}

function vote()
{
    $(document).on("click", ".vote_button", function ()
    {
        var $idPhoto = $(this).attr("name");
        var $idUser = localStorage.getItem("id_user");
        var $score = $(this).attr("value");

        $.ajax({
            "method": "POST",
            "url"   : "https://instacordovapp.000webhostapp.com/Vote.php",
            "data"  : {"id_photo": $idPhoto, "id_user": $idUser, "score": $score}
        }).done(function (info)
        {
            console.log(info)
            if (info == "-1")
            {
                alert("Ya has votado con esa puntuacion");
                return;
            }
            getListAllPhotoBy(idHashTag);
        });

    });
}

