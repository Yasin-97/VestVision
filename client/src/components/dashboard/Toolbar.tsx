import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { LuItalic } from "react-icons/lu";
import { LuBold } from "react-icons/lu";
import { Editor } from "@tiptap/react";
type ToolbarProps = { editor: Editor };

export const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className="flex gap-2 p-2 border-b border-[#3a3a43]">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-slate-700 rounded-[4px]" : ""}
      >
        <LuBold className="text-base text-slate-100 m-1 font-medium" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic") ? "bg-slate-700 rounded-[4px]" : ""
        }
      >
        <LuItalic className="text-base text-slate-100 m-1 font-medium" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "bg-slate-700 rounded-[4px]"
            : ""
        }
      >
        <LuHeading1 className="text-base text-slate-100 m-1" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "bg-slate-700 rounded-[4px]"
            : ""
        }
      >
        <LuHeading2 className="text-base text-slate-100 m-1" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "bg-slate-700 rounded-[4px]"
            : ""
        }
      >
        <LuHeading3 className="text-base text-slate-100 m-1" />
      </button>
    </div>
  );
};
