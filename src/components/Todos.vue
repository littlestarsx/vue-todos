<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="panel panel-default">
          <div class="panel-heading text-center">
            计划要做的事情，共 {{ todoListCount }} 件
          </div>
          <div class="panel-body">
            <div class="list-groups">
              <a class="list-group-item" v-bind:class="{ 'completed': todo.is_complete }" v-for="(todo, index) in todoList">
                <router-link :to="{ name: 'Todo', params: { id: todo.id }}">{{ todo.task_name }}</router-link>
                <button class="btn btn-xs btn-danger pull-right" v-on:click='handleDelete(index, todo)'title="删除">✘</button>
                <button class="btn btn-xs pull-right" v-on:click='handleComplete(index, todo)' v-bind:class="[todo.completed ? 'btn-success': '']" v-bind:title="[todo.completed ? '点击，标记为未完成': '点击，标记为已完成']">✔</button>
              </a>
            </div>
          </div>
          <div class="panel-footer">
            <form v-on:submit.prevent="handleStore">
              <div class="form-group">
                <input type="text" class="form-control text-center" v-model="newTodo.task_name">
              </div>
              <button class="btn btn-default btn-block" type="submit">添加</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'todos',
        props: ['todos'],
        data () {
            return {
                todoList: [
                    {
                        id: 0,
                        task_name: '',
                        is_complete: 0,
                        complete_time: '',
                    }
                ],
                todoListCount: 0,
                newTodo: { task_name: '' }
            }
        },
        created: function(){
            this.handleIndex()
        },
        methods: {
            handleIndex() {
                this.axios.get('http://ltodo.com/api/todo/index').then((response) => {
                    this.todoListCount = response.data.data.count
                    this.todoList = response.data.data.list
                })
            },
            handleStore() {
                if (! this.newTodo.task_name.trim()) { return ; }
                this.axios.post('http://ltodo.com/api/todo/store', { 'task_name': this.newTodo.task_name })
                    .then((response) => {
                        this.todoListCount = this.todoListCount + 1
                        let pushItem = {
                            id: response.data.data.id,
                            task_name: this.newTodo.task_name,
                            is_complete: 0,
                            complete_time: '',
                        }
                        this.todoList.unshift(pushItem)
                        this.newTodo.task_name = ''
                    });
            },
            handleDelete(index, todo) {
                this.axios.post('http://ltodo.com/api/todo/delete', { 'id': todo.id } )
                    .then((response) => {
                        this.todoList.splice(index, 1)
                    });
            },
            handleComplete(index, todo) {
                this.axios.post('http://ltodo.com/api/todo/complete', { 'id': todo.id, 'is_complete': todo.is_complete ? 0 : 1} )
                    .then((response) => {
                        this.todoList[index].is_complete = this.todoList[index].is_complete ? 0 : 1
                    });
            }
        }
    }
</script>

<style scoped>
  .btn-xs+.btn-xs {
    margin-right: .5rem;
  }

  a.list-group-item.completed {
    background-color: #f5f5f5;
    text-decoration: line-through;
  }
</style>
