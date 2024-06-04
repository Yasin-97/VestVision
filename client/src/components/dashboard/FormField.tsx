import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ChangeEvent } from "react";
import { Toolbar } from "./Toolbar";

type FormFieldType = {
  placeholder: string;
  handleChange: (str: string | ChangeEvent<HTMLInputElement>) => void;
  labelName?: string;
  className?: string;
  textAreaRow?: number;
  value?: any;
  inputType?: string;
  isTextArea?: boolean;
  isLoading?: boolean;
};
const FormField = ({
  labelName,
  className,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
  isLoading,
}: FormFieldType) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: value,
    editorProps: {
      attributes: {
        class:
          " min-h-[250px] py-[15px] sm:px-[25px] px-[15px] outline-none  b font-epilogue text-white text-[14px] placeholder:text-[#4b5264]",
      },
    },
    onUpdate({ editor }) {
      handleChange(editor.getHTML());
    },
  });

  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea && editor ? (
        <div className="rich-text bg-transparent border-[1px] border-[#3a3a43] rounded-[10px] sm:min-w-[300px]">
          <Toolbar editor={editor} />
          <EditorContent
            editor={editor}
            disabled={isLoading}
            spellCheck
            required
            placeholder={placeholder}
          />
        </div>
      ) : (
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
