import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function TourFilter() {
  const [maxPrice, setMaxPrice] = useState(50000000);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <div className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3 border-b border-blue-100 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50">
          <FontAwesomeIcon
            icon={faFilter}
            className="text-lg"
            style={{ color: "rgb(116, 192, 252)" }}
          />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Bộ lọc</h3>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Tìm kiếm địa điểm
          </label>

          <div className="flex flex-col gap-3">
            <input
              className="h-11 w-full rounded-md border border-blue-200 px-4 text-base text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              type="text"
              placeholder="Nhập địa điểm"
            />

            <button
              className="inline-flex h-8 items-center justify-center gap-2 rounded-md bg-blue-500 px-5 font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800"
              type="button"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              Tìm
            </button>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="text-sm font-semibold text-slate-700">
              Mức giá tối đa
            </label>
            <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600">
              {formatPrice(maxPrice)}
            </span>
          </div>

          <input
            className="h-2 w-full cursor-pointer accent-blue-500"
            type="range"
            min={0}
            max={100000000}
            step={500000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />

          <div className="mt-2 flex justify-between text-xs font-medium text-slate-500">
            <span>0đ</span>
            <span>100.000.000đ</span>
          </div>
        </div>
      </div>
    </div>
  );
}