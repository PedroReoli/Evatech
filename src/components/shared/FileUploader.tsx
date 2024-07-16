import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(convertFileToUrl(acceptedFiles[0]));
      }
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-white rounded-xl cursor-pointer border-2 border-purple-1"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            {file[0]?.type === "application/pdf" ? (
              <embed src={fileUrl} width="100%" height="600px" type="application/pdf" />
            ) : (
              <img src={fileUrl} alt="uploaded file" className="file_uploader-img" />
            )}
          </div>
          <p className="file_uploader-label">Clique ou arraste uma foto ou PDF</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Coloque seu arquivo aqui
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG, PDF</p>
          <Button type="button" className="shad-button_dark_4">
            Selecionar nos arquivos locais
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
