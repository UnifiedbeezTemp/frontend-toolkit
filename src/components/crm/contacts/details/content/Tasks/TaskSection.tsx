"use client";

import TaskItem from "./TaskItem";
import AddTaskModal from "../../../../../diary/modals/AddTaskModal";
import Button from "../../../../../ui/Button";
import { useContactTasks } from "../hooks/useContactTasks";
import Text from "../../../../../ui/Text";
import PlusIcon from "../../../../../../assets/icons/PlusIcon";

interface TaskSectionProps {
  contactId: string;
  searchQuery?: string;
}

export default function TaskSection({
  contactId,
  searchQuery = "",
}: TaskSectionProps) {
  const {
    tasks,
    isAddTaskModalOpen,
    handleToggleTask,
    openAddTaskModal,
    closeAddTaskModal,
  } = useContactTasks(contactId, searchQuery);

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <div className="flex items-center justify-between">
        <Text className="text-[2.2rem] font-bold text-dark-base-100">
          Task({tasks.length})
        </Text>
        <Button
          onClick={openAddTaskModal}
          variant="secondary"
          className="flex items-center gap-[0.8rem]"
        >
          <PlusIcon size={16} />
          Add task
        </Button>
      </div>

      <div className="flex flex-col">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggleTask}
            isLast={index === tasks.length - 1}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-[8rem] bg-input-filled/5 rounded-[2rem] border border-dashed border-input-stroke">
            <Text className="text-[1.6rem] font-bold text-dark-base-30">
              No tasks found for this contact
            </Text>
          </div>
        )}
      </div>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={closeAddTaskModal}
        contactId={contactId}
      />
    </div>
  );
}
