import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  background: white;
  
  ${({
    theme: {
      colorSchemes: {
        palette: { gray },
      },
      borderRadius,
    },
  }) => `
    border-color: ${gray[200]};
    border-radius: ${borderRadius.md};
    
    &:focus-within {
      border-color: ${gray[400]};
      box-shadow: 0 0 0 2px ${gray[100]};
    }
  `}
`;

export const EditorContainer = styled.div`
  flex: 1;
  min-height: 120px;
  
  /* Custom styling for react-simple-wysiwyg */
  .wysiwyg-editor {
    border: none !important;
    border-radius: 0 !important;
    
    /* Toolbar styling */
    .wysiwyg-toolbar {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 6px !important;
      padding: 12px 16px !important;
      background: #f8f9fa !important;
      border-bottom: 1px solid #e0e0e0 !important;
      min-height: 68px !important;
      align-items: center !important;
      
      ${({
        theme: {
          colorSchemes: {
            palette: { gray },
          },
        },
      }) => `
        background: ${gray[50]} !important;
        border-bottom-color: ${gray[200]} !important;
      `}
    }
    
    /* Style toolbar buttons */
    .wysiwyg-toolbar button {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-width: 44px !important;
      width: 44px !important;
      height: 44px !important;
      padding: 8px !important;
      border: 1px solid transparent !important;
      border-radius: 6px !important;
      background: transparent !important;
      color: #666 !important;
      cursor: pointer !important;
      font-size: 16px !important;
      transition: all 0.2s ease !important;
      margin: 0 !important;
      
      &:hover {
        background: #f0f0f0 !important;
        border-color: #d0d0d0 !important;
      }
      
      &:active {
        background: #e0e0e0 !important;
      }
      
      &.active {
        background: #e3f2fd !important;
        border-color: #2196f3 !important;
        color: #1976d2 !important;
      }
    }
    
    /* Hide unwanted toolbar items - show only the specified controls */
    .wysiwyg-toolbar button:not([data-command="undo"]):not([data-command="redo"]):not([data-command="bold"]):not([data-command="italic"]):not([data-command="underline"]):not([data-command="strikethrough"]):not([data-command="unorderedList"]):not([data-command="orderedList"]):not(.separator) {
      display: none !important;
    }
    
    /* Style toolbar separators */
    .wysiwyg-toolbar .separator {
      width: 1px !important;
      height: 32px !important;
      background: #e0e0e0 !important;
      margin: 0 6px !important;
    }
    
    /* Style the editor content area */
    .wysiwyg-content {
      border: none !important;
      outline: none !important;
      width: 100% !important;
      min-height: 120px !important;
      padding: 12px !important;
      font-family: inherit !important;
      font-size: 14px !important;
      line-height: 1.5 !important;
      resize: vertical !important;
      
      &::placeholder {
        color: #999 !important;
      }
    }
  }
`;
