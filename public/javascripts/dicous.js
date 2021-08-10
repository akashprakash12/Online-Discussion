var drpo = document.getElementById("drop");
var elements = document.getElementsByClassName("move");

drpo.addEventListener("click", dropAnswer);
function dropAnswer() {
    for (let i = 0; i < elements.length; i++) {
        elements[i].style = "display: block;";
        gsap.from(".move", { y: -100, opacity: 0.2 });
        gsap.to(".move", { y: 0, duration: 3, opacity: 1 });
    }
}

$(function () {
    $(".like").click(function () {
        var input = $(this).find('.qty1');
        input.val(parseInt(input.val())+ 1);
    });

    $(".dislike").click(function () {
        var input = $(this).find('.qty2');
        input.val(input.val() - 1);
    });
});


function myFunction() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
  }