import React, { useId } from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import config from "../../config";

function TextEditor({ name = "content", control, defaultValue = "", label }) {
  const id = useId();
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        id={id}
        render={({ field: onChange }) => {
          <Editor
            initialValue={defaultValue}
            apiKey={config.tinyMceApiKey}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(content) => {
              onChange(content);
            }}
          />;
        }}
      />
    </>
  );
}

export default TextEditor;
