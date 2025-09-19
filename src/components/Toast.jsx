import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

function Toast({
  toastId,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Sim, confirmar",
  cancelText = "Cancelar",
}) {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    toast.dismiss(toastId);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    toast.dismiss(toastId);
  };

  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-neutral-200/50 bg-[#FFFBF5] p-4 text-[#5A2C40] shadow-lg dark:border-neutral-800 dark:bg-[#2c1f26] dark:text-[#f2e9ec]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5A2C40]/10">
          <AlertTriangle className="h-6 w-6 text-[#5A2C40]/80" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="flex w-full justify-end gap-2 pt-2">
        <button
          onClick={handleCancel}
          className="inline-flex h-9 items-center justify-center rounded-md border border-[#5A2C40]/20 cursor-pointer bg-transparent px-4 py-2 text-sm font-medium text-[#5A2C40] transition-colors hover:bg-[#5A2C40]/5 dark:text-neutral-50 dark:hover:bg-white/10"
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          className="inline-flex h-9 items-center justify-center rounded-md bg-[#5A2C40] cursor-pointer px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5A2C40]/90"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}

export default Toast;