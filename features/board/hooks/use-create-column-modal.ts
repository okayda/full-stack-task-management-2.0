import { useQueryState, parseAsBoolean } from "nuqs";

export const useCreateColumnModal = function () {
  const [isOpen, setIsOpen] = useQueryState(
    "create-column",
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
