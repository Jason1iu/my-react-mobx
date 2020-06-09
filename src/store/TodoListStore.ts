import { observable, action, computed } from 'mobx';

export interface ITodoType {
    id: number;
    finished: boolean;
    title: string;
}

export default class TodoListStore {
    @observable todos: ITodoType[] = [];

    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }

    @action push(todo: ITodoType) {
        this.todos.push(todo);
    }

    @action update(todo: ITodoType) {
        const index = this.todos.indexOf(todo);
        this.todos.splice(index, 1, todo);
    }

    @action selectById(id: number) {
        const newTodos = this.todos.filter(todo => todo.id === id);
        return newTodos[0];
    }

    @action selectByTitle(title: string) {
        const newTodos = this.todos.filter(todo => todo.title.indexOf(title) > -1);
        return newTodos;
    }

    @action deleteByObject(todo: ITodoType) {
        const index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
    }

    @action deleteById(id: number) {
        const newTodos = this.todos.filter(todo => todo.id !== id);
        this.todos = newTodos;
    }
}