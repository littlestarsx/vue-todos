<template>
  <div class="todo">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="todoInfo" class="content">
      <nav>
        <router-link :to="{ name: 'Todos'}">←返回</router-link>
      </nav>
      <h2>{{ todoInfo.task_name }}</h2>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                loading: false,
                todoInfo: null,
                error: null
            }
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                this.error = this.todoInfo = null
                this.loading = true

                this.axios.get('http://ltodo.com/api/todo/show?id=' + this.$route.params.id)
                    .then((response) => {
                        this.loading = false
                        this.todoInfo = response.data.data
                    })
                    .catch((error) => {
                        this.error = error.toString()
                    });
            }
        }
    }
</script>

<style scoped>
  .todo {
    text-align: center;
  }
</style>
