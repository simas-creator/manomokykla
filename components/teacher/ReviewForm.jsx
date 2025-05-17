import { useState} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const ReviewForm = ({ teacher_id, open, type}) => {
  const {data: session, status} = useSession()
  const [anonymous, setAnonymous] = useState(false);
  const criteria = [
    "Gebėjimas perteikti žinias",
    "Gebėjimas bendrauti su mokiniais",
    "Dalyko išmanymas",
  ];
  const router = useRouter();
  const pathname = usePathname();
  // Initialize state with passed props
  const [jsonData, setJsonData] = useState({
    teacher_id, user: session?.user.email, rec: true,
    "Gebėjimas perteikti žinias": 1,
    "Gebėjimas bendrauti su mokiniais": 1,
    "Dalyko išmanymas": 1,
     comment: ""});
  const [rec, setRec] = useState(true);

  // Handles rating selection
  const handleRating = (criterion, value) => {
    setJsonData((prev) => ({
      ...prev,
      [criterion]: value,
    }));
  };
  const toggleAnonymous = () => {
    setAnonymous(!anonymous)
    setJsonData((prev) => ({
      ...prev, anonymous: !anonymous
    }))
    console.log(jsonData)
  }
  // Handles recommendation selection
  const handleRec = (value) => {
    setRec(value);
    setJsonData((prev) => ({
      ...prev,
      rec: value,
    }));
  };

  // Handles comment input
  const handleComment = (e) => {
    setJsonData((prev) => ({
      ...prev,
      comment: e.target.value,
    }));
  };

  // Handles form submission
  const handleSubmit = async () => {
    const data = {
      user: session.user.email,
      teacher_id,
      rec: jsonData.rec,
      criterion1: jsonData["Gebėjimas perteikti žinias"],
      criterion2: jsonData["Gebėjimas bendrauti su mokiniais"],
      criterion3: jsonData["Dalyko išmanymas"],
      comment: jsonData.comment.trim() || undefined,
      anonymous: jsonData.anonymous || false
    };
    console.log(data)
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + session.user.accessToken
        },
      });
      
      const responseData = await res.json();
      console.log("Response data:", responseData);
  
      if (!res.ok) {
        throw new Error(responseData.message || "Klaida pateikiant įvertinimą");
      }
      sessionStorage.removeItem(`teacher-${pathname}`)
    } catch (error) {
      console.error("Fetch error:", error);
      alert(error.message || "Serverio klaida");
    } finally {
      router.refresh();
      window.location.reload();
    }
  };
  

  return (
    <div>
      {open && (
        <div className="w-full px-10 mb-8 items-center mx-auto">
          <div className="mx-auto max-w-screen-md mt-4 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h3 className="text-2xl font-semibold mb-8 mt-2 text-center font-title">
              Įvertinkite {type === 'Gimnazija' ? ('mokytoją') : ('dėstytoją')}
            </h3>

            {/* Rating Criteria */}
            <div className="flex flex-col gap-6">
              {criteria.map((criterion) => (
                <div key={criterion} className="flex flex-col gap-2">
                  <p className="font-medium text-gray-700">{criterion}</p>
                  <div className="rating flex gap-1">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        type="radio"
                        name={criterion}
                        className="mask mask-star-2 w-8 h-8 bg-orange-400"
                        onChange={() => handleRating(criterion, index)}
                        defaultChecked={index===1}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendation Section */}
            <div className="mt-6">
              <p className="mb-2 font-medium text-gray-700">Ar rekomenduoji šį {type === 'Gimnazija' ? ('mokytoją') : ('dėstytoją')} kitiems?</p>
              <div className="flex gap-3">
                <div
                  onClick={() => handleRec(true)}
                  className={`text-gray-700 text-sm px-5 py-2 border-2 border-gray-300 hover:bg-primary hover:text-white transition-colors duration-200 w-16 text-center rounded-md cursor-pointer ${
                    rec ? "bg-primary text-white border-primary" : ""
                  }`}
                >
                  Taip
                </div>
                <div
                  onClick={() => handleRec(false)}
                  className={`text-gray-700 text-sm px-5 py-2 border-2 border-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200 w-16 text-center rounded-md cursor-pointer ${
                    !rec ? "bg-red-500 text-white border-red-500" : ""
                  }`}
                >
                  Ne
                </div>
              </div>
            </div>

            {/* Comment Section */}
            <div className="mt-6">
              <p className="mb-2 font-medium text-gray-700">Komentaras <span className="text-gray-500">(neprivaloma)</span></p>
              <textarea
                className="focus:border-primary focus:outline-none w-full min-h-24 border border-gray-300 rounded-md p-3 text-sm transition-shadow resize-none"
                placeholder="Parašykite savo atsiliepimą..."
                value={jsonData.comment}
                onChange={handleComment}
              ></textarea>
            </div>
            {/*anonymous section*/}
            <div className="flex flex-wrap flex-col gap-2 mt-3">
              <p className="font-medium text-gray-700">Slėpti vartotojo vardą</p>
              <button
                className={`rounded-sm w-6 h-6 flex transition-all items-center justify-center border border-black hover:border-primary ${
                  anonymous ? "border-primary" : ""
                }`}
                onClick={toggleAnonymous}
              >
                {anonymous && <img className="transition-all w-4 h-4" src="/images/check.svg" alt="Checked" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="mt-6 w-full border border-primary font-medium text-primary font-title py-3 rounded-md hover:bg-primary hover:text-black transition-colors duration-200"
            >
              Pateikti įvertinimą
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
