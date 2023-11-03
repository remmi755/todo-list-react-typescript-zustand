import React from "react";

import { useToDoStore } from "../../data/stores/useToDoStore";

import styles from "./index.module.scss";

import { InputPlus } from "../components/InputPlus";
import { InputTask } from "../components/InputTask";

export const App: React.FC = () => {
  const [tasks, createTask, removeTask, updateTask, completeTask] =
    useToDoStore((state) => [
      state.tasks,
      state.createTask,
      state.removeTask,
      state.updateTask,
      state.completeTask,
    ]);

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>TO DO App</h1>
      <section className={styles.articleSection}>
        <InputPlus
          onAdd={(title) => {
            if (title) {
              createTask(title);
            }
          }}
        />
      </section>
      <section className={styles.articleSection}>
        {!tasks.length && (
          <p className={styles.articleText}>There is no one task</p>
        )}
        {tasks.map((task) => (
          <InputTask
            key={task.id}
            completed={task.isCompleted}
            id={task.id}
            title={task.title}
            onEdited={updateTask}
            onRemoved={removeTask}
            onCompleted={completeTask}
          />
        ))}
      </section>
    </article>
  );
};
