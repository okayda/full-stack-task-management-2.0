"use client";

import React, { useState, useEffect, useCallback } from "react";

import ScrollContainer from "react-indiana-drag-scroll";

import { useDragAndDropUpdateTasks } from "../api/use-drag-and-drop-update-tasks";

import { useGetBoardId } from "../hooks/use-get-board-id";

import BoardHeader from "./board-header";
import BoardTaskCard from "./board-task-card";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { MAX_COLUMNS, MAX_DRAG_AND_DROP_POSITION } from "../constants";

import { StatusColumn, Task } from "../types";
import { CreateColumnModal } from "./create-column-modal";
import { cn } from "@/lib/utils";

interface DataBoardProps {
  statusColumn: StatusColumn;
  tasks: Task[];
  isDesktop: boolean;
}

type TasksState = {
  [key: string]: Task[];
};

type Payloads = {
  $id: string;
  statusId: string;
  position: number;
};

const buildTasksState = function (
  statusColumn: StatusColumn,
  tasks: Task[],
): TasksState {
  const tasksState: TasksState = {};

  statusColumn.columns.forEach((column) => {
    tasksState[column.statusId] = [];
  });

  tasks.forEach((task) => {
    const statusId = task.statusId;

    tasksState[statusId].push(task);
  });

  Object.values(tasksState).forEach((tasks) => {
    tasks.sort((a, b) => a.position - b.position);
  });

  return tasksState;
};

export default function Board({
  statusColumn,
  tasks,
  isDesktop,
}: DataBoardProps) {
  const boardId = useGetBoardId();
  const [tasksData, setTasksData] = useState<TasksState>(() =>
    buildTasksState(statusColumn, tasks),
  );

  const { mutate: updateTasks } = useDragAndDropUpdateTasks();

  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);
  const openCreateColumnModal = () => setIsCreateColumnModalOpen(true);
  const closeCreateColumnModal = () => setIsCreateColumnModalOpen(false);

  useEffect(() => {
    setTasksData(buildTasksState(statusColumn, tasks));
  }, [tasks, statusColumn]);

  const onDragAndDropUpdateTasks = useCallback(
    (boardId: string, tasks: Payloads[]) => {
      updateTasks({
        json: { boardId, tasks },
      });
    },
    [updateTasks],
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;
      const sourceStatusId = source.droppableId;
      const destStatusId = destination.droppableId;

      const sameStatus = sourceStatusId === destStatusId;
      const sameIndexPosition = source.index === destination.index;

      // if the task is dropped in the same column & same order do nothing
      if (sameStatus && sameIndexPosition) return;

      let updatesPayload: Payloads[] = [];

      setTasksData((prevTasks) => {
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
                statusId: destStatusId,
                statusName: destStatus.statusName,
              }
            : movedTask;

        newTasks[sourceStatusId] = sourceColumn;

        const destColumn = [...newTasks[destStatusId]];
        destColumn.splice(destination.index, 0, updatedMovedTask);
        newTasks[destStatusId] = destColumn;

        updatesPayload = [];

        // update the moved task
        updatesPayload.push({
          $id: updatedMovedTask.$id,
          statusId: destStatusId,
          position: Math.min(
            (destination.index + 1) * 1000,
            MAX_DRAG_AND_DROP_POSITION,
          ),
        });

        // update positions for tasks in the destination column
        newTasks[destStatusId].forEach((task, index) => {
          if (task && task.$id !== updatedMovedTask.$id) {
            const newPosition = Math.min(
              (index + 1) * 1000,
              MAX_DRAG_AND_DROP_POSITION,
            );
            if (task.position !== newPosition) {
              updatesPayload.push({
                $id: task.$id,
                statusId: destStatusId,
                position: newPosition,
              });
            }
          }
        });

        // update positions for tasks in the source column if column changed
        if (sourceStatusId !== destStatusId) {
          newTasks[sourceStatusId].forEach((task, index) => {
            if (task) {
              const newPosition = Math.min(
                (index + 1) * 1000,
                MAX_DRAG_AND_DROP_POSITION,
              );
              if (task.position !== newPosition) {
                updatesPayload.push({
                  $id: task.$id,
                  statusId: sourceStatusId,
                  position: newPosition,
                });
              }
            }
          });
        }

        return newTasks;
      });

      onDragAndDropUpdateTasks(boardId, updatesPayload);
    },
    [boardId, statusColumn, onDragAndDropUpdateTasks],
  );

  return (
    <React.Fragment>
      <CreateColumnModal
        isCreateColumnModalOpen={isCreateColumnModalOpen}
        closeCreateColumnModal={closeCreateColumnModal}
      />

      <ScrollContainer
        vertical={false}
        hideScrollbars={false}
        ignoreElements={".board-task"}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="h-[calc(100vh-4.5rem)] pt-6 lg:h-[calc(100vh-6.6875rem)] lg:pt-0 2xl:lg:h-[calc(100vh-7rem)]">
            <div className="flex h-full cursor-ew-resize gap-x-6 pb-2 2xl:gap-x-8">
              {statusColumn.columns.map(({ statusId, statusName }, i) => {
                return (
                  <div
                    key={statusId}
                    className={cn(
                      "cursor-ew-resize rounded-md pb-1.5",
                      i === 4 && "pr-[0.625rem] lg:pr-[0.875rem] 2xl:pr-0",
                    )}
                  >
                    <BoardHeader
                      statusColumn={statusColumn}
                      statusId={statusId}
                      statusName={statusName}
                      taskCount={tasksData[statusId]?.length || 0}
                    />
                    <Droppable
                      droppableId={statusId}
                      renderClone={
                        isDesktop
                          ? (provided, _, rubric) => {
                              const sourceStatusId = rubric.source.droppableId;
                              const task =
                                tasksData[sourceStatusId]?.[
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
                          className="h-full min-h-fit w-[18.75rem] pb-6 2xl:max-h-[calc(100vh-11.875rem)] 2xl:min-h-0 2xl:w-[19.375rem] 2xl:overflow-y-auto 2xl:overflow-x-hidden 2xl:pb-0 2xl:pr-2 2xl:pt-1"
                        >
                          {tasksData[statusId]?.map((task, index) => {
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
                                  <Draggable
                                    draggableId={task.$id}
                                    index={index}
                                  >
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
                <div className="cursor-move rounded-md pb-1.5 pr-[0.375rem] lg:pr-[0.875rem] 2xl:pr-0">
                  <div
                    onClick={openCreateColumnModal}
                    className="flex h-full w-[18.75rem] cursor-pointer flex-col justify-center rounded-lg border border-dashed border-neutral-300 bg-[#FAFAFA] text-muted-foreground transition 2xl:w-[19.5rem]"
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
    </React.Fragment>
  );
}
