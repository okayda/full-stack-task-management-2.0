"use client";

import { useState, useEffect, useCallback } from "react";

import ScrollContainer from "react-indiana-drag-scroll";

import { MAX_COLUMNS } from "../constants";

import BoardHeader from "./board-header";
import BoardTaskCard from "./board-task-card";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

import { Task, TaskStatus } from "../types";

interface DataBoardProps {
  data: Task[];
  //   onChange: (
  //     tasks: { $id: string; status: TaskStatus; position: number }[],
  //   ) => void;
}

type TasksState = {
  [key in TaskStatus]: Task[];
};

type Payloads = {
  $id: string;
  status: TaskStatus;
  position: number;
};

const boards: TaskStatus[] = [
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
];

const buildTasksState = function (data: Task[]): TasksState {
  const tasksState: TasksState = {
    [TaskStatus.TODO]: [],
    [TaskStatus.IN_PROGRESS]: [],
    [TaskStatus.IN_REVIEW]: [],
    [TaskStatus.DONE]: [],
  };

  data.forEach((task) => {
    tasksState[task.status].push(task);
  });

  Object.values(tasksState).forEach((tasks) => {
    tasks.sort((a, b) => a.position - b.position);
  });

  return tasksState;
};

export default function Board({ data }: DataBoardProps) {
  const [tasks, setTasks] = useState<TasksState>(() => buildTasksState(data));

  useEffect(() => setTasks(buildTasksState(data)), [data]);

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceStatus = source.droppableId as TaskStatus;
    const destStatus = destination.droppableId as TaskStatus;

    const sameStatus = sourceStatus === destStatus;
    const sameIndexPosition = source.index === destination.index;

    // If the task dropped in the same column & order/index position do nothing
    if (sameStatus && sameIndexPosition) return;

    let updatesPayload: Payloads[] = [];

    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };

      const sourceColumn = [...newTasks[sourceStatus]];
      const [movedTask] = sourceColumn.splice(source.index, 1);

      if (!movedTask) {
        console.error("No task found at the source index");
        return prevTasks;
      }

      const updatedMovedTask =
        sourceStatus !== destStatus
          ? { ...movedTask, status: destStatus }
          : movedTask;

      newTasks[sourceStatus] = sourceColumn;

      const destColumn = [...newTasks[destStatus]];
      destColumn.splice(destination.index, 0, updatedMovedTask);
      newTasks[destStatus] = destColumn;

      updatesPayload = [];

      updatesPayload.push({
        $id: updatedMovedTask.$id,
        status: destStatus,
        position: Math.min((destination.index + 1) * 1000, 100_000),
      });

      newTasks[destStatus].forEach((task, index) => {
        if (task && task.$id !== updatedMovedTask.$id) {
          const newPosition = Math.min((index + 1) * 1000, 100_000);

          if (task.position !== newPosition) {
            updatesPayload.push({
              $id: task.$id,
              status: destStatus,
              position: newPosition,
            });
          }
        }
      });

      if (sourceStatus !== destStatus) {
        newTasks[sourceStatus].forEach((task, index) => {
          if (task) {
            const newPosition = Math.min((index + 1) * 1000, 100_000);
            if (task.position !== newPosition) {
              updatesPayload.push({
                $id: task.$id,
                status: sourceStatus,
                position: newPosition,
              });
            }
          }
        });
      }

      return newTasks;
    });

    // onChange(updatesPayload);
  }, []);

  return (
    // Allows you to move around in a horizontal way using cursor move
    <ScrollContainer
      vertical={false}
      hideScrollbars={false}
      // Disabled move around for task items only grabbing are allowed
      ignoreElements={".board-task"}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="h-[calc(100vh-116px)] lg:h-[calc(100vh-148px)]">
          {/* Board Container */}
          <div className="flex h-full cursor-move gap-x-6 pb-2">
            {boards.map((board) => {
              return (
                // Board Column
                <div
                  key={board}
                  className="cursor-move rounded-md px-1.5 pb-1.5"
                >
                  <BoardHeader board={board} taskCount={tasks[board].length} />

                  <Droppable droppableId={board}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[calc(100vh-182px)] w-[300px] lg:min-h-[calc(100vh-215px)]"
                      >
                        {tasks[board].map((task, index) => (
                          <Draggable
                            key={task.$id}
                            draggableId={task.$id}
                            index={index}
                          >
                            {(provided) => (
                              // Board Task
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="board-task mb-6"
                              >
                                <BoardTaskCard task={task} />
                              </div>
                            )}
                          </Draggable>
                        ))}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}

            {boards.length !== MAX_COLUMNS && (
              <div className="cursor-move rounded-md px-1.5 pb-1.5">
                <div className="flex h-full w-[300px] cursor-pointer flex-col justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-100 text-muted-foreground transition hover:border-[#0F0F0F] hover:text-[#0F0F0F]">
                  <h3 className="text-center text-2xl font-medium">
                    New Column
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </DragDropContext>
    </ScrollContainer>
  );
}
