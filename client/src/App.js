import { BrowserRouter as Router,Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './component/navbar.component';
import TodoList from './component/todolist.component';
import CreateTodo from './component/create-todo';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route path="/" exact component={TodoList} />
        <Route path="/create" component={CreateTodo} />
      </Router>
    </div>
  );
}

export default App;
