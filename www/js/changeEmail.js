$(function ()
{
    changeEmail();
});
  
  function changeEmail(){
      $("#changeEmailForm").on("submit", function (e)
    {
        e.preventDefault();
        let changeEmailForm = $(this).serialize(); 
        console.log(changeEmailForm);
        $.ajax({
            "method": "POST",
            "url"   : "https://instacordovapp.000webhostapp.com/ChangeEmail.php",
            "data"  : changeEmailForm
        }).done(function (info)
        {
            console.log(info);
            $("#message").html(info);
        });
    });
}
