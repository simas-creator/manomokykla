import Image from "next/image"
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReviewForm from "@/components/ReviewForm"
import ReviewCase from "@/components/ReviewCase"
import FilterParameter from "./FilterParameter";
const TeacherPage = ({ teacher }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [alreadyReviewed, setAlreadyReviewed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [school, setSchool] = useState(null);
  const [schoolImage, setSchoolImage] = useState(null);
  const [form, setForm] = useState(false);
  const [reviews, setReviews] = useState([])
  const parameters1 = [
    'Nuo aukščiausio įvertinimo',
    'Nuo žemiausio įvertinimo',
  ]
  const parameters2 = [
    'Nuo naujausio',
    'Nuo seniausio',
  ]
  const [active, setActive] = useState(false);
  const [filter1, setFilter1] = useState(null);
  const [filter2, setFilter2] = useState(null);
  useEffect(() => {
    if (!teacher?.n || !teacher?.m || !session?.user?.email) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
  
      try {
        const [reviewRes, schoolRes, reviewsRes] = await Promise.all([
          fetch(`/api/reviews/check?user=${session.user.email}&n=${teacher.n}&m=${teacher.m}`),
          fetch(`/api/schools/byn?n=${teacher.n}`),
          fetch(`/api/reviews/view?n=${teacher.n}&m=${teacher.m}`)
        ]);
  
        const [reviewData, schoolData, reviewsData] = await Promise.all([
          reviewRes.json(),
          schoolRes.json(),
          reviewsRes.json()
        ]);
  
        if (reviewRes.ok) setAlreadyReviewed(reviewData.exists);
        if (schoolRes.ok) {
          setSchool(schoolData.data);
          setSchoolImage(schoolData.image);
        }
        if (reviewsRes.ok) setReviews(reviewsData);
      } catch (error) {
        console.log("Error fetching data:", error);

      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [teacher, session]);
  const toggleForm = () => {
    if(!session) {
      router.push('/prisijungti')
      return
    }
    if(!form) {
      setForm(true);
    }
  }
  return (
    <section className="">
      <main className="w-full px-6 mt-10 flex flex-1 sm:px-10">
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
            <StarRating size="xl" number={"0"} r={teacher?.rating} />
            <div className="text-[15px] flex gap-2 font-title">

            {!loading && teacher?.rec !== 0 && typeof teacher?.rec === 'number' && (
              <>
                <p>
                  {`Rekomenduoja ${teacher?.rec} ${
                    teacher?.rec % 10 === 1 && !(teacher?.rec >= 11 && teacher?.rec <= 19) ? "žmogus" : teacher?.rec % 10 === 0 || (teacher?.rec >= 11 && teacher?.rec <= 19) ? 
                    "žmonių" : "žmonės"
                  }`}
                </p>
                <div>
                  <Image width={24} height={24} alt="Thumbs up" src="/images/thumbs-up.svg" />
                </div>
              </>
            )}         
              
            </div>
            {loading ? (
              <button className="mt-2 px-4 py-2 border rounded-md border-primary text-primary">
                Kraunama...
              </button>
            ) : form===true ? (
              <button onClick={() => setForm(false)} className="px-4 py-2 border rounded-md my-2">Grįžti atgal</button>
            ) : alreadyReviewed !== null ? (
              <button
                className="px-4 py-2 border mt-2 rounded-md border-primary text-primary"
                onClick={() => toggleForm()}
                disabled={alreadyReviewed} 
              >
                {alreadyReviewed ? "Jūs jau įvertinote" : "Įvertinti"}
              </button>
            ) : !session ? (
              <button onClick={() => toggleForm()} className="px-4 py-2 border mt-2 rounded-md border-primary text-primary">Įvertinti</button>
            ) : (
              <button className="mt-2 px-4 py-2 border rounded-md border-primary text-primary">
                Kraunama...
              </button>
            )}

            
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
      <div className={`border px-10 w-auto mx-6 sm:mx-10 mt-4 ${form ? '': 'mb-6'}`}></div>
      {!form && 
      <div className="w-full flex flex-wrap gap-y-2 gap-x-10 mx-6 sm:mx-10 mb-10">
        <FilterParameter parameters={parameters1} filter={filter1} setFilter={setFilter1} type={'Įvertinimai'} active={active} setActive={setActive} />
        <FilterParameter parameters={parameters2} filter={filter2} setFilter={setFilter2} type={'Laikas'}  active={active} setActive={setActive}/>
      </div>}
      
      <div className="mb-8 grid gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center grid-flow-row">
        {reviews.length > 0 && !form ? (
          reviews.map((r, index) => 
          <ReviewCase key={index} review={r}></ReviewCase>)
        ) : loading ? ('') : reviews.length > 0 ? ('') : reviews.length > 0  || form ? ('') : (<div className="w-full ml-20">Įvertinimų nėra.</div>)}
      </div>
      {form && <ReviewForm n={teacher?.n} m={teacher?.m} user={session?.user?.email} open={form} />}
    </section>
  );
};

export default TeacherPage;
