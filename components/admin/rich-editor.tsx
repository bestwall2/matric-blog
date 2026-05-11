"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
  AlignRight,
  AlignLeft,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function RichEditor({
  dir,
  value,
  onChange,
  placeholder,
}: {
  dir: "rtl" | "ltr";
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: placeholder ?? "ابدأ الكتابة..." }),
    ],
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[320px] prose prose-invert max-w-none px-4 py-4 focus:outline-none",
          dir === "rtl" ? "text-right" : "text-left"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;
    const cur = editor.getHTML();
    if (value && value !== cur) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div
      className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]"
      dir={dir}
    >
      <div className="flex flex-wrap gap-1 border-b border-white/10 bg-[#141414] px-2 py-2">
        <Tb icon={Bold} onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} />
        <Tb icon={Italic} onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} />
        <Tb icon={Strikethrough} onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} />
        <Tb icon={Heading2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} />
        <Tb icon={Heading3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} />
        <Tb icon={List} onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} />
        <Tb icon={ListOrdered} onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} />
        <Tb icon={Undo} onClick={() => editor.chain().focus().undo().run()} />
        <Tb icon={Redo} onClick={() => editor.chain().focus().redo().run()} />
        <Tb
          icon={dir === "rtl" ? AlignRight : AlignLeft}
          onClick={() =>
            editor.chain().focus().setTextAlign(dir === "rtl" ? "right" : "left").run()
          }
          active={editor.isActive({ textAlign: dir === "rtl" ? "right" : "left" })}
        />
        <Tb
          icon={LinkIcon}
          onClick={() => {
            const prev = editor.getAttributes("link").href as string | undefined;
            const url = window.prompt("رابط", prev || "https://");
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              return;
            }
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
          active={editor.isActive("link")}
        />
      </div>
      <EditorContent editor={editor} />
      <div className="flex justify-between border-t border-white/10 px-4 py-2 text-xs text-neutral-500">
        <span>
          {
            editor.getText().trim().split(/\s+/).filter(Boolean).length
          }{" "}
          كلمات تقريبًا
        </span>
      </div>
    </div>
  );
}

function Tb({
  icon: Icon,
  onClick,
  active,
}: {
  icon: typeof Bold;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <Button
      type="button"
      size="icon"
      variant={active ? "default" : "ghost"}
      className={cn(
        "size-8",
        active ? "bg-[#e11d48]" : "text-neutral-300 hover:text-white"
      )}
      onClick={onClick}
    >
      <Icon className="size-4" />
    </Button>
  );
}
