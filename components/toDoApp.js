const toDoApp = {

   data() {
      return {
         todos: [],
         allTodos: [],
         doneTodos: [],
         undoneTodos: [],
         inputValue: '',
         searchValue: '',
      }
   },

   methods: {
      addTodo() {
         if (this.inputValue !== '') {
         this.todos = this.allTodos;
         this.todos.unshift({userId: 1, id: this.todos.length + 1, title: this.inputValue, completed: false,});
         this.allTodos = this.todos;
         this.inputValue = '';
         }
      },
      
      /* delTodo(todo) {
         this.todos = this.allTodos;
         this.todos.splice(todo, 1);
         this.allTodos = this.todos;
      }, */

      async getApi() {
         try {
            let api = 'https://jsonplaceholder.typicode.com/todos';
            const reply = await fetch(api);
            const data = await reply.json();
            data.sort((a,b) => a.completed - b.completed);
            this.todos = data;
            this.allTodos = data;
         } catch {
            console.log('Api is down. Try later')
         }
      },

      all() {
         this.todos = this.allTodos;
         this.sort();
      },

      sort() {
         this.todos.sort((a,b) => a.completed - b.completed);
      },

      changed() {
         this.sort();
         localStorage.setItem("todosArray", JSON.stringify(this.allTodos));
      },

      sortDone() {
         this.doneTodos = this.allTodos.filter(i => i.completed === true);
         this.todos = this.doneTodos;
      },

      sortUndone() {
         this.undoneTodos = this.allTodos.filter(i => i.completed === false);
         this.todos = this.undoneTodos;
      },

      searchTodos() {
         this.todos = this.allTodos;
         this.todos = this.todos.filter(i => i.title.toLowerCase().includes(this.searchValue.toLowerCase()));
         this.sort();
      },
   },

   mounted() {
      const i = JSON.parse(localStorage.getItem("todosArray"));
      if (i !== null) {
         this.allTodos = i;
         this.todos = this.allTodos;
      } else {
         this.getApi();
      }
      this.sort();
  }
}

Vue.createApp(toDoApp).mount('#toDoApp')