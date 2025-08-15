import { FC, useRef, useState, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Input, Button } from "@ui/components";
import { Wrapper, FileInputWrapper, ImagePreview, ErrorMessage, InputWrapper, ClearButton } from "./styles";

// Import the default image source from the Image component
const DEFAULT_IMAGE_SOURCE =
  "https://images.unsplash.com/photo-1743832712501-62d9046c57e3?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Valid image file types
const VALID_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
  'image/tiff'
];

const VALID_IMAGE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.svg',
  '.bmp',
  '.tiff',
  '.tif'
];

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const ImageInput: FC<BuilderFieldProps<string>> = ({
  onChange,
  initialValue,
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState(initialValue || "");
  const [previewUrl, setPreviewUrl] = useState(initialValue || DEFAULT_IMAGE_SOURCE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle initial value and ensure default image is used when empty
  useEffect(() => {
    if (!initialValue || initialValue.trim() === "") {
      setImageUrl("");
      setPreviewUrl(DEFAULT_IMAGE_SOURCE);
      onChange(DEFAULT_IMAGE_SOURCE);
    } else {
      setImageUrl(initialValue);
      setPreviewUrl(initialValue);
    }
  }, [initialValue, onChange]);

  const validateImageFile = (file: File): boolean => {
    // Check MIME type
    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      // Fallback: check file extension
      const fileName = file.name.toLowerCase();
      const hasValidExtension = VALID_IMAGE_EXTENSIONS.some(ext => 
        fileName.endsWith(ext)
      );
      
      if (!hasValidExtension) {
        setError("Please select a valid image file (JPEG, PNG, GIF, WebP, SVG, BMP, or TIFF)");
        return false;
      }
    }
    
    // Check file size (optional - limit to 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError(`File size (${formatFileSize(file.size)}) must be less than 10MB`);
      return false;
    }
    
    setError("");
    return true;
  };

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    
    // If the URL is empty, use the default image
    if (!url.trim()) {
      setPreviewUrl(DEFAULT_IMAGE_SOURCE);
      setError("");
      onChange(DEFAULT_IMAGE_SOURCE);
    } else {
      setPreviewUrl(url);
      setError("");
      onChange(url);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate the file before processing
      if (!validateImageFile(file)) {
        // Clear the file input so user can try again
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);
        setPreviewUrl(result);
        setError("");
        onChange(result);
        setIsLoading(false);
      };
      reader.onerror = () => {
        setIsLoading(false);
        setError("Failed to read the image file. Please try again.");
      };
      reader.readAsDataURL(file);
    } else {
      // If no file is selected (user cleared the input), use default image
      setImageUrl("");
      setPreviewUrl(DEFAULT_IMAGE_SOURCE);
      setError("");
      onChange(DEFAULT_IMAGE_SOURCE);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearImage = () => {
    setImageUrl("");
    setPreviewUrl(DEFAULT_IMAGE_SOURCE);
    setError("");
    onChange(DEFAULT_IMAGE_SOURCE);
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageError = () => {
    setPreviewUrl(DEFAULT_IMAGE_SOURCE);
    setError("Failed to load the image. Please check the URL or try uploading a different file.");
    // Clear the file input if there was an uploaded file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Use default image when there's an error
    onChange(DEFAULT_IMAGE_SOURCE);
  };

  return (
    <Wrapper direction="column" gap="sm">
      <InputWrapper>
        <Input
          {...props}
          placeholder="Enter image URL or upload a file"
          value={imageUrl}
          onChange={(event) => handleUrlChange(event.currentTarget.value)}
        />
        {imageUrl.trim() && (
          <ClearButton
            onClick={handleClearImage}
            disabled={isLoading}
            type="button"
            title="Clear image"
            color="danger"
            icon={<XCircleIcon width={24} />}
          />
        )}
      </InputWrapper>
      
      <FileInputWrapper>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.tiff,.tif,image/*"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <Button
          size="sm"
          variant="outlined"
          onClick={handleUploadClick}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload Image"}
        </Button>
      </FileInputWrapper>

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {previewUrl && !error && (
        <ImagePreview>
          <img 
            src={previewUrl} 
            alt="Preview" 
            onError={handleImageError}
          />
        </ImagePreview>
      )}
    </Wrapper>
  );
};
