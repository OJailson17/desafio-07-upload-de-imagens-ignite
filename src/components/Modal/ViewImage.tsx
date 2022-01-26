import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay>
        <ModalContent>
          <ModalBody p="0">
            <Image src={imgUrl} w="100%" />
          </ModalBody>

          <ModalFooter justifyContent="space-between" bg="pGray.800" h="32px">
            <Link href={imgUrl} target="_blank" fontSize="14">
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
