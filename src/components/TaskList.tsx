import { useState, FormEvent } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [lastId, setlastId] = useState(0);

  function handleCreateNewTask(event: FormEvent) {
    
    event.preventDefault();

    if ( !newTaskTitle ) return;

    setlastId(lastId + 1);

    const newTask = {
      id: lastId,
      title: newTaskTitle,
      isComplete: false
    }
    setTasks([...tasks, newTask]);

    setNewTaskTitle('');

  }

  function handleToggleTaskCompletion(id: number) {
    const allTasks = tasks.map( task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);
    setTasks(allTasks);
  }

  function handleRemoveTask(id: number) {
    const tasksFiltered = tasks.filter( task => task.id !== id);
    setTasks(tasksFiltered);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <form onSubmit={handleCreateNewTask}>
            <input 
              type="text" 
              placeholder="Adicionar novo todo" 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <FiCheckSquare size={16} color="#fff"/>
            </button>
          </form>
        </div>
      </header>

      <main>
        <ul>
          {tasks.length <= 0 ? (
            <li className="empty">Nada encontrado</li>
          ) : 
            tasks.map(task => (
              <li key={task.id}>
                <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                  <label className="checkbox-container">
                    <input 
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                    <p>{task.title}</p>
                  </label>
                </div>

                <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                  <FiTrash size={16}/>
                  <span>Deletar</span>
                </button>
              </li>
            )
          )}
          
        </ul>
      </main>

    </section>
  )
}