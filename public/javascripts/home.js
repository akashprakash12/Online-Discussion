window.onload = function () {
    document.getElementById("close").onclick = function () {
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
        return false;
    };
};
gsap.to("#message", { y: 200, duration: 4 });
var disabled=document.getElementById("disabled")
var messageBox=document.getElementById("message-box")
disabled.addEventListener("click",()=>{
alert("plese sign up or login")
})
