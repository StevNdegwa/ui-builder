import { rgba } from "polished";
import { icon } from "../icons";

export function iconButton({
  name,
  attributes,
  children,
  popupMenu,
  events,
  closePopupMenu,
  title,
  icon: btnIcon,
}: ElementConfigType & {
  popupMenu?: ElementConfigType;
  closePopupMenu?: boolean;
  title?: string;
  icon?: {
    name: string;
  };
}): ElementConfigType {
  const groupSelector = `${name}-button`;

  const buttonColor =
    !attributes?.fill || attributes.fill === "none"
      ? rgba("white", 0)
      : "white";

  const buttonClickHandler: EventListener = (mouseEvent: Event) => {
    const button = mouseEvent.currentTarget as SVGRectElement;

    if (button && button.parentElement) {
      const containerElement = button.parentElement;

      if (containerElement) {
        const popupMenuGroup = containerElement.querySelector(
          `.${groupSelector} > .popup-menu`
        ) as SVGElement;

        if (popupMenuGroup) {
          popupMenuGroup.setAttribute("opacity", "1");
          popupMenuGroup.setAttribute("pointer-events", "all");

          const handleClick = (e: MouseEvent) => {
            if (
              !containerElement.contains(e.target as Node) ||
              closePopupMenu
            ) {
              popupMenuGroup.setAttribute("opacity", "0");
              popupMenuGroup.setAttribute("pointer-events", "none");

              document.removeEventListener("click", handleClick);
            }
          };

          document.addEventListener("click", handleClick);
        }
      }
    }

    if (events?.click) {
      events.click(mouseEvent);

      if (closePopupMenu) {
        const popupMenu = button.closest(`.popup-menu`) as SVGElement;

        if (popupMenu) {
          popupMenu.setAttribute("opacity", "0");
          popupMenu.setAttribute("pointer-events", "none");
        }
      }
    }
  };

  const childrenList: ElementConfigType[] = [
    {
      name: "rect",
      classNames: ["button"],
      events: {
        ...events,
        click: buttonClickHandler,
      },
      attributes: {
        fill: buttonColor,
        stroke: "none",
        width: 24,
        height: 24,
        rx: 4,
      },
      children: [
        {
          name: "title",
          textContent: title,
        },
      ],
    },
  ];

  if (children && children.length > 0) {
    childrenList.push(...children);
  }

  if (popupMenu) {
    childrenList.push(popupMenu);
  }

  if (btnIcon) {
    childrenList.push(
      icon({
        name: btnIcon.name,
        attributes: {
          "pointer-events": "none",
          transform: `translate(2,2)`,
        },
      })
    );
  }

  return {
    name: "g",
    classNames: [groupSelector, "button", "icon-button"],
    attributes: {
      fill: "currentColor",
      ...attributes,
    },
    children: childrenList,
  };
}
