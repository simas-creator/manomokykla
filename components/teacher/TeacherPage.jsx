"use client";
import Image from "next/image";
import StarRating from "../UI/StarRating";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReviewForm from "@/components/teacher/ReviewForm";
import ReviewCase from "@/components/teacher/ReviewCase";
import FilterParameter from "../FilterParameter";
import TeacherReport from "@/components/teacher/TeacherReport";
import LoginRegister from "../UI/LoginRegister";
import EditReview from "@/components/teacher/EditReview";
import LoadingSpinner from "../UI/LoadingSpinner";
const getReviewText = (length) => {
  if (length % 10 === 1 && (length < 11 || length > 19)) {
    return `atsiliepimas`; // 1, 21, 31, 41, etc.
  } else if (
    length % 10 >= 2 &&
    length % 10 <= 9 &&
    (length < 11 || length > 19)
  ) {
    return "atsiliepimai"; // 2-9, 22-29, 32-39, etc.
  } else {
    return "atsiliepimų"; // 0, 10-19, 20, 30, 40, etc.
  }
};
const decodeSub = (str) => {
  if (!str) return ""; // Return an empty string or a default value
  const subMap = {
    nuoauksciausioivertinimo: "Nuo aukščiausio įvertinimo",
    nuozemiausioivertinimo: "Nuo žemiausio įvertinimo",
    nuonaujausio: "Nuo naujausio",
    nuoseniausio: "Nuo seniausio",
  };
  return subMap[str] || str;
};
const TeacherPage = ({ teacher }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rec, setRec] = useState(0);
  const [alreadyReviewed, setAlreadyReviewed] = useState(null);
  const [u, setU] = useState("");
  const [loading, setLoading] = useState(true);
  const [school, setSchool] = useState(null);
  const [form, setForm] = useState(false);
  const [report, setReport] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [length, setLength] = useState(0);
  const [edit, setEdit] = useState(false);
  const [individualReview, setIndividualReview] = useState("");
  const searchParams = useSearchParams();
  const parameters1 = [
    "Nuo aukščiausio įvertinimo",
    "Nuo žemiausio įvertinimo",
    "Nuo naujausio",
    "Nuo seniausio",
  ];

  const [active, setActive] = useState(false);
  const [filter1, setFilter1] = useState(
    decodeSub(searchParams.get("ivertinimai"))
  );
  const pathname = usePathname();
  const toggleForm = () => {
    if (status === "loading") {
      return;
    }
    if (status === "unauthenticated") {
      setShowLogin(true);
      return;
    }
    if (alreadyReviewed) {
      return;
    }
    setForm(!form);
  };
  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (session === "unauthenticated") {
      setShowReport(true);
      return;
    }
    const checkUsername = async (email) => {
      const response = await fetch("/api/reviews/username?email=" + email);
      let data;
      if (response.ok) {
        data = await response.json();
      } else return;
      if (data) {
        setU(data);
      }
    };
    checkUsername(session?.user?.email);
  }, [session, teacher]);

  const prevReviewRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const scrollY = window.scrollY || window.pageYOffset;
      try {
        const reviewCheckPromise = session?.user?.email
          ? fetch(
              `/api/reviews/check?user=${session.user.email}&m=${teacher._id}`
            )
          : Promise.resolve({ ok: false });

        const [reviewRes, reviewsRes] = await Promise.all([
          reviewCheckPromise,

          fetch(
            `/api/reviews/view?n=${teacher._id}
            &ivertinimai=${searchParams.get("ivertinimai")}`
          ),
        ]);

        const [reviewData, reviewsData] = await Promise.all([
          reviewRes.ok ? reviewRes.json() : { exists: false },
          reviewsRes.json(),
        ]);
        setLength(reviewsData.length);
        if (reviewRes.ok && reviewData?.data !== prevReviewRef.current) {
          prevReviewRef.current = reviewData?.data;
          setIndividualReview(reviewData?.data);
        }
        if (reviewRes.ok) setAlreadyReviewed(reviewData.exists);
        if (reviewsRes.ok) {
          setReviews(reviewsData);
          const recommendedCount = reviewsData.filter(
            (r) => r.rec === true
          ).length;
          setRec(
            reviewsData.length > 0
              ? (recommendedCount / reviewsData.length) * 100
              : 0
          );
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
        window.scrollTo(0, scrollY);
      }
    };

    fetchData();
  }, [teacher, session, searchParams]);

  const handleBack = () => {
    router.push(`${pathname.slice(0, pathname.lastIndexOf("/"))}`);
  };
  const handleReport = () => {
    if (status === "loading") {
      return;
    }
    if (!session) {
      setShowLogin(true);
      return;
    }
    setReport(true);
  };
  const toggleEdit = () => {
    setEdit(!edit);
  };
  if (report) {
    return (
      <div>
        <div className="px-6 sm:px-10 mt-14 sm:mt-10 pb-8">
          <div className="flex gap-3 md:mb-2 flex-col md:flex-row md:items-center flex-wrap">
            <div className="p-3 rounded-full border-2 overflow-hidden w-20 h-20">
              <img src={teacher?.imageUrl} alt="" />
            </div>
            <div>
              <h1 className="md:text-3xl font-medium font-title text-xl">
                {teacher?.name} {teacher?.surname}
              </h1>
              {length !== 0 && (
                <p className="font-title text-gray-500">
                  <span className="text-primary font-medium">{length}</span>{" "}
                  <span className="text-gray-800">{getReviewText(length)}</span>
                </p>
              )}
              <h3 className="text-gray-500 font-title">{teacher?.subject}</h3>
            </div>
          </div>
          <div>
            <StarRating size="xl" number={"0"} r={teacher?.rating} />
            <div className="text-[15px] flex gap-2 font-title">
              {!loading && reviews.length > 0 && !isNaN(rec) && rec > 0 && (
                <>
                  <p>
                    Rekomenduoja{" "}
                    <span className="text-primary font-medium">
                      {rec.toFixed(0)}%
                    </span>{" "}
                    mokinių
                  </p>
                  <div>
                    <Image
                      width={24}
                      height={24}
                      alt="Thumbs up"
                      src="/images/thumbs-up.svg"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <button
            className="px-4 py-2 border rounded-md mt-2"
            onClick={() => setReport(false)}
          >
            Grįžti atgal
          </button>
        </div>
        <div className="border mt-4"></div>
        <div className="px-6 sm:px-8 mb-8">
          <TeacherReport object={teacher} setReport={setReport} />
        </div>

        <div className="absolute end-0 top-[63px]">
          <div className="border-2 w-28 h-28 md:w-20 md:h-20">
            <img
              className="w-full h-full object-cover"
              src={teacher.school.imgUrl}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <section className="pb-8">
      {showLogin === true && (
        <LoginRegister setLogin={setShowLogin} login={showLogin} />
      )}
      {edit === true && (
        <EditReview setOpen={setEdit} open={edit} review={individualReview} />
      )}
      <button
        onClick={handleBack}
        className="flex fixed top-16 bg-white z-20 h-10 w-32 border p-2 sm:hidden items-center gap-2 text-gray-700 hover:text-black transition-all duration-300  group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300"
        >
          <path
            fillRule="evenodd"
            d="M15.707 4.293a1 1 0 010 1.414L10.414 11H20a1 1 0 110 2h-9.586l5.293 5.293a1 1 0 11-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">Atgal</span>
      </button>
      <main className="w-full px-6 mt-14 sm:mt-10 flex flex-1 sm:px-10">
        <div className="w-full">
          <div className="flex gap-3 flex-col md:flex-row md:items-center flex-wrap md:mb-2">
            <div className="p-3 rounded-full border-2 overflow-hidden w-20 h-20">
              <img src={teacher?.imageUrl} alt="" />
            </div>
            <div>
              <h1 className="md:text-3xl font-medium font-title text-xl">
                {teacher?.name} {teacher?.surname}
              </h1>
              {length !== 0 && (
                <p className="font-title">
                  <span className="text-primary font-medium">{length}</span>{" "}
                  {getReviewText(length)}
                </p>
              )}
              <h3 className="text-gray-500 font-title">{teacher?.subject}</h3>
            </div>
          </div>
          <div className="">
            <StarRating size="xl" number={"0"} r={teacher?.rating} />
            <div className="text-[15px] flex gap-2 font-title">
              {!loading && reviews.length > 0 && !isNaN(rec) && rec > 0 && (
                <>
                  <p>
                    Rekomenduoja{" "}
                    <span className="text-primary font-medium">
                      {rec.toFixed(0)}%{" "}
                    </span>
                    mokinių
                  </p>
                  <div>
                    <Image
                      width={24}
                      height={24}
                      alt="Thumbs up"
                      src="/images/thumbs-up.svg"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex w-full items-end justify-between">
              {loading ? (
                <button className="mt-2 px-4 py-2 border rounded-md border-primary text-primary">
                  Kraunama...
                </button>
              ) : form === true ? (
                <button
                  onClick={() => setForm(false)}
                  className="px-4 py-2 border rounded-md my-2"
                >
                  Grįžti atgal
                </button>
              ) : alreadyReviewed !== null ? (
                <div className="flex flex-col items-start gap-2">
                  <button
                    className={`px-4 py-2 border mt-2 rounded-md  ${
                      alreadyReviewed
                        ? "text-gray-600 border-gray-400"
                        : "text-primary border-primary"
                    } `}
                    onClick={() => toggleForm()}
                    disabled={alreadyReviewed}
                  >
                    {alreadyReviewed ? "Jūs jau įvertinote" : "Įvertinti"}
                  </button>
                  {alreadyReviewed && (
                    <button
                      onClick={toggleEdit}
                      className="border-primary border text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white"
                    >
                      Redaguoti įvertinimą
                    </button>
                  )}
                </div>
              ) : !session ? (
                <button
                  onClick={() => toggleForm()}
                  className="px-4 py-2 border mt-2 rounded-md border-primary text-primary"
                >
                  Įvertinti
                </button>
              ) : (
                <button className="mt-2 px-4 py-2 border rounded-md border-primary text-primary">
                  Kraunama...
                </button>
              )}

              <button
                onClick={() => handleReport()}
                className=" flex text-sm items-center gap-2 border px-2 py-1 border-red-400 text-red-400 rounded-md hover:bg-red-400 hover:text-white transition-colors"
              >
                Pranešti
                <img
                  src="/images/flag-country-svgrepo-com.svg"
                  className="w-6 h-6"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-20 md:right-24 top-[95px] text-sm hidden md:block">
          {teacher.school.name}
        </div>
        <div className="absolute end-0 top-[63px]">
          <div className="border-2 w-28 h-28 md:w-20 md:h-20">
            <img
              className="w-full h-full object-cover"
              src={teacher.school.imgUrl}
              alt=""
            />
          </div>
        </div>
      </main>
      <div className={`relative border mt-4 ${form ? "" : "mb-6"}`}></div>
      {!form && (
        <div className=" px-6 sm:px-10 mb-10">
          <FilterParameter
            parameters={parameters1}
            filter={filter1}
            setFilter={setFilter1}
            type={"Įvertinimai"}
            active={active}
            setActive={setActive}
          />
        </div>
      )}
      {!loading && !form && reviews.length === 0 && (
        <p className="px-6 sm:px-10">Įvertinimų nėra.</p>
      )}
      <div className={`${loading ? "" : "hidden"}`}>
        <LoadingSpinner />
      </div>

      <div className="mb-8 px-6 w-full gap-x-4 grid gap-y-6 grid-flow-row bsm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center ">
        {!form &&
          status !== "loading" &&
          reviews.map((r, index) => (
            <ReviewCase key={index} review={r}></ReviewCase>
          ))}
      </div>
      {form && (
        <ReviewForm
          teacher_id={teacher._id}
          user={u}
          open={form}
          type={teacher.school.type}
        />
      )}
    </section>
  );
};

export default TeacherPage;
