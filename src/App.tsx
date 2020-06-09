import 'mobx-react-lite/batchingForReactDom'
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from "mobx-react";
import TodoListStore, { ITodoType } from "./store/TodoListStore";

interface IAppProps {
    store: TodoListStore;
}

interface IAppState {
    inputvalue: string;
}

@observer
class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);

        this.state = {
            inputvalue: '',
        }
    }

    handleAdd = () => {
        if (!!this.state.inputvalue) {
            this.props.store.push({ id: Math.random(), finished: false, title: this.state.inputvalue });
            this.setState({ inputvalue: '' });
        }
        else {
            alert('请输入内容');
        }
    }

    handleSelect = () => {
        if (!!this.state.inputvalue) {
            const todos = this.props.store.selectByTitle(this.state.inputvalue);
            console.log('todos:', todos);
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <div>
                    <div>
                        todoList.todos长度是：{this.props.store.todos.length}
                        未完成的个数是：{this.props.store.unfinishedTodoCount}
                    </div>
                    <div>
                        <input type="text" value={this.state.inputvalue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ inputvalue: e.target.value })} />
                        <button onClick={this.handleAdd}>添加</button>
                        <button onClick={this.handleSelect}>查找</button>
                    </div>
                    <ul>
                        {this.props.store.todos.map(todo => <AppView todo={todo} key={todo.id} onDelete={(id: number) => this.props.store.deleteById(id)} />)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;

const AppView = observer(({ todo, onDelete }: { todo: ITodoType, onDelete: (id: number) => void }) =>
    <li>
        <input type="checkbox" checked={todo.finished} onChange={() => todo.finished = !todo.finished} title="点击完成" />
        {todo.title}
        <span style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }} title="点击删除" onClick={() => onDelete(todo.id)}>X</span>
    </li>
);
