import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ChangeEvent } from "react";
import { Toolbar } from "./Toolbar";

type FormFieldType = {
  placeholder: string;
  handleChange: (
    str: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  labelName?: string;
  className?: string;
  textAreaRow?: number;
  value?: any;
  inputType?: string;
  isTextEditor?: boolean;
  isTextArea?: boolean;
  isLoading?: boolean;
};
const FormField = ({
  labelName,
  className,
  textAreaRow,
  placeholder,
  inputType,
  isTextEditor,
  isTextArea,
  value,
  handleChange,
  isLoading,
}: FormFieldType) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    editorProps: {
      attributes: {
        class:
          " min-h-[250px] py-[15px] sm:px-[25px] px-[15px] outline-none font-epilogue text-white text-[14px] placeholder:text-[#4b5264]",
      },
    },
    onCreate({ editor }) {
      editor.on("transaction", ({ editor }) => {
        handleChange(editor.getHTML());
      });
    },
  });

  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea && (
        <textarea
          disabled={isLoading}
          spellCheck
          required
          value={value}
          onChange={handleChange}
          rows={textAreaRow}
          placeholder={placeholder}
          className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] ${className}`}
        />
      )}
      {isTextEditor && editor && (
        <div className="rich-text bg-transparent border-[1px] border-[#3a3a43] rounded-[10px] sm:min-w-[300px]">
          <Toolbar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      )}

      {!isTextEditor && !isTextArea && (
        <input
          disabled={isLoading}
          spellCheck
          required
          value={value}
          onChange={(e) => handleChange(e)}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] ${className}`}
        />
      )}
    </label>
  );
};

export default FormField;
