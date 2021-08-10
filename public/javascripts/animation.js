var svg=document.getElementById("btn-log");

svg.addEventListener('mouseover',()=>{
    TweenLite.to("#circle", 2, {x:100,opacity:0})
    TweenLite.to("#line_1 ,#line_2 ,#line_3 ,#line_4",2,{y:100,opacity:0})
});

svg.addEventListener("mouseout",()=>{
    TweenLite.to("#circle", 2, {x:0,opacity:1})
    TweenLite.to("#line_1 ,#line_2 ,#line_3,#line_4",2,{y:0,opacity:1})
})