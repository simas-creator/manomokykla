import School from "@/lib/modals/school";
import Teacher from "@/lib/modals/teacher";
import Review from "@/lib/modals/review";
import User from "@/lib/modals/user";
import {
  School as SchoolLogo,
  Star,
  User as UserLogo,
  Book,
} from "lucide-react";
import connect from "@/lib/mongodb";
const getStats = async () => {
  await connect();
  const schoolsPromise = School.estimatedDocumentCount();
  const teachersPromise = Teacher.estimatedDocumentCount();
  const reviewsPromise = Review.estimatedDocumentCount();
  const userPromise = User.estimatedDocumentCount();
  const [schools, teachers, reviews, users] = await Promise.all([
    schoolsPromise,
    teachersPromise,
    reviewsPromise,
    userPromise,
  ]);
  return {
    schools,
    teachers,
    reviews,
    users,
  };
};

const Stats = async () => {
  const { schools, teachers, reviews, users } = await getStats();
  const iconStyle = {
    size: 30,
    color: "#009dff",
  };
  const stats = [
    { label: "Mokyklų", value: schools, icon: <SchoolLogo {...iconStyle} /> },
    { label: "Mokytojų", value: teachers, icon: <Book {...iconStyle} /> },
    { label: "Atsiliepimų", value: reviews, icon: <Star {...iconStyle} /> },
    { label: "Vartotojų", value: users, icon: <UserLogo {...iconStyle} /> },
  ];
  return (
    <div
      className="mt-16 bg-primary border-2 border-primary bg-opacity-10 grid grid-cols-2 gap-4 p-6 md:grid-cols-4 "
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #000 40%, #009dff 100%)",
      }}
    >
      {stats.map(({ label, value, icon }, index) => (
        <div
          key={index}
          className="text-center flex flex-col items-center p-4 rounded-lg hover:shadow-xl"
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
