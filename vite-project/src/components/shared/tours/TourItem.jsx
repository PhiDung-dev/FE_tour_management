import { useEffect, useState } from "react";
import {
  faLocationDot,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Heart } from "lucide-react";

import { Link } from "react-router-dom";

import { createFavoriteTour, deleteFavoriteTour, readFavoriteTours } from "../../../api/favoriteTourApi";
import { getAccountIdFromToken } from "../../../utils/jwt";

import { readUsers } from "../../../api/userApi";

const fallbackImage =
  "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80";

function formatPrice(price) {
  if (
    price === null ||
    price === undefined ||
    price === ""
  ) {
    return "Liên hệ";
  }

  return new Intl.NumberFormat(
    "vi-VN",
    {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }
  ).format(Number(price));
}

function getResult(data) {
  return data?.result || data || [];
}

export default function TourItem({
  id,
  title,
  description,
  price,
  location,
  image,
  images = [],
}) {
  const [isFavorite, setIsFavorite] =
    useState(false);

  const [favoriteId, setFavoriteId] =
    useState("");

  const [loadingFavorite, setLoadingFavorite] =
    useState(false);

  const [imageSrc, setImageSrc] =
    useState(
      image ||
        images?.[0] ||
        fallbackImage
    );

  useEffect(() => {
    checkFavorite();
  }, [id]);

  const checkFavorite = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) return;

      const accountId =
        getAccountIdFromToken(token);

      if (!accountId) return;

      const userData =
        await readUsers();

      const users =
        getResult(userData);

      const currentUser =
        users.find(
          (user) =>
            String(
              user.account?.id ||
                user.accountId
            ) === String(accountId)
        );

      if (!currentUser?.id) return;

      const favoriteData =
        await readFavoriteTours();

      const favorites =
        getResult(favoriteData);

      const foundFavorite =
        favorites.find(
          (favorite) =>
            String(
              favorite.user?.id ||
                favorite.userId
            ) ===
              String(
                currentUser.id
              ) &&
            String(
              favorite.tour?.id ||
                favorite.tourId
            ) === String(id)
        );

      if (foundFavorite) {
        setIsFavorite(true);

        setFavoriteId(
          foundFavorite.id
        );
      }
    } catch (error) {
      console.error(
        "Lỗi khi kiểm tra favorite:",
        error
      );
    }
  };

  const handleToggleFavorite =
  async (e) => {
    e.preventDefault();

    e.stopPropagation();

    try {
      setLoadingFavorite(true);

      const userId =
        localStorage.getItem(
          "userId"
        );

      if (!userId) {
        alert(
          "Vui lòng cập nhật thông tin cá nhân trước."
        );

        return;
      }

      // bỏ yêu thích
      if (isFavorite) {
        await deleteFavoriteTour(
          favoriteId
        );

        setIsFavorite(false);

        setFavoriteId("");

        return;
      }

      // thêm yêu thích
      const payload = {
        userId,
        tourId: id,
      };

      console.log(
        "FAVORITE PAYLOAD:",
        payload
      );

      const response =
        await createFavoriteTour(
          payload
        );

      console.log(
        "FAVORITE RESPONSE:",
        response
      );

      const savedFavorite =
        response?.result ||
        response;

      setIsFavorite(true);

      setFavoriteId(
        savedFavorite.id
      );
    } catch (error) {
      console.error(
        "FAVORITE ERROR:",
        error.response?.data ||
          error
      );

      alert(
        error.response?.data
          ?.message ||
          "Không thể thêm yêu thích."
      );
    } finally {
      setLoadingFavorite(false);
    }
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          src={imageSrc}
          alt={
            title ||
            "Tour image"
          }
          onError={() =>
            setImageSrc(
              fallbackImage
            )
          }
        />

        <button
          type="button"
          disabled={
            loadingFavorite
          }
          onClick={
            handleToggleFavorite
          }
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-md shadow-sm backdrop-blur transition ${
            isFavorite
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white/90 text-slate-500 hover:bg-red-50 hover:text-red-500"
          }`}
          title={
            isFavorite
              ? "Bỏ yêu thích"
              : "Lưu tour yêu thích"
          }
        >
          <Heart
            size={20}
            fill={
              isFavorite
                ? "currentColor"
                : "none"
            }
            strokeWidth={2.4}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-500">
          <FontAwesomeIcon
            icon={
              faLocationDot
            }
            style={{
              color:
                "rgb(116, 192, 252)",
            }}
          />

          <span className="line-clamp-1">
            {location ||
              "Chưa cập nhật"}
          </span>
        </div>

        <h2 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-slate-800 transition group-hover:text-blue-600">
          {title ||
            "Tên tour du lịch"}
        </h2>

        <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-slate-500">
          {description ||
            "Tour hiện chưa có mô tả chi tiết."}
        </p>

        <div className="flex items-end justify-between gap-3 border-t border-blue-50 pt-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Giá từ
            </p>

            <strong className="text-lg font-bold text-blue-600">
              {formatPrice(
                price
              )}
            </strong>
          </div>

          <Link
            className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800"
            to={`/tourDetail/${id}`}
          >
            Chi tiết

            <FontAwesomeIcon
              icon={
                faArrowRight
              }
              className="text-xs"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}