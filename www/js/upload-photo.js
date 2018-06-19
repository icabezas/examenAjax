var hashtags = [];
$(function ()
  {
      if (isLogged() == null)
      {
          window.location.href = "login.html";
      }
      exit();

      printHastagArray();
      addToHashtagArray();
      deleteHashtag();

      galleryPhoto();
      instantPhoto();
  });


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);
}


function isLogged()
{
    return localStorage.getItem("id_user");
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

function instantPhoto() {
    $("#instant-photo-button")
        .on("click", function (e)
        {
            navigator.camera.getPicture(uploadPhoto, function (message)
                                        {
                                            alert('get picture failed');
                                        }, {
                                            quality        : 50,
                                            destinationType: navigator.camera.DestinationType.FILE_URI,
                                            sourceType     : navigator.camera.PictureSourceType.CAMERA
                                        }
            );
        });
}

function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";

    var params = new Object();
    params.hashtags = JSON.stringify(hashtags);
    params.id_user = localStorage.getItem("id_user");

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, "https://instacordovapp.000webhostapp.com/UploadImage.php", win, fail, options);
}

function win(r) {
    console.log("Code = " + r.responseCode.toString()+"\n");
    console.log("Response = " + r.response.toString()+"\n");
    console.log("Sent = " + r.bytesSent.toString()+"\n");
}

function fail(error) {
    alert("Error: " + error.code);
}

function galleryPhoto()
{
    $("#form-upload-image")
        .on('submit', (function (e)
        {
            e.preventDefault();
            var formData = new FormData(this);
            formData.append("hashtags", JSON.stringify(hashtags));
            formData.append("id_user", localStorage.getItem("id_user"));

            $.ajax({
                       url        : "https://instacordovapp.000webhostapp.com/UploadImage.php", 
                       type       : "POST",             
                       data       : formData,
                       contentType: false,       
                       cache      : false,          
                       processData: false        
                   })
             .done(function (info)
                   {
                       console.log(info);
                   });
        }));
}

function printHastagArray()
{
    $("#hashtag")
        .empty();
    for (var i = 0;
         i < hashtags.length;
         i++)
    {
        $("#hashtag")
            .append(hashtags[i])
            .append(`<button class="delete-hashtag-button" name='${i}' >X</button>`)
            .append("<br>");
    }
}

function addToHashtagArray()
{
    $("#hashtag-button")
        .on("click", function ()
        {
            var hashtagUserInput = $("#hashtag-input")
                .val();
            hashtags.push(hashtagUserInput);
            printHastagArray();
        });
}

function deleteHashtag()
{
    $(document)
        .on("click", ".delete-hashtag-button", function ()
        {
            var pos = $(this)
                .attr("name");
            console.log(pos);
            hashtags.splice(pos, 1);
            printHastagArray();
        });
}
