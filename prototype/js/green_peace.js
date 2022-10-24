// 【ホーム画面】敵を選択して画面遷移
function battle(){
    let enemy = "";
    const enemies = document.enemy_selection.kind;
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].checked) {
          enemy = enemies[i].value;
          break;
        }
    }
    window.location.href = "green_peace_battle.html" + "?" + enemy ;
}

let seconds = 0;
// 【バトル画面】キャラ設定
function init(){
    const param = location.search;
    if(param=="?zu"){
        document.querySelector("#enemy_name").innerHTML = "ズ・ゴオマ・グ";
        document.querySelector("#enemy_photo").src = "./img/ズ・ゴオマ・グ_2.jpeg";
        seconds = 2.5;
    }
    else if(param=="?me"){
        document.querySelector("#enemy_name").innerHTML = "メ・ガルメ・レ";
        document.querySelector("#enemy_photo").src = "./img/メ・ガルメ・レ_2.jpeg";
        seconds = 1.5;
    }
    else if(param=="?go"){
        document.querySelector("#enemy_name").innerHTML = "ゴ・ガドル・バ";
        document.querySelector("#enemy_photo").src = "./img/ゴ・ガドル・バ_2.jpeg";
        // document.querySelector("html").style.backgroundImage = `url("./img/forest.jpeg")`;
        seconds = 1.5;
    }
    else if(param=="?n"){
        document.querySelector("#enemy_name").innerHTML = "ン・ダグバ・ゼバ";
        document.querySelector("#enemy_photo").src = "./img/ン・ダグバ・ゼバ_2.jpeg";
        document.querySelector("#your_photo").src = "./img/アルティメット.jpeg";
        document.querySelector("html").style.backgroundImage = `url("./img/snow.jpeg")`;
        seconds = 1;
        // document.querySelector("html").style.backgroundImage = "./img/snow.jpeg";
    }
};

// 【バトル画面】じゃんけん
let cnt = 0;
let flag = false;

function janken(your_hand){
    // 初期化
    let enemy_hand = "";
    let conclusion = "";
    document.querySelector("#enemy_rinrin").innerHTML = "";
    document.querySelector("#your_rinrin").innerHTML = "";
    document.querySelector("#gu").style.opacity = 0.3;
    document.querySelector("#cho").style.opacity = 0.3;
    document.querySelector("#pa").style.opacity = 0.3;
    // 自分の手を固定
    let your_hand_action = document.querySelector("#"+your_hand);
    your_hand_action.style.opacity = 0.9;
    // 敵の手を設定
    const e = Math.ceil(Math.random()*3);
    switch(e){
        case 3:
            enemy_hand = "pa";
            document.querySelector(".enemy_hand").innerHTML = `<img class = "enemy_hand" src="img/パー.jpg" alt="パー">`;
            break;
        case 2:
            enemy_hand = "cho";
            document.querySelector(".enemy_hand").innerHTML = `<img class = "enemy_hand" src="img/チョキ.jpg" alt="チョキ">`;
            break;
        case 1:
            enemy_hand = "gu";
            document.querySelector(".enemy_hand").innerHTML = `<img class = "enemy_hand" src="img/グー.jpg" alt="グー">`;
            break;
    };
    console.log(`${cnt}回目。敵の手は${enemy_hand}。自分の手は${your_hand}`);

    // あいこの時
    if(enemy_hand==your_hand){
        conclusion = "draw";
        // document.querySelector("#echo").innerHTML = conclusion;
        // １回以上勝敗がついている場合
        if(cnt>0){
            // 【関数の定義】Donnが押されたらフラグ値をTrueにする。
            document.querySelector("#donn").addEventListener('click', function() {
                flag = true;
                console.log(flag);
            });
            // 【関数の定義】一定期間でボタンを消す。
            function closeButton() {
                document.querySelector("#donn").style.display = "none"; // ボタンを消す
                clearTimeout( timerId ); // タイマーを終了
             };
            // 【関数の定義】sleep
            function sleep(waitSec, callbackFunc) {
                // 経過時間（秒）
                var spanedSec = 0;
                // 1秒間隔で無名関数を実行
                var id = setInterval(function () {                              
                    spanedSec++;           
                    // 経過時間 >= 待機時間の場合、待機終了。
                    if (spanedSec >= waitSec) {           
                        // タイマー停止
                        clearInterval(id);           
                        // 完了時、コールバック関数を実行
                        if (callbackFunc) callbackFunc();
                    }
                }, 1000);           
            }
            // Donnボタンを表示し、タイマースタート。
            const param = location.search;
            if(param=="?go" || param=="?n"){
                const x = Math.ceil(Math.random()*( 90 - 10 )) + 10;
                const y = Math.ceil(Math.random()*( 90 - 10 )) + 10;
                console.log(x+y);
                document.querySelector("#donn").style.left = `${x}%`;
                document.querySelector("#donn").style.top = `${y}%`;
            };
            document.querySelector("#donn").style.display = "block";
            timerId = setTimeout(closeButton , seconds*1000);
            // sleep関数の実行。５秒プログラム停止。
            sleep(seconds, function () {           
                console.log(`${seconds}秒経過しました！`);
                // 勝利パターン
                if(flag==true){
                    console.log("勝利");
                    document.querySelector("html").style.backgroundColor = "pink";
                    document.querySelector("#echo").innerHTML = "勝利！！";
                }
                // 敗北パターン
                else{
                    console.log("敗北");
                    document.querySelector("html").style.backgroundColor = "aqua";
                    document.querySelector("#echo").innerHTML = "敗北、、、";
                };         
            });
        };
    }
    // 勝敗がついた時
    else{
        cnt += 1;
        // 自分がじゃん負けの時
        if((enemy_hand=="gu" && your_hand=="cho") || (enemy_hand=="cho" && your_hand=="pa") || (enemy_hand=="pa" && your_hand=="gu")){
            conclusion = "lose";
            // document.querySelector("#echo").innerHTML = conclusion;
            document.querySelector("#enemy_rinrin").innerHTML = `${enemy_hand}rin,${enemy_hand}rin!`;
            document.querySelector(".enemy_hand").animate( {
                // marginTop : [ "0" , "10px", "0" ],
                marginLeft : [ "0" , "20px", "0" ],
            } , {
                duration: 500,
                iterations: 2
            });
        }
        // 自分がじゃん勝ちの時
        else if((enemy_hand=="gu" && your_hand=="pa") || (enemy_hand=="cho" && your_hand=="gu") || (enemy_hand=="pa" && your_hand=="cho")){
            conclusion = "win";
            // document.querySelector("#echo").innerHTML = conclusion;
            document.querySelector("#your_rinrin").innerHTML = `${your_hand}rin,${your_hand}rin!`;
            your_hand_action.animate( {
                // marginTop : [ "0" , "10px", "0" ],
                marginRight : [ "0" , "20px", "0" ],
            } , {
                duration: 500,
                iterations: 2
            });
        }
    };
};



