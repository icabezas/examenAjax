$(function ()
{
    if (isLogged() != null)
    {
        window.location.href = "index.html";
    }
    enviarDatos();
});

function isLogged()
{
    return localStorage.getItem("id_user");
}

function enviarDatos()
{
    $("#login-form").on("submit", function (e)
    {
        e.preventDefault();
        if (isEmptyFiles())
        {
            return;
        }

        var frm = $(this).serialize(); //coge los datos de las cajas de texto
        console.log(frm);
        $.ajax({
            "method": "POST",
            "url"   : "https://instacordovapp.000webhostapp.com/LogIn.php",
            "data"  : frm
        }).done(function (info)
        {
            console.log(info);
            //mostrar respuesta del server

            //TODO Si info no es null, guardar info en variable:
            // es decir, hacer que info devuelva el id del user.
            if (info != "")
            {

                var message = JSON.parse(info);
                localStorage.setItem("id_user", message.data[0].id);
                window.location.href = "index.html";
            }
            else
            {
                alert("incorrect Username or password");
            }
        });
    });
}


function isEmptyFiles()
{
    var $nomUser = $("#lg_username").val();
    var $passwordUser = $("#lg_password").val();

    if ($passwordUser == "" || $nomUser == "")
    {
        alert("Debes llenar todos los campos");
        return true;
    }
    return false;
}
