import { useQueryState, parseAsBoolean } from "nuqs";

export const useCreateBoardModal = function () {
  const [isOpen, setIsOpen] = useQueryState(
    "create-board",
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
