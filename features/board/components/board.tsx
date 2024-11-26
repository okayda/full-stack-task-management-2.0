"use client";

import React, { useState, useEffect, useCallback } from "react";

import ScrollContainer from "react-indiana-drag-scroll";

import BoardHeader from "./board-header";
import BoardTaskCard from "./board-task-card";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { MAX_COLUMNS } from "../constants";

import { Task, TaskStatus } from "../types";

interface DataBoardProps {
  data: Task[];
  isDesktop: boolean;
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

export default function Board({ data, isDesktop }: DataBoardProps) {
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
    <ScrollContainer
      vertical={false}
      hideScrollbars={false}
      ignoreElements={".board-task"}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="h-[calc(100vh-127px)] lg:h-[calc(100vh-138px)]">
          {/* Board Container */}
          <div className="flex h-full cursor-ew-resize gap-x-6 pb-2 2xl:gap-x-2">
            {boards.map((board) => {
              return (
                // Board Column
                <div
                  key={board}
                  className="cursor-ew-resize rounded-md px-1.5 pb-1.5"
                >
                  <BoardHeader board={board} taskCount={tasks[board].length} />

                  <Droppable
                    droppableId={board}
                    renderClone={
                      isDesktop
                        ? (provided, _, rubric) => {
                            const sourceBoard = rubric.source.droppableId;
                            const task =
                              tasks[sourceBoard as TaskStatus]?.[
                                rubric.source.index
                              ];

                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={provided.draggableProps.style}
                                className="board-task"
                              >
                                <BoardTaskCard task={task} />
                              </div>
                            );
                          }
                        : undefined
                    }
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="h-full min-h-fit w-[300px] pb-6 2xl:max-h-[calc(100vh-215px)] 2xl:min-h-0 2xl:w-[310px] 2xl:overflow-y-auto 2xl:overflow-x-hidden 2xl:pb-0 2xl:pr-2.5 2xl:pt-1"
                      >
                        {tasks[board].map((task, index) => {
                          const shouldRenderClone =
                            task.$id === snapshot.draggingFromThisWith;

                          // Task card
                          return (
                            <React.Fragment key={task.$id}>
                              {shouldRenderClone && isDesktop ? (
                                // Overlay card once i drag it
                                <div className="relative">
                                  <div className="board-task absolute left-0 top-0 -z-[5] mb-6 w-full opacity-40">
                                    <BoardTaskCard task={task} />
                                  </div>
                                </div>
                              ) : (
                                // No overlay card
                                <Draggable draggableId={task.$id} index={index}>
                                  {(provided) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={provided.draggableProps.style}
                                        className="board-task mb-6"
                                      >
                                        <BoardTaskCard task={task} />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              )}
                            </React.Fragment>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}

            {boards.length !== MAX_COLUMNS && (
              <div className="cursor-move rounded-md pb-1.5 pr-2 2xl:pr-0">
                <div className="flex h-full w-[300px] cursor-pointer flex-col justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-100 text-muted-foreground transition hover:border-[#0F0F0F] hover:text-[#0F0F0F] 2xl:w-[310px]">
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
