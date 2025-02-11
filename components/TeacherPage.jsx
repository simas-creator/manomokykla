import Image from "next/image"
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReviewForm from "@/components/ReviewForm"

const TeacherPage = ({ teacher }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [school, setSchool] = useState(null);
  const [schoolImage, setSchoolImage] = useState(null);
  const [form, setForm] = useState(false);

  useEffect(() => {
    if (!session?.user?.email || !teacher?.n || !teacher?.m) return;

    const checkReview = async () => {
      try {
        const res = await fetch(
          `/api/reviews/check?user=${session.user.email}&n=${teacher.n}&m=${teacher.m}`
        );
        const data = await res.json();

        if (res.ok && data.exists) {
          setAlreadyReviewed(true);
        } else {
          setAlreadyReviewed(false);
        }
      } catch (error) {
        console.error("Error checking review:", error);
      } finally {
        setLoading(false);
      }
    };

    checkReview();
  }, [session, teacher]); // Run when session or teacher changes

  const toggleForm = () => {
    if (!session) {
      router.push('/prisijungti');
      return;
    }
    if (alreadyReviewed) {
      return;
    }
    setForm(!form);
  };

  useEffect(() => {
    if (!teacher?.n) return;
    const fetchSchool = async () => {
      const res = await fetch(`/api/schools/byn?n=${teacher?.n}`, { next: { revalidate: 3000 } });

      if (!res.ok) {
        console.log("Fetch failed with status:", res.status);
        return;
      }

      const object = await res.json();

      try {
        const { data, image } = object;
        setSchool(data);
        setSchoolImage(image);
      } catch (error) {
        console.log("Failed to parse JSON:", error);
      }
    };
    fetchSchool();
  }, [teacher]);

  return (
    <section className="">
      <main className="w-full px-10 mt-10 flex flex-1">
        <div>
          <div className="flex gap-3 flex-col md:flex-row md:items-center flex-wrap">
            <div className="p-3 rounded-full border-2 overflow-hidden w-20 h-20">
              <img src={teacher?.imageUrl} alt="" />
            </div>
            <div>
              <h1 className="md:text-3xl font-medium font-title text-xl">
                {teacher?.name} {teacher?.surname}
              </h1>
              <h3 className="text-gray-500 font-title">{teacher?.subject}</h3>
            </div>
          </div>
          <div>
            <StarRating size="xl" number={"0"} />
            <div className="text-[15px] flex gap-2 font-title">
              Rekomenduoja ... žmonių
              <div>
                <Image width={24} height={24} alt={``} src={`/images/thumbs-up.svg`} />
              </div>
            </div>
            {loading ? (<button className=" mt-2 px-4 py-2 border rounded-md border-primary text-primary">Kraunama...</button>): (form ? (
                  <button onClick={() => toggleForm()} className="px-4 py-2 border border-gray-300 rounded-md text-gray-500">
                    Grįžti atgal
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 border mt-2 rounded-md border-primary text-primary"
                    onClick={() => toggleForm()}
                    disabled={alreadyReviewed} // Prevent clicking if already reviewed
                  >
                    {alreadyReviewed ? "Jūs jau įvertinote" : "Įvertinti"}
                  </button>
                ))}
            
          </div>
        </div>
        <div className="absolute right-20 md:right-24 top-[95px] text-sm hidden md:block">
          {school}
        </div>
        {schoolImage && (
          <div className="absolute end-0 top-[63px]">
            <div className="border-2 w-20 h-20">
              <img className="w-full h-full object-cover" src={schoolImage} alt="" />
            </div>
          </div>
        )}
      </main>
      <div className="border px-10 w-auto mx-10 mt-4"></div>
      {form && <ReviewForm n={teacher?.n} m={teacher?.m} user={session?.user?.email} open={form} />}
    </section>
  );
};

export default TeacherPage;
