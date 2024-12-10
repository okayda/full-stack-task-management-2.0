import { useQueryState, parseAsBoolean } from "nuqs";

export const useTaskContentModal = function () {
  const [isOpen, setIsOpen] = useQueryState(
    "task-content",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
