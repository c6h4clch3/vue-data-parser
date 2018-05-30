/**
 * dataにextDataを追加(v-data-parserを利用しなければ空オブジェクト)し、
 * 加えてStringifyされたJSONを渡すことでJSONとしてdata.extDataの中にパースする
 * v-data-parserディレクティブを追加するプラグイン。
 * Valueとして評価しない(JSONパースするだけ)のでXSSを防止できる。
 * ディレクティブの引数(v-data-parser:hogehogeの形、デフォルト: 'fromDOM')
 * をキーとしてextData以下にパースしたオブジェクトを追加し、
 * .camel, .pascalの修飾子でキャメルケース及びパスカルケースでも
 * 同じオブジェクトを登録する。
 */
import Vue from 'vue';
import * as _ from 'lodash';

export default function() {

    // グローバルミックスインでdataにextDataを生やす
    Vue.mixin({
        data() {
            return {
                extData: {}
            };
        }
    });

    // パーサディレクティブの定義
    Vue.directive('data-parser', {
        bind(el, bindings, vnode) {
            let key = 'fromDOM';
            if (bindings.arg !== undefined && bindings.arg !== null) {
                key = bindings.arg;
            }

            try {
                vnode.context.$set(vnode.context.extData, key, JSON.parse(bindings.expression));
                if (bindings.modifiers['camel']) {
                    vnode.context.$set(vnode.context.extData, _.camelCase(key), JSON.parse(bindings.expression));
                }
                if (bindings.modifiers['pascal']) {
                    // lodashにはパスカルケースに変換するメソッドがないのでキャメルケースから変換
                    const camelKey = _.camelCase(key);
                    const pascalKey = camelKey.charAt(0).toUpperCase() + camelKey.slice(1);
                    vnode.context.$set(vnode.context.extData, pascalKey, JSON.parse(bindings.expression));
                }
            } catch (err) {
                if (err instanceof SyntaxError) {
                    console.error('Value is not valid JSON.');
                    vnode.context.$set(vnode.context.extData, key, 'error: Value is not valid JSON.');
                }
            }
        }
    });
};
