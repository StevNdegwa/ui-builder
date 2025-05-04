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
      transform: "translate(-124, 0)",
      filter: "url(#shadow-filter)",
      opacity: "0",
      "pointer-events": "none",
      ...attributes,
    },
    children: [
      {
        name: "path",
        attributes: {
          d: "M119 1 L125 5 L119 9",
          "stroke-linejoin": "round",
        },
      },
      {
        name: "rect",
        classNames: ["popup-menu"],
        attributes: {
          width: 120,
          height: 64,
          rx: 4,
        },
      },
      {
        name: "g",
        classNames: ["popup-menu-content"],
        attributes: {
          transform: "translate(8, 8)",
        },
        children: [
          {
            name: "text",
            classNames: ["popup-menu-text"],
            attributes: {
              y: 12,
              "font-size": 14,
              fill: "black",
              "font-weight": 600,
            },
            textContent: title,
          },
          {
            name: "g",
            classNames: ["popup-menu-buttons"],
            attributes: {
              transform: "translate(0, 22)",
            },
            children,
          },
        ],
      },
    ],
  };
}
