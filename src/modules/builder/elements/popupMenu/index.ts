export function popupMenu({
  name,
  children,
  attributes,
  title,
}: ElementConfigType & { title?: string }): ElementConfigType {
  return {
    name: "g",
    classNames: ["popup-menu-group", "popup-menu", `${name}-popup-menu`],
    attributes: {
      fill: "white",
      transform: "translate(-104, 0)",
      filter: "url(#shadow-filter)",
      opacity: "0",
      "pointer-events": "none",
      ...attributes,
    },
    children: [
      {
        name: "path",
        attributes: {
          d: "M99 1 L104 5 L99 9",
          "stroke-linejoin": "round",
        },
      },
      {
        name: "rect",
        classNames: ["popup-menu"],
        attributes: {
          width: 100,
          height: 44,
          rx: 4,
        },
      },
      {
        name: "g",
        classNames: ["popup-menu-content"],
        attributes: {
          transform: "translate(4, 4)",
        },
        children: [
          {
            name: "text",
            classNames: ["popup-menu-text"],
            attributes: {
              y: 8,
              "font-size": 12,
              fill: "black",
              "font-weight": 600,
            },
            textContent: title,
          },
          {
            name: "g",
            classNames: ["popup-menu-buttons"],
            attributes: {
              transform: "translate(0, 16)",
            },
            children,
          },
        ],
      },
    ],
  };
}
