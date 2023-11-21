// import React from "react";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
// import { usePathname, useRouter } from "next/navigation";
// import { signOut } from "next-auth/react";


// type PublicModalProps = {
//     isOpen: boolean;
//     onOpenChange: (newValue: boolean) => void;
//     content: string;
//     routePath?: string;
//     token?: string;
// };

// const withdrawal = async (props: {token?: string}) => {
//   if (!props.token) {
//       console.error("Token is not provided.");
//       return;
//   }
//   try{

//       const response = await fetch("https://smilekarina.duckdns.org/api/v1/withdrawal", {
//               method: 'PUT',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${props.token}`
//               },                    
//           })
//       const data = await response.json();
//       if (data.success) {
//           //console.log("Withdrawal success.");
//           signOut({ callbackUrl: '/' })

//       } 

//   } catch(e) {
//       console.log(e);
//   }
// };

// export default function PublicModal({ isOpen, onOpenChange, content, routePath, token }: PublicModalProps) {
//     const router = useRouter();
//     const pathname = usePathname();

//     return (
//         <>

//             <Modal
//                 isOpen={isOpen}
//                 onOpenChange={onOpenChange}
//                 classNames={{
//                     closeButton: "hidden",
//                 }}
//             >
//                 <ModalContent>
//                     {(onClose) => (
//                         <>
//                             {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
//                             <ModalBody>
//                                 <p>{content}</p>
//                             </ModalBody>
//                             <ModalFooter>

//                                 <Button color="primary" onPress={() => {
//                                     if (pathname === "/withdrawal/leaveOnline") {
//                                         withdrawal({ token });
//                                     }
//                                     onClose();
//                                     if (routePath) {
//                                         router.push(routePath);
//                                     }
//                                     if (pathname === "/benefits/pntPlus/roulette") {
//                                         window.location.reload(); 
//                                     }
//                                 }}>
//                                     확인
//                                 </Button>
//                                 {pathname === "/withdrawal/leaveOnline" && (
//                                     <Button onPress={onClose}>취소</Button>
//                                 )}

//                             </ModalFooter>
//                         </>
//                     )}
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// }
import React from 'react'

export default function Modal() {
    return (
        <div>Modal</div>
    )
}

