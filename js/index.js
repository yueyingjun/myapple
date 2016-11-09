$(function(){
    //初始化 菜单的宽高
    var clientW=$(window).width();
    var clientH=$(window).height();
    $(".son").css({
        width:clientW,
        height:clientH
    })

    $(".menu").click(function(){

        $(".son").slideToggle(200);
    })

    /*轮播图*/
    var currentNum=0;
    var nextNum=0;
    var currentTime=0;
    var flag=true;



    function move(){
        nextNum++;
        if(nextNum==3){
            nextNum=0;
            flag=false;
        }

        $(".list:eq("+currentNum+")").animate({width:"80%",height:"80%"}).css("zIndex",0);

        $(".list:eq("+nextNum+")").animate({left:0},function(){
            $(".list:eq("+currentNum+")").css({
                left:"100%",width:"100%",height:"100%"
            })
            currentNum=nextNum;
            currentTime=0;
            flag=true;

        }).css("zIndex",1)
    }
    function move1(){
        currentTime+=50;
        var bili=currentTime/3000;
        if(bili>1){
            bili=1;
        }
        $(".progress").eq(currentNum).css({width:bili*100+"%"})
        if(flag===false){
            $(".progress").css("width",0);
        }
    }


    var t1=setInterval(move,3000)
    var t2=setInterval(move1,50)

    $(window).focus(function(){
        t1=setInterval(move,3000);
        t2=setInterval(move1,50)
    })
    $(window).blur(function(){
        clearInterval(t1);
        clearInterval(t2);
    })


    $(".btns-list").click(function(){
        nextNum=$(this).index(".btns-list");
        stop();
    })

    $(".leftBtn").click(function(){
        nextNum--
        if(nextNum==-1){
            nextNum=2;
        }
        stop();
    })
    $(".rightBtn").click(function(){
        nextNum++
        if(nextNum==3){
            nextNum=0;
        }
        stop();
    })


    function stop(){
        /*
        *  定时器停掉
        * */
        clearInterval(t1);
        clearInterval(t2);

        /*按钮的变化*/
        $(".btns-list").find(".progress").css("width",0);
        $(".btns-list").eq(nextNum).find(".progress").css("width","100%");

        /*轮播图发生变化*/
        if(nextNum>currentNum){
            $(".list:eq("+currentNum+")").animate({width:"80%",height:"80%"}).css("zIndex",0);

            $(".list:eq("+nextNum+")").animate({left:0},function(){
                $(".list:eq("+currentNum+")").css({
                    left:"100%",width:"100%",height:"100%"
                })
                currentNum=nextNum;

            }).css("zIndex",1)
        }else{
            $(".list:eq("+currentNum+")").animate({left:"100%"}).css("zIndex",1);
            $(".list").eq(nextNum).css({
                width:"80%",height:"80%",left:0
            }).animate({width:"100%",height:"100%"},function(){
                currentNum=nextNum;
            })


        }
    }




})