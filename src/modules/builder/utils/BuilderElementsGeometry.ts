import { ADD_ACTION_BUTTON_HEIGHT } from "../constants";
export class BuilderElementsGeometry {
  static overlay = ({
    width,
    height,
  }: ElementBox): Record<string, string | number> => ({
    width,
    height,
    x: 0,
    y: 0,
  });

  static topThumb = ({
    width,
  }: ElementBox): Record<string, string | number> => ({
    x1: width * 0.375,
    y1: 2,
    x2: width * 0.625,
    y2: 2,
  });

  static bottomThumb = ({
    width,
    height,
  }: ElementBox): Record<string, string | number> => ({
    x1: width * 0.375,
    y1: height - 2,
    x2: width * 0.625,
    y2: height - 2,
  });

  static leftThumb = ({
    height,
  }: ElementBox): Record<string, string | number> => ({
    x1: 2,
    y1: height * 0.375,
    x2: 2,
    y2: height * 0.625,
  });

  static rightThumb = ({
    width,
    height,
  }: ElementBox): Record<string, string | number> => ({
    x1: width - 2,
    y1: height * 0.375,
    x2: width - 2,
    y2: height * 0.625,
  });

  static addButton = ({
    width,
    height,
  }: ElementBox): Record<string, string | number> => ({
    transform: `translate(${width / 2}, ${
      height - ADD_ACTION_BUTTON_HEIGHT * 0.75
    })`,
  });

  static editButton = ({
    width,
    leftPadding,
    topPadding,
    y,
  }: ElementBox & Pos): Record<string, string | number> => ({
    transform: `translate(${width - (leftPadding || 0)}, ${
      y + (topPadding || 0)
    })`,
  });
}
