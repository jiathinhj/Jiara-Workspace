import React from "react";
import imageCompression from "browser-image-compression";

export const useFileResize = () => {
  const getBase64 = (compressedFile: any) => {
    return new Promise((resolve) => {
      let baseURL = "";
      const reader: any = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  const resizeFile = async (file: any) => {
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 200,
      useWebWorker: true,
    }; // compress img settings
    const compressedFile = await imageCompression(file, options);
    await getBase64(compressedFile).then((result) => {
      file["base64"] = result;
    });
    return file;
  };

  return resizeFile;
};
