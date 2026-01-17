// hooks/useImagePreview.ts
import { useEffect, useState } from "react";

export const useImagePreview = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!files.length) return;

    const urls = files.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return { files, previews, setFiles, removeImage };
};
