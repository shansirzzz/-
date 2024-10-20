        let tip = document.querySelector('.tip');
        let canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 800;
        
        document.body.append(canvas);

        const ctx = canvas.getContext("2d");

        const gradient = ctx.createLinearGradient(0,0,800,800);
        gradient.addColorStop(0,"red");
        gradient.addColorStop(1,"blue");
        ctx.strokeStyle = gradient;
        ctx.stroke
        
//      创建数组coins  
        let coins = [];
        for(let i = 1; i<16; i++){
            ctx.moveTo(50,50*i);
            ctx.lineTo(750,50*i);
            ctx.stroke();
        
            ctx.moveTo(50*i,50);
            ctx.lineTo(50*i ,750);
            ctx.stroke();
            
            coins[i] = [];
        } 
        console.log(coins);
//**********************************************************************************************************************************     
        let isBlack = true;

        canvas.addEventListener("click",(e) => {
            
            let {offsetX, offsetY} = e; 
            if(offsetX < 25 || offsetY < 25 || offsetX > 775 || offsetY > 775){
                return;
            }
            let i = Math.floor((offsetX+25)/ 50);
            let j = Math.floor((offsetY+25)/ 50);
//          判断数组[i] [j] 是否存在
            if(coins[i][j]){
                tip.innerText = isBlack ? "请黑棋落子" : "请白棋落子";
                tip.style.color = isBlack ? "white" : "black";
                return;
            }

            let x = i * 50;
            let y = j * 50;            
            ctx.beginPath();
            ctx.arc(x,y,20,0,2*Math.PI);
//          在第（i,j）坐标将black和white存入 ***打断点更好理解***
            coins[i][j] = isBlack ? "black" : "white";
            console.log(coins);
            
            let gradient = ctx.createRadialGradient(x-10,y-10,0,x-10,y-10,30);
            gradient.addColorStop(0,isBlack? "grey" : "white");
            gradient.addColorStop(1,isBlack? "black" : "grey");
            ctx.fillStyle = gradient;
            ctx.stroke();
            ctx.shadowBlur = 4;
            ctx.shadowColor = "#222";
            ctx.shadowOffsetX = 4;
            ctx.shadowOffsetY = 4;
            ctx.fill();
            ctx.closePath();
//            
            let endGame = checkVertical(i,j) || checkHorizontal(i,j) || checkNW2SE(i,j) || checkSW2NE(i,j);
            victory = () => {
                alert(colorStr+"胜利！" + "请刷新网页!");
            }
            if(endGame){
                var colorStr = isBlack?"黑棋":"白棋";
                setTimeout(victory, 10);
                
            }
            console.log(endGame);
//          提醒玩家该换人了！
            tip.innerText = isBlack ? "请白棋落子" : "请黑棋落子";            
            tip.style.color = isBlack ? "white" : "black";
            isBlack = !isBlack; 
        })
//*********************************************************************************************************************************        
//      纵向查找棋子的连续
        checkVertical = (row,col) => {
            let times = 0;
            let up = 0;
            let down = 0;
            let count = 1;

            while(times < 10000){
                times++;
//               
                let currentColor = isBlack ? "black" : "white";                
                up++;
                if(coins[row][col-up] && coins[row][col-up] == currentColor){
                    count++;
                }                
                down++;
                if(coins[row][col+down] && coins[row][col+down] === currentColor){
                    count++;
                }
                if(count >= 5 || (coins[row][col-up] !== currentColor && coins[row][col+down] !== currentColor)){
                    break;
                }
            }
//          "ret"是一个布尔值:判断count是否大于等于5
            return count >= 5;
        }
//      横向查找棋子的连续
        checkHorizontal = (row,col) => {
            let times = 0;
            let left = 0;
            let right = 0;
            let count = 1;

            while(times < 1000){
                times++;
//               
                let currentColor = isBlack ? "black" : "white";                
                left++;
                if(coins[row-left][col] && coins[row-left][col] == currentColor){
                    count++;
                }                
                right++;
                if(coins[row+right][col] && coins[row+right][col] === currentColor){
                    count++;
                }
                if(count >= 5 || (coins[row-left][col] !== currentColor && coins[row+right][col] !== currentColor)){
                    break;
                }
            }
//          "ret"是一个布尔值:判断count是否大于等于5
            return count >= 5;
        }
//      从西北到东南查找棋子的连续(、)   
        checkNW2SE = (row,col) => {
            let lt = 0;
            let rb = 0;
            let currentColor = isBlack ? "black" : "white";
            let count = 1;

            let times = 0;

            while (times<1000){
                times++;
                lt++;
                if(coins[row-lt][col-lt] && coins[row-lt][col-lt] == currentColor){
                    count++;
                }
                rb++;
                if(coins[row+rb][col+rb] && coins[row+rb][col+rb] === currentColor){
                    count++
                }
                if(count >= 5 || (coins[row-lt][col-lt] !== currentColor && coins[row+rb][col+rb] !== currentColor)){
                    break;
                }
                
            }
            return count >= 5;
        }
//      从西南到东北查找棋子的连续(/)
        checkSW2NE = (row,col) => {
            let rt = 0;
            let lb = 0;
            let currentColor = isBlack ? "black" : "white";
            let count = 1;

            let times = 0;

            while (times<1000){
                times++;
                rt++;
                if(coins[row+rt][col-rt] && coins[row+rt][col-rt] == currentColor){
                    count++;
                }
                lb++;
                if(coins[row-lb][col+lb] && coins[row-lb][col+lb] === currentColor){
                    count++
                }
                if(count >= 5 || (coins[row+rt][col-rt] !== currentColor && coins[row-lb][col+lb] !== currentColor)){
                    break;
                }
                
            }
            return count >= 5;
        }
//**********************************************************************************************************************************   