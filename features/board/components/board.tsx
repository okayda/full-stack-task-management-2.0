"use client";

import React, { useState, useEffect, useCallback } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import { useCreateColumnModal } from "../hooks/use-create-column-modal";

import BoardHeader from "./board-header";
import BoardTaskCard from "./board-task-card";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { MAX_COLUMNS } from "../constants";

import { Task, StatusColumnItem } from "../types";

interface StatusColumnData {
  columns: StatusColumnItem[];
  boardId: string;
}

interface DataBoardProps {
  dataTasks: Task[];
  statusColumn: StatusColumnData;
  isDesktop: boolean;
}

type TasksState = {
  [key: string]: Task[];
};

type Payloads = {
  $id: string;
  statusId: string;
  statusName: string;
  position: number;
};

const buildTasksState = function (data: Task[]): TasksState {
  const tasksState: TasksState = {};

  data.forEach((task) => {
    const statusId = task.columnId;

    if (!tasksState[statusId]) tasksState[statusId] = [];
    tasksState[statusId].push(task);
  });

  Object.values(tasksState).forEach((tasks) => {
    tasks.sort((a, b) => a.position - b.position);
  });

  return tasksState;
};

export default function Board({
  dataTasks,
  statusColumn,
  isDesktop,
}: DataBoardProps) {
  const { open: openColumnFormModal } = useCreateColumnModal();
  const [tasks, setTasks] = useState<TasksState>(() =>
    buildTasksState(dataTasks),
  );

  useEffect(() => {
    setTasks(buildTasksState(dataTasks));
  }, [dataTasks]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;
      const sourceStatusId = source.droppableId;
      const destStatusId = destination.droppableId;

      const sameStatus = sourceStatusId === destStatusId;
      const sameIndexPosition = source.index === destination.index;

      // If the task is dropped in the same column & same order, do nothing
      if (sameStatus && sameIndexPosition) return;

      let updatesPayload: Payloads[] = [];

      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };

        const sourceColumn = [...newTasks[sourceStatusId]];
        const [movedTask] = sourceColumn.splice(source.index, 1);

        if (!movedTask) {
          console.error("No task found at the source index");
          return prevTasks;
        }

        const destStatus = statusColumn.columns.find(
          (column) => column.statusId === destStatusId,
        );

        if (!destStatus) {
          console.error("Destination status not found");
          return prevTasks;
        }

        const updatedMovedTask =
          sourceStatusId !== destStatusId
            ? {
                ...movedTask,
                columnId: destStatusId,
                statusName: destStatus.statusName,
              }
            : movedTask;

        newTasks[sourceStatusId] = sourceColumn;

        const destColumn = [...newTasks[destStatusId]];
        destColumn.splice(destination.index, 0, updatedMovedTask);
        newTasks[destStatusId] = destColumn;

        updatesPayload = [];

        // Update the moved task
        updatesPayload.push({
          $id: updatedMovedTask.$id,
          statusId: destStatusId,
          statusName: destStatus.statusName,
          position: Math.min((destination.index + 1) * 1000, 100_000),
        });

        // Update positions for tasks in the destination column
        newTasks[destStatusId].forEach((task, index) => {
          if (task && task.$id !== updatedMovedTask.$id) {
            const newPosition = Math.min((index + 1) * 1000, 100_000);
            if (task.position !== newPosition) {
              updatesPayload.push({
                $id: task.$id,
                statusId: destStatusId,
                statusName: destStatus.statusName,
                position: newPosition,
              });
            }
          }
        });

        // Update positions for tasks in the source column if column changed
        if (sourceStatusId !== destStatusId) {
          newTasks[sourceStatusId].forEach((task, index) => {
            if (task) {
              const newPosition = Math.min((index + 1) * 1000, 100_000);
              if (task.position !== newPosition) {
                updatesPayload.push({
                  $id: task.$id,
                  statusId: sourceStatusId,
                  statusName: movedTask.statusName,
                  position: newPosition,
                });
              }
            }
          });
        }

        return newTasks;
      });

      // onChange(updatesPayload);
    },
    [statusColumn],
  );

  return (
    <ScrollContainer
      vertical={false}
      hideScrollbars={false}
      ignoreElements={".board-task"}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="h-[calc(100vh-127px)] lg:h-[calc(100vh-138px)]">
          <div className="flex h-full cursor-ew-resize gap-x-6 pb-2 2xl:gap-x-2">
            {statusColumn.columns.map(({ statusId, statusName }) => {
              return (
                <div
                  key={statusId}
                  className="cursor-ew-resize rounded-md px-1.5 pb-1.5"
                >
                  <BoardHeader
                    statusName={statusName}
                    taskCount={tasks[statusId]?.length || 0}
                  />

                  <Droppable
                    droppableId={statusId}
                    renderClone={
                      isDesktop
                        ? (provided, _, rubric) => {
                            const sourceStatusId = rubric.source.droppableId;
                            const task =
                              tasks[sourceStatusId]?.[rubric.source.index];

                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={provided.draggableProps.style}
                                className="board-task"
                              >
                                {task && (
                                  <BoardTaskCard
                                    task={task}
                                    statusColumn={statusColumn}
                                  />
                                )}
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
                        {tasks[statusId]?.map((task, index) => {
                          const shouldRenderClone =
                            task.$id === snapshot.draggingFromThisWith;

                          return (
                            <React.Fragment key={task.$id}>
                              {shouldRenderClone && isDesktop ? (
                                <div className="relative">
                                  <div className="board-task absolute left-0 top-0 -z-[5] mb-6 w-full opacity-0">
                                    <BoardTaskCard
                                      task={task}
                                      statusColumn={statusColumn}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <Draggable draggableId={task.$id} index={index}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={provided.draggableProps.style}
                                      className="board-task mb-6"
                                    >
                                      <BoardTaskCard
                                        task={task}
                                        statusColumn={statusColumn}
                                      />
                                    </div>
                                  )}
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

            {statusColumn.columns.length !== MAX_COLUMNS && (
              <div className="on cursor-move rounded-md pb-1.5 pr-2 2xl:pr-0">
                <div
                  onClick={openColumnFormModal}
                  className="flex h-full w-[300px] cursor-pointer flex-col justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-100 text-muted-foreground transition 2xl:w-[310px]"
                >
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
