import React, { Dispatch, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import CategorySelect from "@/components/(page)/signup/after/CategorySelect";

export default function InterModal({ isOpen, setIsOpen, content, routePath, token }: { isOpen: boolean, setIsOpen: Dispatch<boolean>, content?: string, routePath?: string, token?: string}) {
    console.log(isOpen);

    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];
    const onClose = () => setIsOpen(false);

    return (
        <div className="fixed w-full h-screen overflow-hidden backdrop-blur-md">
            <Modal 
                isOpen={isOpen} 
                onClose={onClose} 
                className="bg-white w-full h-full rounded-md max-w-[500px] max-h-[800px]"
                backdrop="blur"
            >
            <ModalContent>
                {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">관심사를 선택해주세요.</ModalHeader>
                <ModalBody className="h-[80%] overflow-auto ">
                    <CategorySelect />
                </ModalBody>
                <ModalFooter>
                <Button color="danger" onPress={onClose} className="text-sm from-neutral-600">
                    다음에 할께요.
                </Button>
                </ModalFooter>
                </>
                )}
            </ModalContent>
        </Modal>
        </div>
    );
}
