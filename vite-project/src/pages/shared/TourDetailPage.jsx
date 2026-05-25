import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  Heart,
  MapPinned,
  Send,
  Star,
} from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBolt,
  faCircleInfo,
  faLocationDot,
  faShield,
} from "@fortawesome/free-solid-svg-icons";

import { readTour } from "../../api/TourApi";

import {
  readRatings,
  createRating,
} from "../../api/ratingApi";

import { readPayments } from "../../api/paymentApi";

import { readUsers } from "../../api/userApi";

import {
  createFavoriteTour,
} from "../../api/favoriteTourApi";

import { getAccountIdFromToken } from "../../utils/jwt";

function formatPrice(price) {
  if (!price) return "Liên hệ";

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

export default function TourDetailPage() {
  const { id } = useParams();

  const [tour, setTour] =
    useState(null);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [ratings, setRatings] =
    useState([]);

  const [currentUser, setCurrentUser] =
    useState(null);

  const [canRate, setCanRate] =
    useState(false);

  const [ratingScore, setRatingScore] =
    useState(5);

  const [ratingComment, setRatingComment] =
    useState("");

  const [ratingLoading, setRatingLoading] =
    useState(false);

  const [favoriteLoading, setFavoriteLoading] =
    useState(false);

  const [isFavorite, setIsFavorite] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const ratingSummary = useMemo(() => {
    if (ratings.length === 0) {
      return {
        average: 0,
        total: 0,
      };
    }

    const totalScore =
      ratings.reduce(
        (sum, rating) =>
          sum +
          Number(
            rating.score || 0
          ),
        0
      );

    return {
      average:
        totalScore / ratings.length,

      total: ratings.length,
    };
  }, [ratings]);

  useEffect(() => {
    const fetchTourDetail =
      async () => {
        try {
          setLoading(true);

          setError("");

          const tourData =
            await readTour(id);

          const tourResult =
            tourData?.result ||
            tourData;

          setTour(tourResult);

          if (
            tourResult?.images
              ?.length > 0
          ) {
            setSelectedImage(
              tourResult.images[0]
            );
          }

          const [
            ratingData,
            paymentData,
            userData,
          ] =
            await Promise.allSettled([
              readRatings(),
              readPayments(),
              readUsers(),
            ]);

          const ratingResult =
            ratingData.status ===
            "fulfilled"
              ? getResult(
                  ratingData.value
                )
              : [];

          const paymentResult =
            paymentData.status ===
            "fulfilled"
              ? getResult(
                  paymentData.value
                )
              : [];

          const userResult =
            userData.status ===
            "fulfilled"
              ? getResult(
                  userData.value
                )
              : [];

          const tourRatings =
            ratingResult.filter(
              (rating) =>
                String(
                  rating.tourId ||
                    rating.tour?.id
                ) === String(id)
            );

          setRatings(tourRatings);

          const token =
            localStorage.getItem(
              "token"
            );

          const accountId =
            getAccountIdFromToken(
              token
            );

          const foundUser =
            userResult.find(
              (user) =>
                String(
                  user.account?.id ||
                    user.accountId
                ) ===
                String(accountId)
            );

          setCurrentUser(
            foundUser || null
          );

          const paidTour =
            paymentResult.some(
              (payment) => {
                const status =
                  String(
                    payment.status ||
                      ""
                  ).toUpperCase();

                const isPaid =
                  status ===
                    "PAID" ||
                  status ===
                    "SUCCESS" ||
                  status ===
                    "COMPLETED";

                const paymentTourId =
                  payment.tourId ||
                  payment.tour?.id ||
                  payment.booking
                    ?.tourId ||
                  payment.booking
                    ?.tour?.id ||
                  payment.booking
                    ?.schedule
                    ?.tourId ||
                  payment.booking
                    ?.schedule
                    ?.tour?.id;

                const paymentUserId =
                  payment.userId ||
                  payment.user?.id ||
                  payment.booking
                    ?.userId ||
                  payment.booking
                    ?.user?.id;

                return (
                  isPaid &&
                  String(
                    paymentTourId
                  ) ===
                    String(id) &&
                  String(
                    paymentUserId
                  ) ===
                    String(
                      foundUser?.id
                    )
                );
              }
            );

          setCanRate(paidTour);
        } catch (error) {
          console.error(
            "Lỗi khi lấy chi tiết tour:",
            error
          );

          setError(
            "Không thể tải chi tiết tour."
          );
        } finally {
          setLoading(false);
        }
      };

    if (id) {
      fetchTourDetail();
    }
  }, [id]);

  const handleAddFavorite =
    async () => {
      try {
        const userId =
          localStorage.getItem(
            "userId"
          );

        if (!userId) {
          alert(
            "Vui lòng đăng nhập."
          );

          return;
        }

        setFavoriteLoading(true);

        await createFavoriteTour({
          userId,
          tourId: id,
        });

        setIsFavorite(true);

      } catch (error) {
        console.error(
          "Lỗi thêm yêu thích:",
          error
        );

        alert(
          "Đã thêm vào danh sách yêu thích rồi."
        );

      } finally {
        setFavoriteLoading(false);
      }
    };

  const handleSubmitRating =
    async (event) => {
      event.preventDefault();

      if (!currentUser) {
        alert(
          "Vui lòng đăng nhập và cập nhật thông tin cá nhân trước khi đánh giá."
        );

        return;
      }

      if (!canRate) {
        alert(
          "Bạn cần thanh toán tour này trước khi đánh giá."
        );

        return;
      }

      try {
        setRatingLoading(true);

        const data =
          await createRating({
            score: Number(
              ratingScore
            ),

            comment:
              ratingComment,

            userId:
              currentUser.id,

            tourId: id,
          });

        const savedRating =
          data?.result || data;

        setRatings((prev) => [
          savedRating,
          ...prev,
        ]);

        setRatingScore(5);

        setRatingComment("");

        alert(
          "Đánh giá tour thành công!"
        );
      } catch (error) {
        console.error(
          "Lỗi khi đánh giá tour:",
          error
        );

        alert(
          "Không thể gửi đánh giá. Vui lòng thử lại."
        );
      } finally {
        setRatingLoading(false);
      }
    };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 pt-24">
        <p className="text-center text-slate-500">
          Đang tải chi tiết tour...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 pt-24">
        <p className="text-center font-semibold text-red-600">
          {error}
        </p>
      </main>
    );
  }

  if (!tour) return null;

  const tourTitle =
    tour.title ||
    "Khám phá vẻ đẹp Việt Nam";

  const tourLocation =
    tour.location ||
    "Việt Nam";

  const tourImage =
    tour.images?.[0] ||
    "https://images.unsplash.com/photo-1557409518-691ebcd96038?auto=format&fit=crop&w=1400&q=80";

  const tourPrice =
    formatPrice(tour.price);

  return (
    <main className="bg-slate-50 px-4 pb-14 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              <MapPinned size={18} />
              Chi tiết tour
            </div>

            <button
              type="button"
              disabled={
                favoriteLoading
              }
              onClick={
                handleAddFavorite
              }
              className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-white text-slate-500 shadow hover:bg-red-50 hover:text-red-500"
              }`}
            >
              <Heart
                size={22}
                fill={
                  isFavorite
                    ? "currentColor"
                    : "none"
                }
              />
            </button>
          </div>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            {tourTitle}
          </h1>

          <p className="mt-4 flex items-center gap-2 text-base font-medium text-blue-500">
            <FontAwesomeIcon
              icon={
                faLocationDot
              }
              style={{
                color:
                  "rgb(116, 192, 252)",
              }}
            />

            {tourLocation}
          </p>
        </div>

        <div className="mb-8">
          <div className="relative h-[360px] overflow-hidden rounded-xl shadow-xl sm:h-[460px] lg:h-[540px]">
            <img
              src={
                selectedImage ||
                tourImage
              }
              alt={tourTitle}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
          </div>

          {tour.images?.length >
            1 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {tour.images.map(
                (
                  image,
                  index
                ) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setSelectedImage(
                        image
                      )
                    }
                    className={`overflow-hidden rounded-lg border-2 transition ${
                      selectedImage ===
                      image
                        ? "border-orange-500"
                        : "border-transparent hover:border-blue-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`tour-${index}`}
                      className="h-24 w-full object-cover"
                    />
                  </button>
                )
              )}
            </div>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-800">
              <FontAwesomeIcon
                icon={
                  faCircleInfo
                }
                style={{
                  color:
                    "rgb(116, 192, 252)",
                }}
              />

              Mô tả chi tiết
            </h2>

            <p className="leading-8 text-slate-600">
              {tour.description ||
                "Tour hiện chưa có mô tả chi tiết."}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Lịch trình rõ ràng",
                "Hỗ trợ tận tâm",
                "Dịch vụ chất lượng",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-md bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  <CheckCircle2
                    size={18}
                    className="text-blue-500"
                  />

                  {item}
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-lg border border-blue-100 bg-white p-5 shadow-xl lg:sticky lg:top-28">
            <div className="border-b border-slate-100 pb-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Giá từ
              </p>

              <div className="mt-2 text-3xl font-extrabold text-orange-500">
                {tourPrice}

                <span className="ml-1 text-sm font-medium text-slate-500">
                  / khách
                </span>
              </div>
            </div>

            <Link
              to={`/booking?tourId=${tour.id}`}
            >
              <button className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-orange-500 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.98]">
                <FontAwesomeIcon
                  icon={faBolt}
                />

                Bắt đầu đặt chỗ
              </button>
            </Link>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs font-medium text-slate-400">
              <FontAwesomeIcon
                icon={
                  faShield
                }
                style={{
                  color:
                    "rgb(116, 192, 252)",
                }}
              />

              Thanh toán an toàn và bảo mật
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}