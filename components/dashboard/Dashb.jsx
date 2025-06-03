
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import EditReview from "../teacher/EditReview";
import LoadingSpinner from "../UI/LoadingSpinner";
import Image from "next/image";
import { Star } from "lucide-react";

const Dashb = () => {
  const [a, setA] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [reviewData, setReviewData] = useState();
  const [teacherNames, setTeacherNames] = useState({});
  const { data: session } = useSession();

  const [reviews, setReviews] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [pendingSchools, setPendingSchools] = useState([]);
  const [confirmedSchools, setConfirmedSchools] = useState([]);

  const [showPendingS, setShowPendingS] = useState(false);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = ""; // Restore scrolling
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!session?.user?.id) return;

    const getData = async (id) => {
      const response = await fetch(`/api/dashboard?id=${id}`);
      const block = await response.json();
      const { data } = block;
      const {
        confSchools,
        pendSchools,
        reviews,
        teachers,
        reviewsNames,
      } = data;

      const total = reviews.reduce(
        (acc, review) =>
          acc + (review.criterion1 + review.criterion2 + review.criterion3) / 3,
        0
      );
      const avg = total / reviews.length;

      setA(avg);
      setReviews(reviews || []);
      setPendingSchools(pendSchools || []);
      setTeacherNames(reviewsNames);
      setConfirmedSchools(confSchools || []);
      setTeachers(teachers || []);
      setLoading(false);
    };

    getData(session?.user?.id);
  }, [session]);

  const toggleEdit = (review) => {
    setOpen(true);
    setReviewData(review);
  };

  if (loading) {
    return <div className="flex w-full justify-center p-20">Kraunama...</div>;
  }

  return (
    <>
      <div className="">
        {open && <EditReview review={reviewData} setOpen={setOpen} />}
      </div>
      <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-center">
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <header className="mb-8 flex justify-between flex-col gap-4">
            <div className="flex flex-wrap gap-3 items-center">
              <p className="rounded-full overflow-hidden w-fit h-fit">
                <Image
                  src={session.user.image}
                  width={56}
                  height={56}
                  alt="profile-pic"
                />
              </p>
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">
                  {session.user.email || session.user.name}
                </h2>
                <p>{session.user.name}</p>
              </div>
            </div>
            <p className="text-gray-600">Jūsų veiklos apžvalga.</p>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-md sm:text-xl sm:font-semibold font-medium">Iš viso įvertinimų</h3>
              {reviews !== false && !reviews && (
                <div className="w-full flex mt-2">
                  <LoadingSpinner></LoadingSpinner>
                </div>
              )}
              <p className="text-4xl font-bold text-primary">
                {Number(reviews?.length)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-md sm:text-xl sm:font-semibold font-medium">Vidutinis įvertinimas</h3>
              {!reviews && reviews !== false && (
                <div className="w-full flex mt-2">
                  <LoadingSpinner></LoadingSpinner>
                </div>
              )}
              <p className="text-4xl font-bold text-primary flex items-center gap-1">{a?.toFixed(2) | 0}
                <Star size={32}/>
              </p>
              
            </div>
          </div>

          {/* My Ratings Section */}
          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {/* Reviews Component */}
            <div className="w-full relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Mano įvertinimai</h3>

                <div className="overflow-x-auto">
                  {reviews !== undefined ? (
                    <div className="overflow-y-auto max-h-[300px]">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                              Mokytojas
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                              Veiksmai
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviews.length === 0 ? (
                            <tr>
                              <td
                                colSpan="2"
                                className="px-4 py-8 text-center text-gray-500"
                              >
                                Nėra patvirtintų įvertinimų
                              </td>
                            </tr>
                          ) : (
                            reviews.map((review, index) => (
                              <tr
                                key={index}
                                className="border-t hover:bg-gray-50"
                              >
                                <td className="px-4 py-3 text-sm">
                                  {teacherNames[`${review.n}-${review.m}`]}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  <button
                                    onClick={() => toggleEdit(review)}
                                    className="text-gray-600 rhover:text-black hover:underline transition-colors"
                                  >
                                    Redaguoti
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="w-full flex justify-center items-center h-32">
                      <LoadingSpinner />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Teachers Component */}
            <div className="w-full relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Pridėti mokytojai</h3>

                <div className="overflow-x-auto">
                  {teachers !== undefined ? (
                    <div className="overflow-y-auto max-h-[300px]">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                              Mokytojas
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                              Data
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {teachers && teachers.length > 0 ? (
                            teachers.map((teacher, index) => (
                              <tr
                                key={index}
                                className="border-t hover:bg-gray-50"
                              >
                                <td className="px-4 py-3 text-sm">
                                  {teacher.name} {teacher.surname}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {teacher.createdAt.split("T")[0]}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="2"
                                className="px-4 py-8 text-center text-gray-500"
                              >
                                Nėra pridėtų mokytojų
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="w-full flex justify-center items-center h-32">
                      <LoadingSpinner />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Schools Component */}
            <div className="w-full relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              {/* Tab navigation */}
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 font-medium text-sm transition-colors ${
                    !showPendingS
                      ? "bg-white text-black border-b-2 border-black"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setShowPendingS(false)}
                >
                  Patvirtinta
                </button>
                <button
                  className={`flex-1 py-3 font-medium text-sm transition-colors ${
                    showPendingS
                      ? "bg-white text-black border-b-2 border-black"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setShowPendingS(true)}
                >
                  Laukia patvirtinimo
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  Pridėtos mokymo įstaigos
                </h3>

                <div className="overflow-x-auto">
                  {confirmedSchools !== undefined && pendingSchools !== undefined ? (
                    <div className="max-h-[300px] overflow-y-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                              Įstaiga
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                              Data
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {showPendingS ? (
                            pendingSchools && pendingSchools.length > 0 ? (
                              pendingSchools.map((school, index) => (
                                <tr
                                  key={index}
                                  className="border-t hover:bg-gray-50"
                                >
                                  <td className="px-4 py-3 text-sm">
                                    {school.name.slice(0, 24)}
                                    {school.name.length >= 24 && " ..."}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                    {school.createdAt.split("T")[0]}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="2"
                                  className="px-4 py-8 text-center text-gray-500"
                                >
                                  Nėra laukiančių patvirtinimo įstaigų
                                </td>
                              </tr>
                            )
                          ) : confirmedSchools && confirmedSchools.length > 0 ? (
                            confirmedSchools.map((school, index) => (
                              <tr
                                key={index}
                                className="border-t hover:bg-gray-50"
                              >
                                <td className="px-4 py-3 text-sm">
                                  {school.name.slice(0, 24)}
                                  {school.name.length >= 24 && " ..."}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                  {school.createdAt.split("T")[0]}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="2"
                                className="px-4 py-8 text-center text-gray-500"
                              >
                                Nėra pridėtų įstaigų
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="w-full flex justify-center items-center h-32">
                      <LoadingSpinner />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          <button
            onClick={() => signOut()}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
          >
            Atsijungti
          </button>
        </main>
      </div>
    </>
  );
};

export default Dashb;