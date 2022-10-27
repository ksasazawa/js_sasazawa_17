// document.addEventListener('DOMContentLoaded', () => { ;({ , , , ,,,}.init()) })
document.addEventListener('DOMContentLoaded', () => {
  ;({
    // 各種オブジェクトパーツ（複数回使うオブジェクトを格納しておく）
    el: {
      janken: document.getElementById('js-janken'),
      enemyHand: document.getElementById('js-enemyHand'), // 一枚の画像から敵の手の画像を取得（jankenDisplay_hand）
      myHands: document.querySelectorAll('.js-myHand'),
      btnPlay: document.getElementById('js-btnPlay'),
      result: document.getElementById('js-result'),
      resultChildren: document.getElementById('js-result').children,
      message: document.getElementById('js-message'),
      don: document.querySelector("#don"),
      donplay: document.querySelector(".donPlay"),
      yourShout: document.querySelector(".balloon3-left-btm"),
      enemyShout: document.querySelector(".balloon3-right-btm"),
    },
    // パーツデータ
    data: {
      enemyHandTimer: 0,
      messageTimer: 0,
      myHandType: 0,
      enemyHandType: 0,
      messageArray: ['グリンピー、、、', 'あいこで', 'ス！'],
      shoutArray: ['グリン、グリン！','チョリン、チョリン！','パリン、パリン！','ドン！'],
      resultArray: ['勝ち', '負け'],
      cnt: 0, // 勝敗がついた回数
      flg: false,
      seconds: 0,
      param: location.search,
      x: Math.ceil(Math.random()*( 90 - 10 )) + 10,
      y: Math.ceil(Math.random()*( 90 - 10 )) + 10,
    },

    // 初めに実行される関数
    init() {
      const self = this // この関数があるオブジェクトを指す。
      const el = self.el
      const data = self.data
      if(data.param=="?zu"){
          document.querySelector("#enemy_name").innerHTML = "ズ・ゴオマ・グ";
          document.querySelector("#enemy_photo").src = "./img/ズ・ゴオマ・グ_2.jpeg";
          data.seconds = 3;
      }
      else if(data.param=="?me"){
          document.querySelector("#enemy_name").innerHTML = "メ・ガルメ・レ";
          document.querySelector("#enemy_photo").src = "./img/メ・ガルメ・レ_2.jpeg";
          data.seconds = 2;
      }
      else if(data.param=="?go"){
          document.querySelector("#enemy_name").innerHTML = "ゴ・ガドル・バ";
          document.querySelector("#enemy_photo").src = "./img/ゴ・ガドル・バ_2.jpeg";
          data.seconds = 2;
      }
      else if(data.param=="?n"){
          document.querySelector("#enemy_name").innerHTML = "ン・ダグバ・ゼバ";
          document.querySelector("#enemy_photo").src = "./img/ン・ダグバ・ゼバ_2.jpeg";
          document.querySelector("#your_photo").src = "./img/アルティメット.jpeg";
          document.querySelector("body").style.backgroundImage = `url("./img/snow.jpeg")`;
          data.seconds = 1;
        };
      self.clickPlay()
      self.clickMyHand()
    },

    // プレイボタンをクリック
    clickPlay() {
      const self = this
      const el = self.el
      el.btnPlay.addEventListener('click', () => { // スタートボタンがクリックされたらプレイ開始
        self.play()
      })
    },

    // じゃんけんを出すボタンをクリック（ぽんまで）
    clickMyHand() {
      const self = this
      const el = self.el
      const data = self.data
      for (let i = 0, len = el.myHands.length; i < len; i++) { // グーチョキパーそれぞれについて
        // 自分の手のどれかがクリックされたら
        el.myHands[i].addEventListener('click', () => {
          if (el.janken.classList.contains('is-play')) {
            clearInterval(data.enemyHandTimer)
            el.janken.classList.remove('is-play')
            el.myHands[i].parentNode.parentNode.classList.add('is-active') // 手をアクティブ状態にする
            data.enemyHandType = Math.floor(Math.random() * 3) // 0か1か2が入る（敵の手）
            data.myHandType = el.myHands[i].value // 0か1か2が入る（自分の手）
            self.showMessage(data.messageArray[2]) // ぽん
            self.setEnemyHandType(data.enemyHandType)
            self.judge()
          }
        })
      }
    },

    // じゃんけんを開始
    play() {
      const self = this
      const el = self.el
      const data = self.data
      if (!el.janken.classList.contains('is-play')) { // プレイが始まっていない場合のみ下記実行（bodyにis-playというクラス名を含んでいなければ）
        // じゃんけんが選択済みだったら消す（jankenHandItemにis-activeがあればそれを消す）
        for (let i = 0, len = el.myHands.length; i < len; i++) { // 手の数（三つ）だけ繰り返し
          if (
            el.myHands[i].parentNode.parentNode.classList.contains('is-active')
          ) {
            el.myHands[i].parentNode.parentNode.classList.remove('is-active')
          }
        }
        // 勝敗が表示されていたら消す
        if (el.result.classList.contains('is-result')) {
          self.hideResult()
        }
        // じゃんけんの掛け声が表示されていたら消す
        if (el.message.classList.contains('is-show')) {
          self.hideMessage()
        }
        // あいこの場合は掛け声を変える
        if (el.janken.classList.contains('is-aiko')) {
          self.showMessage(data.messageArray[0])
        } else {
          self.showMessage(data.messageArray[0])
        }
        if(el.enemyShout.style.display == "block"){
          el.enemyShout.style.display = "none";
        }else if(el.yourShout.style.display == "block"){
          el.yourShout.style.display = "none";
        }
        // プレイ状態にし、敵の手をシャッフル
        el.janken.classList.add('is-play')
        self.shuffleEnemyHand()
      }
    },

    // 相手のじゃんけんをシャッフル表示
    shuffleEnemyHand() {
      const self = this
      const data = self.data
      data.enemyHandTimer = setInterval(() => {
        const self = this
        if (data.enemyHandType === 2) {
          data.enemyHandType = 0
        } else {
          data.enemyHandType++
        }
        self.setEnemyHandType(data.enemyHandType)
      }, 100)
    },

    // 相手のじゃんけん画像を設定
    setEnemyHandType(type) {
      const self = this
      const el = self.el
      el.enemyHand.style.backgroundPosition = type * 50 + '% 0' // じゃんけん画像から該当の手の画像を取得
    },

    // 勝敗を判定
    judge() {
      const self = this
      const el = self.el
      const data = self.data
      // あいこの場合
      if (data.myHandType - data.enemyHandType == 0){
          const result = 0
          el.janken.classList.add('is-aiko')
          if(data.cnt>0){
            self.donTouch()
            data.cnt = 0
          }else{
            setTimeout(self.play.bind(self), 2000) // あいこの場合、２秒後に再度playを実行
          }
      }
      // 負けの場合
      else if((data.myHandType==2&&data.enemyHandType==1)||(data.myHandType==1&&data.enemyHandType==0)||(data.myHandType==0&&data.enemyHandType==2)){
          const result = 1
          data.cnt ++
          if (el.janken.classList.contains('is-aiko')) {
              el.janken.classList.remove('is-aiko')
            }
          console.log(data.cnt)
          el.enemyShout.style.display = "block"
          el.enemyShout.innerHTML = data.shoutArray[data.enemyHandType]
          self.speechPlay(data.enemyHandType, result)
          // self.showResult(data.resultArray[1]) // 負け
          setTimeout(self.play.bind(self), 2000)
      }
      // 勝ちの場合
      else if((data.myHandType==2&&data.enemyHandType==0)||(data.myHandType==0&&data.enemyHandType==1)||(data.myHandType==1&&data.enemyHandType==2)){
          const result = 2
          data.cnt ++
          if (el.janken.classList.contains('is-aiko')) {
              el.janken.classList.remove('is-aiko')
            }
          console.log(data.cnt)
          console.log(`自分の手は${data.myHandType}`)
          el.yourShout.style.display = "block"
          el.yourShout.innerHTML = data.shoutArray[data.myHandType]
          self.speechPlay(data.myHandType, result)
          // self.showResult(data.resultArray[0]) // 勝ち
          // el.result.classList.add('is-win')
          setTimeout(self.play.bind(self), 2000)
          
      }
      // const result = (data.myHandType - Math.abs(data.enemyHandType) + 3) % 3
      // console.log(`${result}=(${data.myHandType} - ${Math.abs(data.enemyHandType)} + 3) % 3}`)
      // switch (result) {
      //   case 0:
      //     el.janken.classList.add('is-aiko')
      //     setTimeout(self.play.bind(self), 2000) // あいこで
      //     break
      //   case 1:
      //     self.showResult(data.resultArray[1]) // 負け
      //     break
      //   default: // 2の場合
      //     self.showResult(data.resultArray[0]) // 勝ち
      //     el.result.classList.add('is-win')
      // }
      // if (result !== 0) {
      //   if (el.janken.classList.contains('is-aiko')) {
      //     el.janken.classList.remove('is-aiko')
      //   }
      // }
    },

    // 勝敗を表示
    showResult(text) {
      const self = this
      const el = self.el
      el.result.classList.add('is-result')
      for (let i = 0, len = el.resultChildren.length; i < len; i++) {
        el.resultChildren[i].textContent = text
      }
    },

    // 勝敗を削除
    hideResult() {
      const self = this
      const el = self.el
      const data = self.data
      el.result.classList.remove('is-result', 'is-win')
      data.flg = false;
      for (let i = 0, len = el.resultChildren.length; i < len; i++) {
        el.resultChildren[i].textContent = data.messageArray[0]
      }
    },

    // じゃんけんの掛け声を表示
    showMessage(text, delay = 1000) {
      const self = this
      const el = self.el
      const data = self.data
      if (el.message.classList.contains('is-show')) {
        self.hideMessage()
      }
      el.message.textContent = text
      el.message.classList.add('is-show')
      data.messageTimer = setTimeout(self.hideMessage.bind(self), delay)
    },

    // じゃんけんの掛け声を削除
    hideMessage() {
      const self = this
      const el = self.el
      const data = self.data
      el.message.classList.remove('is-show')
      clearTimeout(data.messageTimer)
    },

    // 「ドン」
    donTouch() {
      const self = this
      const el = self.el
      const data = self.data
      // 非同期処理
      async function Myasync() {
        if(data.param=="?go" || data.param=="?n"){
          el.donplay.style.left = `${data.x}%`;
          el.donplay.style.top = `${data.y}%`;
        }
        // ドンの表示
        el.don.style.display = "block";
        // ドンがクリックされたらフラグをtrueにする。
        el.don.addEventListener('click', function(){
          data.flg = true
          console.log(`押されました。${data.flg}`)
          self.speechPlayDon(2)
          el.don.style.display = "none";
        })
        // ドンを消す
        await new Promise((resolve) => {
          setTimeout(() => {
            if(data.flg==false){
              self.speechPlayDon(1)
              el.don.style.display = "none";
            }
            resolve();
          }, data.seconds*1000)
        })
        // フラグ値によって勝敗の決定
        if(data.flg==true){
          console.log("judgeで勝ち")
          self.showResult(data.resultArray[0]) // 勝ち
          el.result.classList.add('is-win')
        }else{
          console.log("judgeで負け")
          self.showResult(data.resultArray[1]) // 負け
        }
      }
      Myasync();
    },

    // 音声出力
    speechPlay(win_hand, result){
      const self = this
      const data = self.data
      let speech_play_option = new SpeechSynthesisUtterance();
      console.log(`音声関数内、${win_hand}`)
      if(win_hand==0){
        speech_play_option.text = data.shoutArray[0]
      }else if(win_hand==1){
        speech_play_option.text = data.shoutArray[1]
      }else{
        speech_play_option.text = data.shoutArray[2]
      }
      if(result==1){
        var voice = speechSynthesis.getVoices().find(function(voice){
        return voice.name === 'Google UK English Female';
        });
        speech_play_option.voice = voice;
      }
      speech_play_option.lang = 'ja-JP';
      speech_play_option.pitch = 1;
      speech_play_option.rate = 1.5;
      speechSynthesis.speak(speech_play_option);
    },

    speechPlayDon(conclusion){
      const self = this
      const data = self.data
      let speech_play_option = new SpeechSynthesisUtterance();
      speech_play_option.text = data.shoutArray[3]
      if(conclusion==1){
        var voice = speechSynthesis.getVoices().find(function(voice){
        return voice.name === 'Google UK English Female';
        });
        speech_play_option.voice = voice;
      }
      speech_play_option.lang = 'ja-JP';
      speech_play_option.pitch = 1;
      speech_play_option.rate = 1.5;
      speechSynthesis.speak(speech_play_option);
      console.log(`勝ちです！！！コンクルージョンは${conclusion}`)
    },

  }.init())
})