
window.addEventListener("load",function(){
    window.addEventListener("scroll", function(e){
        // alert("1");
        // getBoundingClientRect()
        console.log(document.getElementsByClassName("blue")[0].getBoundingClientRect().top) 
        if(document.getElementsByClassName("blue")[0].getBoundingClientRect().top<244){
            document.getElementsByClassName("typing")[0].classList.add("fff")
            document.getElementsByClassName("typing")[1].classList.add("rrr")
            document.getElementsByClassName("typing")[2].classList.add("aaa")
            document.getElementsByClassName("typing")[3].classList.add("bbb")
            document.getElementsByClassName("typing")[4].classList.add("ccc")
            document.getElementsByClassName("typing")[5].classList.add("ddd")
            document.getElementsByClassName("typing")[6].classList.add("eee")
        }
    });
})


