import { FC, useCallback } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { Clipboard } from "@modules/system/Clipboard";
import { useBuilderContext } from "@modules/builder/BuilderContext";
import { IconButton } from "@ui/components";

export type CopyDocumentProps = {
    title?: string;
};

export const CopyDocument: FC<CopyDocumentProps> = ({ title = "Document" }) => {
    const { notify, buildableConfigs } = useBuilderContext();

    const getSectionElementString = useCallback(() => {
        return buildableConfigs.find(config => config.elementControl.elementName === "ui-section")?.elementControl.elementString || "";
    }, [buildableConfigs]);

    const handleClick = useCallback(() => {

        // Create the complete HTML document
        const htmlDocument = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${title}</title>
                    <script src="https://unpkg.com/@stevndegwa/ui-builder-components/controls-dist/ui-builder-controls.umd.js" async></script>
                </head>
                <body>${getSectionElementString()}</body>
            </html>
        `;

        Clipboard.copyText(htmlDocument)
            .then(() => {
                console.log("Copied document::", htmlDocument);
                notify(`${title} copied to clipboard`);
            })
            .catch((error) => {
                console.error("Error copying document to clipboard:", error);
                notify(`Failed to copy ${title} to clipboard`);
            });
    }, [title, getSectionElementString, notify]);

    return (
        <IconButton
            icon={<ClipboardDocumentIcon width={24} />}
            onClick={handleClick}
            title="Copy complete HTML document"
        />
    );
};
