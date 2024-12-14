import React from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";

import { Button } from "@nextui-org/button";

type TModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
  buttonText?: string;
  size?: "sm" | "md" | "lg";
  color?: "default" | "primary" | "success" | "warning" | "danger";
  isLoading?: boolean;
  modalSize?: "sm" | "md" | "lg" | "xl" | "2xl";
};

export default function TechTonicModal({
  isOpen,
  onOpen,
  onClose,
  children,
  buttonText,
  size,
  color,
  isLoading = false,
  modalSize = "2xl",
}: TModalProps) {
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          isLoading={isLoading}
          size={size || "md"}
          color={color || "default"}
          onPress={onOpen}
          variant="flat"
        >
          {buttonText || "open"}
        </Button>
      </div>
      <Modal isOpen={isOpen} size={modalSize} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
