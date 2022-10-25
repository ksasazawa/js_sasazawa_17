# 課題1 -じゃんけんアプリ-

## ①課題内容
- グリンピース

## ②工夫した点・こだわった点
- グリンピースのロジックを作った。
- 敵キャラごとに遷移ページの内容を変えた。
遷移先URLにパラメータを渡して、そのパラメータごとに背景・キャラ画像・ドンの表示時間と表示場所を変えた。
- 音声の出力。
SpeechSynthesisUtteranceを使って、「グリン、グリン」などの音声を出力するようにした。声色は敵キャラと自分で変えた。

## ③難しかった点・次回トライしたいこと(又は機能)
- ドンが指定時間内に押されたか否かの判定ロジックが難しかった。
同期処理と非同期処理の理解に時間がかかった。
- 出力音声が棒読みなので、もっと良い手法があれば知りたい。

## ④質問・疑問・感想、シェアしたいtips等なんでも
- 複数回利用するオブジェクトは先に変数に入れておくと使いやすい。
- 関数は小分けにした方が可読性が上がる。
- 「window.location.href = "~.html" + "?" + enemy ;」でURLにパラメータをつけて画面遷移できる。
- 「location.search」でURLのパラメータを取得できる。
- 「setTimeout」などの非同期処理を使う場合、その処理は一旦スキップして次の処理に行ってしまうが、「async,await」を使えばその処理が終了するまで次の処理を待ってくれる。
- 「SpeechSynthesisUtterance()」を使うと指定したテキストを音声出力できる。
