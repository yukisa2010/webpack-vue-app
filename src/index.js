import Vue from 'vue'

const app = new Vue({
    el: '#app',
    template: `<h1>{{hi}}</h1>`,
    data: {
        hi: "こんにちは"
    }
})