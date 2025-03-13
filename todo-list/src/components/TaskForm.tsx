import  {useState, useEffect, ChangeEvent, FormEvent} from "react";

import styles from "./TaskForm.module.css"
import { Task } from "../types/Task";


type Props = {
    btnText: string;
    taskList: Task[];
    setTaskList?: React.Dispatch<React.SetStateAction<Task[]>>
    task?: Task | null;
    handleUpdate?(id: number, title: string, difficulty: number): void;
}

const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => {

    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(0);

    useEffect(() => {
        if(task){
            setId(task.id);
            setTitle(task.title);
            setDifficulty(task.difficulty);
                }
    }, [task])

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(handleUpdate){
            handleUpdate(id, title, difficulty);
        }
        else{
            const id = Math.floor(Math.random() * 1000);
            const newTask: Task = { id, title, difficulty };

            if (setTaskList) {
                setTaskList([...taskList, newTask]);
            }
            

            setTitle("");
            setDifficulty(0);
        }

        

        console.log(taskList)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "title"){
            setTitle(e.target.value);
        }
        else{
            const value = e.target.value.trim();
            setDifficulty(value ? parseInt(e.target.value): 0);
        }
    }

  return (
    <form onSubmit={addTaskHandler} className={styles.form} >
        <label className={styles.input_container} >
            Título:
            <input type="text" name="title" placeholder="Título da tarefa" onChange={handleChange}
            value = {title} />
        </label>
        <label className={styles.input_container}>
            Dificuldade:
            <input type="text" name="difficulty" placeholder="Dificuldade da tarefa" onChange={handleChange}
            value={difficulty} />
        </label>
        <input type="submit" value={btnText} />
    </form>
  )
}

export default TaskForm