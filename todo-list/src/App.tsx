import { useState } from "react"

import Footer from "./components/Footer"
import Header from "./components/Header"

import styles from "./App.module.css"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

import { Task } from "./types/Task"
import Modal from "./components/Modal"

function App() {
 
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id;
      })
    )
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if(display){
      modal!.classList.remove("hide");
    }
    else{
      modal!.classList.add("hide");
    }
  }

  const editTask = (task: Task): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: Task = { id, title, difficulty };

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task 
    })

    setTaskList(updatedItems);

    hideOrShowModal(false);
  }

  return (
    <div>
      <Modal>
        <TaskForm 
          task={taskToUpdate} 
          btnText="Editar Tarefa" 
          taskList={taskList} 
          setTaskList={setTaskList} 
          handleUpdate={updateTask} 
        />
      </Modal>

      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer</h2>
          <TaskForm btnText="Criar Tarefa" taskList={taskList} setTaskList={setTaskList} handleUpdate={updateTask} 
          
          />
        </div>
        <div>
          <h2>Suas tarefas:</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
