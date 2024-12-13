import { useQueryState, parseAsBoolean } from "nuqs";

export const useSettingColumnModal = function () {
  const [isOpen, setIsOpen] = useQueryState(
    "setting-column",
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
