import { SettingColumnForm } from "./setting-column-form";

interface SettingColumnFormWrapperProps {
  onCancel: () => void;
}

export const SettingColumnFormWrapper = ({
  onCancel,
}: SettingColumnFormWrapperProps) => {
  return <SettingColumnForm onCancel={onCancel} />;
};
