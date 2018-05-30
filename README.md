# Vue Data Parser

Vue.js用外部JSONデータのパーサプラグイン

## 概要

Vue.jsアプリケーションとサーバサイドHTMLテンプレートエンジンを組み合わせる際、それぞれの担う範囲を分けておかないとXSS脆弱性を生み出します。

そこで、サーバサイドHTMLテンプレートエンジンでdata属性にJSON化したプロパティを埋め込んでJSで掘り出して使う、といったケースが想定されますがその動作をVue.jsに用意されたインタフェースで統一するためのプラグインです。

data属性に埋め込まれたJSONデータを取り出す動作をVue.jsの記述に抽象化できるので、各ページのエントリーポイントになるJSファイルをページ数分用意する必要がなくなり、Vue.js独特の柔軟さを後押しできます。

## 使い方

JavaScript

```javascript
import dataParser from 'vue-data-parser';

Vue.use(dataParser);

new Vue(...);
```

HTML

```html
<!-- VueアプリケーションのBootStrap -->
<div id="app" v-data-parser="JSONエンコードされたパラメータ">
...
</div>
```

Vueインスタンスのルートの`data.extData.fromDOM`以下にJSONデータをパースし、挿入します

## Options

### 引数: カスタムキー

```html
<div v-data-parser:items=""></div>
```

default: `fromDOM`

`data.extData.(カスタムキー)`以下にJSONデータを展開する

### .camel修飾子

```html
<div v-data-parser:items.camel=""></div>
```

JSONデータを指定したカスタムキーのキャメルケースでも展開します

### .pascal修飾子

```html
<div v-data-parser:items.pascal=""></div>
```

JSONデータを指定したカスタムキーのパスカルケースでも展開します
