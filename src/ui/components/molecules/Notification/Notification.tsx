import { FC } from "react";
import { Title } from "./Title";
import { Description } from "./Description";
import { FlexBox, FlexBoxProps } from "../../molecules/FlexBox";

export type NotificationProps = FlexBoxProps;

const _Notification: FC<NotificationProps> = ({ children, ...props }) => {
  return (
    <FlexBox padding="sm" direction="column" rounded="sm" gap="sm" {...props}>
      {children}
    </FlexBox>
  );
};

export const Notification = Object.assign(_Notification, {
  Title,
  Description,
});
