# todos

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

```
main.js -> router/index.js -> vue文件 -> api/api.js -> mock/index.js -> mock/mock.js （模拟数据） -> mock/data/*.js

main.js -> router/index.js -> components/layouts.vue -> components/menus.vue（左侧）
                                                     -> components/todo.vue (右侧) -> components/item.vue  
 
```
