
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { Button } from "@nextui-org/button";

export default function TechTonicModal({ isOpen, onOpen, onClose,children } : {isOpen:boolean, onOpen:()=>void, onClose:()=>void,children:React.ReactNode}) {
  

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button onPress={onOpen}>Open </Button>
      </div>
      <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
             
              <ModalBody>
                {children}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
