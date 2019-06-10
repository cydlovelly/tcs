window.onload= function(){
    


   
    //封装$
    function $(name){
        return document.querySelector(name);
    };
    var btn = $("#start_btn");   //开始按钮
    var body = $("body");       // body
    var game = $(".game");     //游戏输出div
    var snakemove;
    var speed = 100;
    var grades = $("#grade");
    var gradea = $("#p_grade");
    //结束弹框
    var over = $(".over");
    var close = $(".close");
    var foota = $(".foot");
    //开始暂停
    var startp = $("#startp");
    var startGameBool = true;
    var startPaushBool = true;
    // 初始化
    init();
    function init(){
        //地图
        this.mapW = parseInt(getComputedStyle(game).width);  
        this.mapH = parseInt(getComputedStyle(game).height);
        this.mapDiv = game;
        //食物
        this.footW = 20;
        this.footH = 20;
        this.footY = 0;
        this.footX = 0;
        // foot();
        //蛇
        this.snakeW = 20;
        this.snakeH = 20;
        this.snakeBody = [[3,1,"head"],[2,1,"body"],[1,1,"body"]];

        //初始化游戏属性
        this.direct = 'right';
        this.left = false;
        this.right = false;
        this.up = true;
        this.down = true;

        //初始化分数
        this.grade = 0;
    };

     //点击开始按钮，按钮消失   游戏界面显示
    // btn.addEventListener("click",function(){
       

    // });
    bindEvent();
    function setgame(){
        //生成食物
        // foot();
        
        //随机生成蛇
        snake();
        snakemove = setInterval(function(){
            move();
            
        },speed)
    };
    // /食物
    function foot(){
        var foot = document.createElement('div');
        foot.style.width = this.footW + "px";
        foot.style.height = this.footH + "px";
        foot.style.position = "absolute";
        this.footX = Math.floor(Math.random()*(this.mapW/20));
        this.footY = Math.floor(Math.random()*(this.mapH/20));
        foot.style.left = this.footX *20 + 'px';
        foot.style.top = this.footY * 20 + 'px';
        console.log(this.footX);
        console.log(this.footY);
        console.log(foot.style.left);
        console.log(foot.style.left);
        this.mapDiv.appendChild(foot).setAttribute('class','foot');

    }
    //蛇
    function snake(){
        for(var i = 0; i<this.snakeBody.length;i++){
            var snake = document.createElement('div');
            snake.style.width = this.snakeW + 'px';
            snake.style.height = this.snakeH + 'px';
            snake.style.position = 'absolute';
            snake.style.left = this.snakeBody[i][0]*20 + 'px';
            snake.style.top = this.snakeBody[i][1]*20 + 'px';
            snake.classList.add(this.snakeBody[i][2]);
            this.mapDiv.appendChild(snake).classList.add('snake');
            //蛇头的方向
            switch(this.direct){
                case 'right':
                break;
                case 'up':
                    snake.style.transform = 'rotate(270deg)';
                break;
                case 'left':
                    snake.style.transform = 'rotate(180deg)';   
                break;
                case 'down':
                    snake.style.transform = 'rotate(90deg)';
                break;
                default:
                break;
            }
            


        }
    }

    //运动
    function move(){
        for(var i = this.snakeBody.length-1; i > 0;i--){
            this.snakeBody[i][0] = this.snakeBody[i-1][0];
            this.snakeBody[i][1] = this.snakeBody[i-1][1];
        }
        //判断改变得方向
        switch(this.direct){
            case 'right':
            this.snakeBody[0][0] += 1;
            break;
            case 'up':
            this.snakeBody[0][1] -= 1;
            break;
            case 'left':
            this.snakeBody[0][0] -= 1;
            break;
            case 'down':
            this.snakeBody[0][1] += 1;
            break;
            default:
            break;
        }
        //删除原有的蛇。
        removeClass('snake');
        // 增加新渲染出来的蛇
        snake();
        //判断是否吃到食物
        //蛇头坐标和食物坐标相同
        if(this.snakeBody[0][0] == this.footX && this.snakeBody[0][1] == this.footY){
            //身体最后一节+1;
            var snakeEndX = this.snakeBody[this.snakeBody.length-1][0];
            var snakeEndY = this.snakeBody[this.snakeBody.length-1][1];
            switch(this.direct){
                case 'right':
                this.snakeBody.push([snakeEndX+1,snakeEndY,'body']);
                break;
                case 'up':
                this.snakeBody.push([snakeEndX,snakeEndY-1,'body']);
                break;
                case 'left':
                this.snakeBody.push([snakeEndX-1,snakeEndY,'body']);
                break;
                case 'down':
                this.snakeBody.push([snakeEndX,snakeEndY+1,'body']);
                break;
                default:
                break;
            }
            //分数+1
            this.grade += 1;
            grades.innerHTML = this.grade;
            gradea.innerText = this.grade;
            //食物消失   
            removeClass('foot');
            //食物出现
            foot();
        }
        //约定游戏范围限制大小

        //限制宽度
        
        if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= 57){
            relodGame();
            // console.log(this.snakeBody[0][0]);
            // console.log(111);
        }
        
        //限制高度
        // console.log(this.snakeBody[0][1]);
        if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= 25){
            // console.log(111);
            relodGame();
        }
        //碰到身体的那一个都不行
        var snakeHX = this.snakeBody[0][0];  //等于蛇头的X位置坐标
        var snakeHY = this.snakeBody[0][1];  //等于舌头的Y坐标

        for(var i = 1; i<this.snakeBody.length; i++){
            if(snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]){
                // console.log(111);
                relodGame();
            }
        }
        
    }

    //结束游戏
    function relodGame(){ 
        //删除蛇  和食物
        removeClass('snake');
        removeClass('foot');
        //清除定时器
        clearInterval(snakemove);
        this.snakeBody = [[3,1,"head"],[2,1,"body"],[1,1,"body"]];

        //初始化游戏属性
        this.direct = 'right';
        this.left = false;
        this.right = false;
        this.up = true;
        this.down = true;
        // console.log();
         // 弹框出现
         over.style.display = "block";
         startp.style.display ="none";
         this.grade = 0;
         grades.innerHTML = 0;
         startPaushBool = true;
         startGameBool = true;
    }

    // 删除具有这个classname     作用  删除前一秒的蛇 ，从新渲染出
    function removeClass(className){
        var ele = document.getElementsByClassName(className);
        // classname说明有值
        while(ele.length > 0){
            // 找到我的父级，在删除掉
            ele[0].parentNode.removeChild(ele[0]);
        } 
    };
    //固定移动方向
    function setDerict(code){
        switch(code){
            case 37:
            if(this.left){
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
            case 38:
            if(this.up){
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
            case 39:
            if(this.right){
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
            case 40:
            if(this.down){
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
            default:
            break;
        }
    }
    //绑定24K码
    function bindEvent(){
        
        close.onclick =function(){
            over.style.display = "none";
            startp.style.display = 'block';
            startp.setAttribute('src','./img/zt.png');
        }
        btn.onclick =function(){
            var con =  $(".con");       //开始游戏的界面
            // alert("你好");      //测试 
            var start = $(".start");   //开始游戏的按钮界面
            // start.style.opacity = "0";
            start.style.display = "none";
            body.style.background = "#000";
            con.style.display = "block";
            // con.style.opacity = 1;
            startAndPaush();
            // foot();
            // snake();
            // alert(1111);
        }
        startp.onclick = function(){
            startAndPaush();
         
            // alert(111);
        }
       
    };
    
    //判断是否可以暂停开始
    function startAndPaush(){
        if(startPaushBool){
            if(startGameBool){
                removeClass('foot');
                // foot();
                setgame();
                // if(foota){

                // }else{
                //     foot();
                // }
                startGameBool = false;
            }
            document.onkeydown = function(e){
                //储存24K码
                var code = e.keyCode;
                setDerict(code);
            }
            foot();
            // startp.setAttribute('src','./img/zt.png');
            startp.setAttribute('src','./img/ks1.png');
            startPaushBool = false;
        }else{
            startp.setAttribute('src','./img/zt.png');
            // startp.setAttribute('src','./img/ks1.png');
            clearInterval(snakemove);
            document.onkeydown = function(e){
                e.returnValue = false;
                return false;
            };
            startPaushBool = true;
            startGameBool = true;
        }
    }
}




