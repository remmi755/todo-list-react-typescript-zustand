import React, { useState, useRef, useEffect } from "react";

import styles from "./index.module.scss";

interface InputTaskProps {
  id: string;
  title: string;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
  onCompleted: (id: string, complete: boolean) => void;
  completed: boolean;
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  onRemoved,
  onEdited,
  onCompleted,
  completed,
  title,
}) => {
  const [checked, setChecked] = useState(completed);
  const [isEditMode, setEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  useEffect(() => {
    onCompleted(id, checked);
  }, [checked]);

  return (
    <div className={styles.inputTask}>
      <label
        htmlFor=""
        className={`${styles.inputTaskLabel} ${
          completed ? styles.completed : ""
        }`}
      >
        <input
          ref={editTitleInputRef}
          type="checkbox"
          disabled={isEditMode}
          checked={checked}
          className={styles.inputTaskCheckbox}
          onClick={() => {
            setChecked(!checked);
          }}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
        {isEditMode ? (
          <input
            className={styles.inputTaskTitleEdit}
            type="text"
            value={value}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEdited(id, value);
                setEditMode(false);
              }
            }}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}> {title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            onEdited(id, value);
            setEditMode(false);
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => {
            setEditMode(true);
          }}
        />
      )}
      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (confirm("Are you sure?")) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};
