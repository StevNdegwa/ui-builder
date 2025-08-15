import styled from "styled-components";
import { FlexBox, IconButton } from "@ui/components";

export const Wrapper = styled(FlexBox)`
  width: 100%;
`;

export const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ImagePreview = styled.div`
  margin-top: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  max-width: 140px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  line-height: 1.25rem;
  padding: 0.25rem 0;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  
  input {
    padding-right: 2.5rem; /* Make room for the clear button */
  }
`;

export const ClearButton = styled(IconButton)`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
`;
