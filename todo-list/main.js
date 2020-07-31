
Vue.component('like', {
  props: ['counter', 'counter2'],
  template: `<div class="buttons__wrapper">
              <button type="submit" @click="increment('counter', counter)">👍 {{counter}}</button>
              <button type="submit" @click="increment('counter2', counter2)">👎 {{counter2}}</button>
             </div>`,
  methods: {
    increment(name, param) {
      this.$emit(`update:${name}`, param + 1)
    }
  }         
});

Vue.component('task-list', {
  props: ['tasks', 'title'],
  template: `<div class="list">
              <h2 v-if="title">{{title}}</h2>
              <div class="item" :class="{done: task.done}" v-for="task in tasks" :key="task.text">
               <input type="checkbox" v-model="task.done">
               {{ task.text }}
               <like :counter.sync="task.likes" :counter2.sync="task.dislikes"></like>
             </div>
            </div>`
});


var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue',
    headerLikes: 2,
    formLikes: 1,
    headerDislikes: 3,
    formDislikes: 5,
    tasks: [
      {text: 'Развернуть окружение в Codepen', done: true, likes: 0, dislikes: 2},
      {text: 'Сделать интернет-магазин на Vue', done: false, likes: 8, dislikes: 3},
      {text: 'Пройти курс по Vue', done: false, likes: 4, dislikes: 1}
    ],
  },
  methods: {
    addTask() {
      this.tasks.push({text: this.message, done: false, likes: 0, dislikes: 0});
      this.message = '';
    },
  },
  computed: {
    count() {
      return this.tasks.filter(task => !task.done).length;
    },
    uncompletedTasks() {
      return this.tasks.filter(task => !task.done);
    },
    completedTasks() {
      return this.tasks.filter(task => task.done);
    },
    countLikes() {
      return this.headerLikes + this.formLikes + this.tasks.reduce((acc, el) => acc + el.likes, 0)
    },
    dislikesCount() {
      return this.headerDislikes + this.formDislikes + this.tasks.reduce((acc, el) => acc + el.dislikes, 0)
    }
  }
});