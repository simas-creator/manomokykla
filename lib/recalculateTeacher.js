import Teacher from "@/lib/modals/teacher"
import School from "@/lib/modals/school"
import Review from "@/lib/modals/review"
import { revalidateTag } from "next/cache";
export default async function recalculateTeacher(teacher_id) {
    ///updating teacher rating
    const allReviews = await Review.find({ teacher_id });
    const total = allReviews.reduce((acc, review) => {
      const { criterion1: c1, criterion2: c2, criterion3: c3 } = review;
      return acc + (c1 + c2 + c3) / 3;
    }, 0);
    const rating = Number((total / allReviews.length).toFixed(2));
    let teacher;
    if(rating) {
      teacher = await Teacher.findOneAndUpdate({ _id: teacher_id }, {rating: rating}, {new: true});
    } else {
      teacher = await Teacher.findOneAndUpdate({_id: teacher_id}, {rating: 0}, {new: true})
    }

    ///updating schools rating
    const allTeachers = await Teacher.find({ school_id: teacher.school_id, rating: { $gte: 1} });
    const schoolTotal = allTeachers.reduce((acc, teacher) => {
      return acc += teacher.rating;
    }, 0);
    let schoolRating = (schoolTotal / allTeachers.length).toFixed(2);
    if(isNaN(schoolRating)) {
      schoolRating = 0;
    }
    const school = await School.findOneAndUpdate({ _id: teacher.school_id }, {
      rating: schoolRating
    });
    revalidateTag(`teacher-${teacher.url}`);
    revalidateTag(`school-${school.url}`);
}