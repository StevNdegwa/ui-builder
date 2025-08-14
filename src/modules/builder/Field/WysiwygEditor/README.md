# WYSIWYG Editor for UI Builder

This component provides a rich text editing experience for the UI Builder, replacing the simple textarea with a WYSIWYG editor that supports HTML formatting.

## Features

### Current Implementation (with react-simple-wysiwyg)
- **Rich Text Editor**: Full WYSIWYG editing experience
- **Built-in Toolbar**: Professional formatting tools
- **Text Formatting**: Bold, Italic, Underline, Strikethrough
- **Headings**: Multiple heading levels
- **Lists**: Unordered and Ordered lists
- **Links**: Insert and edit links
- **Alignment**: Text alignment options
- **Clean HTML Output**: Generates semantic HTML markup
- **Responsive Design**: Works well in the settings sidebar
- **Accessibility**: Built-in accessibility features

## Usage

The WYSIWYG editor is automatically used for text elements in the UI Builder. When editing a text element:

1. Click the edit control on any text element
2. The settings sidebar will open with the WYSIWYG editor
3. Use the toolbar buttons to format your text
4. The formatted HTML will be applied to the text element

## Toolbar Functions

The react-simple-wysiwyg editor provides a comprehensive toolbar with:

- **Text Formatting**: Bold, Italic, Underline, Strikethrough
- **Headings**: Multiple heading levels (H1, H2, H3, etc.)
- **Lists**: Unordered and Ordered lists
- **Links**: Insert and edit links with URL input
- **Alignment**: Left, Center, Right, Justify text alignment
- **Indentation**: Increase and decrease text indentation
- **Clear Formatting**: Remove all formatting from selected text

## Technical Details

- **Component**: `WysiwygEditor`
- **Type**: `BuilderFieldProps<string>`
- **Output**: HTML string with formatting tags
- **Integration**: Automatically used for "text-content" field in buildable controls

## Styling

The editor uses styled-components and integrates with the UI Builder's theme system:
- Consistent border colors and border radius
- Focus states with theme colors
- Responsive toolbar layout
- Clean, modern appearance

## Browser Compatibility

- Modern browsers with ES6+ support
- Full compatibility with react-simple-wysiwyg requirements
- Responsive design that works across different screen sizes
