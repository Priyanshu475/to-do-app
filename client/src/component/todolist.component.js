import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch(url,{signal: abortCont.signal})
      .then(res => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        }
        setIsPending(false);
        setError(err.message);
      })
    }, 1000);

    return () => abortCont.abort(); 

  }, [url])

  return { data, isPending, error };
}

  const Deletefunction=((id) => {
  console.log(id)
  fetch('http://localhost:3000/to-do/'+id,{
      method:'DELETE'}).then(()=>{
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
    })

    const EditFunction = (id, newData, callback) => {
    fetch(`http://localhost:3000/to-do/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error('Could not update the data for that resource');
          }
          return res.json();
        })
        .then((data) => {
          console.log('Data updated successfully', data);
          callback();
        })
        .catch((err) => {
          console.log(err);
        });
    };



const TodoList = ({ todos }) => {
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    title: '',
    description: '',
    date: '',
  });

  const handleDuplicateTodo = (todo) => {
    fetch(`http://localhost:3000/to-do/duplicate/${todo._id}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
      window.location.reload();
  };


  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setUpdatedData({
      title: todo.title,
      description: todo.description,
      date: todo.date.slice(0, 10),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    EditFunction(editingTodo._id, updatedData, () => {
      window.location.reload();
    });
  };

  

  return (
    <div>
      <div class="paper">
        <div class="lines">
          <div contenteditable>
            <h5><strong>Todo List</strong></h5>
            <ul>
              {todos.map((todo) => (
                <li key={todo._id}>
                  {todo === editingTodo ? (
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        value={updatedData.title}
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            title: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={updatedData.description}
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            description: e.target.value,
                          })
                        }
                      />
                      <input
                        type="date"
                        value={updatedData.date}
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            date: e.target.value,
                          })
                        }
                      />
                      <button type="submit">Save</button>
                      <button
                        type="button"
                        onClick={() => setEditingTodo(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) :
                   (
                    <li>
                    <strong>{todo.title}</strong>
                      <ul>
                        <li>
                          <strong>Description: </strong>
                          {todo.description}
                        </li>
                        <li>
                          <strong>Date: </strong>
                          {todo.date.slice(0, 10)}
                        </li>
                        <p className="lbutton">
                          <button onClick={() => handleEdit(todo)}>Edit</button>
                          <button onClick={() => Deletefunction(todo._id)}>Delete</button>
                          <button onClick={() => handleDuplicateTodo(todo)}>Duplicate</button>

                        </p>
                      </ul>
                    </li>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div class="holes">
          <div class="hole"></div>
          <div class="hole"></div>
          <div class="hole"></div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { error, isPending, data: todos } = useFetch('http://localhost:3000/to-do')
  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { todos && <TodoList todos={todos} /> }
    </div>
  );
}
 
export default Home;

