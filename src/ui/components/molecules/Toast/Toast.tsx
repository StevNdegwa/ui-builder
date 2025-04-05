import { FC, PropsWithChildren, ReactNode } from "react";
import { Notification } from "../Notification";
import { Wrapper } from "./styles";

export type ToastProps = PropsWithChildren<{
  title: ReactNode;
  show: boolean;
}>;

export const Toast: FC<ToastProps> = ({ title, show, children }) => {
  return (
    <Wrapper $show={show}>
      <Notification.Title>{title}</Notification.Title>
      <Notification.Description>{children}</Notification.Description>
    </Wrapper>
  );
};
