# UI Builder Layout Feature

## Overview

The UI Builder now supports different layout options for UI sections, allowing users to arrange elements in various configurations without coding.

## Features

### Layout Options

1. **Single Column Layout** (Default)
   - Elements stack vertically in a single column
   - Uses flexbox with `flex-direction: column`
   - 16px gap between elements

2. **Two Column Layout**
   - Elements arranged in two equal-width columns
   - Uses CSS Grid with `grid-template-columns: 1fr 1fr`
   - 16px gap between elements
   - Responsive design with `min-width: 0` for grid items

3. **Three Column Layout**
   - Elements arranged in three equal-width columns
   - Uses CSS Grid with `grid-template-columns: 1fr 1fr 1fr`
   - 16px gap between elements
   - Responsive design with `min-width: 0` for grid items

## How to Use

### For Users

1. **Select a Section Element**: Click on any UI section element in the builder
2. **Access Layout Settings**: In the properties panel on the right, you'll see a "Layout" section
3. **Choose Layout**: Click on "Single Column", "Two Columns", or "Three Columns" to change the layout
4. **Add Elements**: Add text, images, or bar charts to see them arranged according to the selected layout

### For Developers

#### Adding New Layout Options

1. **Update LayoutSelect Component** (`src/modules/builder/Field/LayoutSelect/LayoutSelect.tsx`):
   ```typescript
   const layouts = [
     {
       id: "single",
       label: "Single Column",
       description: "Elements stack vertically",
       icon: "📄",
     },
     {
       id: "two-column",
       label: "Two Columns", 
       description: "Elements arranged in two columns",
       icon: "📊",
     },
     {
       id: "three-column",
       label: "Three Columns",
       description: "Elements arranged in three columns",
       icon: "📋",
     },
     // Add new layouts here
   ];
   ```

2. **Update UISection Render Method** (`src/modules/controls/Section/Section.ts`):
   ```typescript
   render() {
     const layout = this.propData.get("layout") || "single";
     
     if (layout === "two-column") {
       return html`<div class="wrapper ui-ref two-column-layout">
         <slot name="contents" id="content-slot"></slot>
       </div>`;
     }
     
     if (layout === "three-column") {
       return html`<div class="wrapper ui-ref three-column-layout">
         <slot name="contents" id="content-slot"></slot>
       </div>`;
     }
     
     // Add more layout conditions here
     
     return html`<div class="wrapper ui-ref single-column-layout">
       <slot name="contents" id="content-slot"></slot>
     </div>`;
   }
   ```

3. **Update Section Styles** (`src/modules/controls/Section/styles.ts`):
   ```css
   :host(.ui-section) > .new-layout-class {
     /* Add your layout styles here */
   }
   ```

#### Component Structure

- **LayoutSelect**: Field component for selecting layout options
- **UISection**: Enhanced with layout property and conditional rendering
- **PropertiesForm**: Automatically shows layout options for section elements
- **BuildableControl**: Handles layout property updates

#### Files Modified

1. `src/modules/builder/Field/LayoutSelect/` - New layout selection component
2. `src/modules/builder/Field/Field.ts` - Added LayoutSelect to Field exports
3. `src/modules/builder/BuildableControl/configs.ts` - Added layout configuration
4. `src/modules/controls/Section/Section.ts` - Enhanced with layout support
5. `src/modules/controls/Section/styles.ts` - Added layout-specific styles
6. `src/ui/components/organisms/Sidebar/Sidebar.tsx` - Added layout settings icon

## Technical Details

### Layout Property

- **Property Name**: `layout`
- **Default Value**: `"single"`
- **Available Values**: `"single"`, `"two-column"`, `"three-column"`
- **Type**: String

### CSS Classes

- `.single-column-layout`: Applied when layout is "single"
- `.two-column-layout`: Applied when layout is "two-column"
- `.three-column-layout`: Applied when layout is "three-column"

### Styling

The layout system uses CSS Grid and Flexbox for responsive layouts:

```css
.single-column-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.two-column-layout > * {
  min-width: 0;
}

.three-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.three-column-layout > * {
  min-width: 0;
}
```

## Future Enhancements

Potential layout options to add:
- Four Column Layout
- Masonry Layout
- Sidebar Layout (content + sidebar)
- Header/Footer Layout
- Custom Grid Layout (user-defined columns)
- Three Row Layout
- Mixed Grid Layout (custom rows and columns)

## Testing

Use the test file `test-layout.html` to verify layout functionality:
1. Open the file in a browser
2. Click "Toggle Layout" to switch between single, two-column, and three-column layouts
3. Verify that elements rearrange correctly
