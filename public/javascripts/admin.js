// <====================Liked Start=====================>

var like = document.getElementById("drop-like");

var elements = document.getElementsByClassName("move");

like.addEventListener("click", dropLike);
function dropLike() {
    for (let i = 0; i < elements.length; i++) {
        elements[i].style = "display: block;";
        gsap.from(".move", { y: -100, opacity: 0.2 });
        gsap.to(".move", { y: 0, duration: 3, opacity: 1 });
    }
}
// <====================Liked End=====================>

// <====================UnLike Start=====================>
var unlike = document.getElementById("drop-unlike");
var unlikeElements = document.getElementsByClassName("unlike");

unlike.addEventListener("click", dropUnlike);
function dropUnlike() {
    for (let i = 0; i < unlikeElements.length; i++) {
        unlikeElements[i].style = "display: block;";
        gsap.from(".unlike", { y: -100, opacity: 0.2 });
        gsap.to(".unlike", { y: 0, duration: 3, opacity: 1 });
    }
}
// <====================Liked End=====================>

// <====================Question and Answer Start=====================>
var dropQA = document.getElementById("drop-Q&A");
var QAElements = document.getElementsByClassName("QA");

dropQA.addEventListener("click", dropQuestionAnswer);
function dropQuestionAnswer() {
    for (let i = 0; i < QAElements.length; i++) {
        QAElements[i].style = "display: block;";
        gsap.from(".QA", { y: -100, opacity: 0.2 });
        gsap.to(".QA", { y: 0, duration: 3, opacity: 1 });
    }
}
// <====================Question and Answer End=====================>

// <====================Bloked Start=====================>

var blocked = document.getElementById("drop-blocked");
var blockedElements = document.getElementsByClassName("block");

blocked.addEventListener("click", dropBlocked);
function dropBlocked() {
    for (let i = 0; i < blockedElements.length; i++) {
        blockedElements[i].style = "display: block;";
        gsap.from(".block", { y: -100, opacity: 0.2 });
        gsap.to(".block", { y: 0, duration: 3, opacity: 1 });
    }
}
// <====================Bloked End=====================>
