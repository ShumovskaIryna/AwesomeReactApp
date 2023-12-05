// we can use fetch but I wanted to try something new :-)
import axios from 'axios'

const instance = axios.create({
    // Better to move to .env
    baseURL: 'http://localhost:3000/todos',
    timeout: 5000,
});

const TodoApi = {
    async getTodosList({ limit, offset }) {
        const res = await instance(`?_page=${offset}&_limit=${limit}&_sort=id&_order=desc`);
        return res;
    },

    async addTodoItem(newTodo) {
        const res = await instance.post('', {...newTodo, checked: false});
        return res;
    },
    async deleteTodoItem(id) {
        const res = await instance.delete(`/${id}`);
        return res;
    },
    async updateTodoItem({
        id,
        title,
        checked,
      }) {
        const res = await instance.patch(`/${id}`, {
            id,
            title,
            checked,
          });
        return res;
    }
}


export default TodoApi;