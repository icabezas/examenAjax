$(function ()
{
    enviarDatos();
});

function enviarDatos()
{
    $("#frm").on("submit", function (e)
    {
        let frm = $(this).serialize(); 
        console.log(frm);
        $.ajax({
            "method": "POST",
            "url"   : "https://instacordovapp.000webhostapp.com/RegistrarUsuario.php",
            "data"  : frm
        }).done(function (info)
        {
            $("#mensaje").html(info);
            setTimeout(function ()
            {
                window.location.href = "index.html"; //Login
            }, 2000);
        });
    });
}
