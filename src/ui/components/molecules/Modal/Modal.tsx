import { FC, PropsWithChildren } from "react";
import { MdClose } from "react-icons/md";
import { Typography } from "@ui/components/atoms";
import { Contents, Header, Wrapper, Main, Footer, CloseButton } from "./styles";

export type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const handleClose = () => onClose();

  return (
    <Wrapper $show={isOpen}>
      <Contents direction="column">
        <Header align="center">
          <Typography heading="h2" size="lg">
            Modal
          </Typography>
        </Header>
        <Main wrap direction="row" gap="sm">
          {children}
        </Main>
        <Footer />
        <CloseButton
          onClick={handleClose}
          variant="text"
          size="lg"
          color="gray"
        >
          <MdClose />
        </CloseButton>
      </Contents>
    </Wrapper>
  );
};
