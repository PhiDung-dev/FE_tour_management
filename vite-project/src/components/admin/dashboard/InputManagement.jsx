import { useEffect, useState } from "react";

export default function InputManagement ({ label, value, onChange, type = "text" }) {
    return (
        <>
            <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">{label}</label>
                <input
                    type={type}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </>
    )
}
export function InputDropManagement ({ label, value, onChange, options = [] }) {
    return (
        <>
            <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">{label}</label>
                <select
                    className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    <option value="">Chọn địa điểm</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}
export function InputImage({ value = [], onChange }) {
  const [text, setText] = useState(() =>
    Array.isArray(value) ? value.join("\n") : ""
  );

  useEffect(() => {
    setText(Array.isArray(value) ? value.join("\n") : "");
  }, [value]);

  const syncImages = (nextText) => {
    const nextImages = nextText
      .split(/\r?\n/)
      .map((image) => image.trim())
      .filter(Boolean);

    onChange(nextImages);
  };

  const previewImages = text
    .split(/\r?\n/)
    .map((image) => image.trim())
    .filter(Boolean);

  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700">
        Hình ảnh, mỗi dòng một link
      </label>

      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        onBlur={(event) => syncImages(event.target.value)}
        placeholder={`https://example.com/image-1.jpg
https://example.com/image-2.jpg`}
        className="min-h-28 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />

      <p className="mt-1 text-xs text-slate-400">
        Nhập mỗi link ảnh trên một dòng. Rời khỏi ô nhập để cập nhật danh sách ảnh.
      </p>

      {previewImages.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {previewImages.map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt={`Ảnh tour ${index + 1}`}
              className="h-20 w-full rounded-md border border-slate-100 object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}