import School from '@/lib/modals/school'
import Teacher from '@/lib/modals/teacher'
import Review from '@/lib/modals/review'
import User from '@/lib/modals/user'
const getStats = async () => {
    const schoolsPromise = School.countDocuments();
    const teachersPromise = Teacher.countDocuments();
    const reviewsPromise = Review.countDocuments();
    const userPromise = User.countDocuments();
    const [schools, teachers, reviews, users] = await Promise.all([schoolsPromise, teachersPromise, reviewsPromise, userPromise])
    return {
        schools,
        teachers,
        reviews,
        users
    }
}
const Stats = async () => {
const {schools, teachers, reviews, users} = await getStats();

  return (
    <div>
        <div className="mt-16 border grid grid-cols-2 gap-4 rounded-xl bg-white p-6 shadow-md md:grid-cols-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{schools}+</p>
            <p className="text-sm text-gray-600">Mokyklų</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{teachers}+</p>
            <p className="text-sm text-gray-600">Mokytojų</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{reviews}+</p>
            <p className="text-sm text-gray-600">Atsiliepimų</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{users}+</p>
            <p className="text-sm text-gray-600">Vartotojų</p>
          </div>
        </div>
    </div>
  )
}

export default Stats