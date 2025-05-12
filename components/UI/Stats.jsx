import School from "@/lib/modals/school";
import Teacher from "@/lib/modals/teacher";
import Review from "@/lib/modals/review";
import {
  School as SchoolLogo,
  Star,
  Book,
} from "lucide-react";
import connect from "@/lib/mongodb";
const getStats = async () => {
  await connect();
  const schoolsPromise = School.estimatedDocumentCount();
  const teachersPromise = Teacher.estimatedDocumentCount();
  const reviewsPromise = Review.estimatedDocumentCount();
  const [schools, teachers, reviews] = await Promise.all([
    schoolsPromise,
    teachersPromise,
    reviewsPromise,
  ]);
  return {
    schools,
    teachers,
    reviews,
  };
};

const Stats = async () => {
  const { schools, teachers, reviews} = await getStats();
  const iconStyle = {
    size: 30,
    color: "#009dff",
  };
  const stats = [
    { label: "Mokyklų", value: schools, icon: <SchoolLogo {...iconStyle} /> },
    { label: "Mokytojų", value: teachers, icon: <Book {...iconStyle} /> },
    { label: "Atsiliepimų", value: reviews, icon: <Star {...iconStyle} /> },
  ];
  return (
    <div
      className="mt-16 bg-primary border-b-2 border-primary bg-opacity-10 grid grid-cols-1 gap-4 p-6 sm:grid-cols-3 "
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #000 40%, #009dff 100%)",
      }}
    >
      {stats.map(({ label, value, icon }, index) => (
        <div
          key={index}
          className="text-center flex flex-col items-center p-4 rounded-lg"
        >
          <div className=" relative text-2xl font-bold text-primary flex items-center gap-1 flex-col">
            <div className="w-20 h-20 border-2 border-primary rounded-full bg-black flex items-center justify-center">
              {icon}
            </div>
            <p className="text-3xl font-title text-white">{value}+</p>
          </div>
          <p className="text-sm text-gray-500 tracking-wider uppercase">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
