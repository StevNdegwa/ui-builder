import { FC, useState, useEffect } from "react";
import { Wrapper, EditorContainer } from "./styles";
import Editor, { BtnBold, BtnItalic, BtnRedo, BtnStrikeThrough, BtnUnderline, BtnUndo, Separator, Toolbar, BtnBulletList, BtnNumberedList, BtnLink } from "react-simple-wysiwyg";

export const WysiwygEditor: FC<BuilderFieldProps<string>> = ({
  onChange,
  initialValue = "",
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event: any) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Wrapper>
      <EditorContainer>
        {Editor ? (
          <div className="wysiwyg-editor">
            <Editor
              value={value}
              onChange={handleChange}
              placeholder="Enter your text here..."
              style={{
                minHeight: "120px",
                border: "none",
                outline: "none",
                fontFamily: "inherit",
                fontSize: "14px",
                lineHeight: "1.5"
              }}
            >
              <Toolbar>
                <BtnUndo/>
                <BtnRedo/>
                <Separator/>
                <BtnBold/>
                <BtnItalic/>
                <BtnUnderline/>
                <BtnStrikeThrough/>
                <Separator/>
                <BtnNumberedList/>
                <BtnBulletList/>
                <Separator/>
                <BtnLink/>
              </Toolbar>
            </Editor>
          </div>
        ) : (
          <textarea
            value={value}
            onChange={(e) => handleChange({ target: { value: e.target.value } })}
            placeholder="Enter your text here... (WYSIWYG editor not available)"
            style={{
              width: "100%",
              minHeight: "120px",
              border: "none",
              outline: "none",
              padding: "12px",
              fontFamily: "inherit",
              fontSize: "14px",
              lineHeight: "1.5",
              resize: "vertical"
            }}
          />
        )}
      </EditorContainer>
    </Wrapper>
  );
};
