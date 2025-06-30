import { createPortal } from "react-dom";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@ui/components";
import { FC } from "react";

export type CopyPageProps = {
  container: HTMLDivElement | null;
};

export const CopyPage: FC<CopyPageProps> = ({ container }) => {
  if (!container) {
    console.warn("CopyPage: No container provided for portal.");
    return null;
  }

  return createPortal(
    <IconButton icon={<ClipboardDocumentIcon width={24} />}></IconButton>,
    container
  );
};
