## Document

****

- React-DnDを利用する際にはES7で書く
- ES7に対応するにはwebpack.config.babel.js(importが使える)にbabel:{stage:0}を書く
- またwebpack.config.babel.jsにrulesを書くのではなく、loaderを書く
- エディターにもwarningが出るので吹き出しを参考にしながらwarningを消す
- また開発が安定してきたときにはwatchモジュールを利用してreactを自動ビルドする
- npm i --save-dev watch watch webpack ./src