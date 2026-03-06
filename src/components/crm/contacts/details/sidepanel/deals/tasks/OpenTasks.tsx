"use client";

import React from "react";
import { useOpenTasks } from "./hooks/useOpenTasks";
import OpenTasksHeader from "./sub-components/OpenTasksHeader";
import OpenTasksEmptyState from "./sub-components/OpenTasksEmptyState";
import TaskItem from "./sub-components/TaskItem";
import { Contact } from "../../../../types";
import AddTaskModal from "../../../../../../diary/modals/AddTaskModal";
import { useAppDispatch } from "../../../../../../../store/hooks/useRedux";
import { toggleTaskStatus } from "../../../../../../../store/slices/diarySlice";

interface OpenTasksProps {
  contact: Contact;
}

export default function OpenTasks({ contact }: OpenTasksProps) {
  const dispatch = useAppDispatch();
  const {
    taskCount,
    handleAddTask,
    toggleShowCompleted,
    showCompleted,
    isAddTaskModalOpen,
    handleCloseModal,
    contactTasks,
  } = useOpenTasks(contact);

  const handleToggleTask = (id: string) => {
    dispatch(toggleTaskStatus(id));
  };

  return (
    <div className="flex flex-col border border-input-stroke rounded-[1.2rem] overflow-hidden bg-primary">
      <OpenTasksHeader
        taskCount={taskCount}
        showCompleted={showCompleted}
        onAddTask={handleAddTask}
        onToggleCompleted={toggleShowCompleted}
      />

      <div className="bg-primary">
        {contactTasks.length > 0 ? (
          <div className="flex flex-col max-h-[30rem] overflow-y-auto custom-scrollbar">
            {contactTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />
            ))}
          </div>
        ) : (
          <div className="p-[2.4rem]">
            <OpenTasksEmptyState
              message={
                showCompleted
                  ? "There are no completed tasks"
                  : "There are no open tasks"
              }
            />
          </div>
        )}
      </div>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={handleCloseModal}
        contactId={contact.id}
      />
    </div>
  );
}
