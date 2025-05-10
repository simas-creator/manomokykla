import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
const EditReview = ({ setOpen, open, review, admin }) => {
  const { criterion1, criterion2, criterion3, comment, n, m, r, anonymous: isAnonymous } = review;
  const [anonymous, setAnonymous] = useState(isAnonymous)
  const [criteria, setCriteria] = useState([
    criterion1,
    criterion2,
    criterion3,
  ]);
  const [jsonData, setJsonData] = useState({
    criteria: [criterion1, criterion2, criterion3],
    comment,
    rec: review.rec,
    anonymous: isAnonymous
  });
  const [loading, setLoading] = useState(false);
  const [changes, setChanges] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [rec, setRec] = useState(review.rec);
  const handleRating = (i, index) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index] = i;
    setCriteria(updatedCriteria);
    setJsonData((prev) => ({ ...prev, criteria: updatedCriteria }));
    setChanges(true);
  };
  const toggleAnonymous = () => {
    if(anonymous === isAnonymous) {
      setChanges({anonymous}) 
    } 
    setAnonymous(!anonymous)
    setJsonData((prev) => ({
      ...prev, anonymous: !anonymous
    }))
    console.log(jsonData)
  }
  const handleChange = (e) => {
    const value = e.target.value;
    setJsonData((prev) => ({ ...prev, comment: value }));
    setChanges(
      value !== comment ||
        JSON.stringify(criteria) !==
          JSON.stringify([criterion1, criterion2, criterion3])
    );
  };

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0"));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    }

    return () => {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0"));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);
  const handleRec = (value) => {
    if (value === rec) {
      setChanges(false);
    } else setChanges(true);
    setRec(value);
    setJsonData((prev) => ({
      ...prev,
      rec: value,
    }));
    console.log(jsonData);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!changes && !admin) {
      setError("Nieko nepakeitei!");
      setLoading(false);
      return;
    } else setError("");

    if (admin) {
      const res = await fetch(`/api/reviews/status?s=ok&n=${n}&m=${m}&r=${r}`, {
        method: "PATCH",
      });
    } else
      try {
        const response = await fetch(`/api/reviews/edit?id=${review._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
          throw new Error("Klaida išsaugant duomenis");
        }
      } catch (error) {
        console.log("Error updating review:", error);
        setError("Nepavyko išsaugoti. Bandykite dar kartą.");
      } finally {
        if (admin) {
          setOpen(false);
          return;
        }
        setLoading(false);
        window.location.reload();
      }
    setOpen(false);
  };
  const deleteReview = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/reviews/delete?id=${review._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setDeleting(false);
        setError("Įvyko klaida");
        return;
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setDeleting(false);
      setOpen(false);
      if (!admin) {
        window.location.reload();
      }
    }
  };
  return (
    <div className="fixed inset-0 z-30 flex justify-center items-center backdrop-blur-sm">
      <div className="w-[90%] bsm:w-[80%] rounded-md sm:max-w-lg h-fit overflow-hidden  bg-white border shadow-xl relative p-8">
        {deleting && (
          <div className=" gap-4 justify-center text-3xl font-bold flex items-center absolute inset-0 w-auto p-6 z-20 backdrop-blur-xl h-full">
            Trinama...
            <LoadingSpinner></LoadingSpinner>
          </div>
        )}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h3 className="text-2xl font-title text-center mb-6 font-bold">
          {admin === true ? "Mokinio įvertinimas" : "Mano įvertinimas"}
        </h3>
        <form onSubmit={submitForm} className="flex flex-col">
          <div>
            <div className="flex flex-col gap-6">
              {criteria.map((criterion, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <p className="font-medium text-gray-700">
                    {index === 0
                      ? "Gebėjimas perteikti žinias"
                      : index === 1
                      ? "Gebėjimas bendrauti su mokiniais"
                      : "Dalyko išmanymas"}
                  </p>
                  <div className="rating flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <input
                        key={i}
                        type="radio"
                        name={`rating-${index}`}
                        className="mask mask-star-2 w-8 h-8 bg-orange-400"
                        onChange={() => handleRating(i, index)}
                        checked={criteria[index] === i}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <span className="mt-4 text-gray-700 font-medium">Komentaras</span>
          <textarea
            defaultValue={comment}
            onChange={handleChange}
            className="text-sm rounded-md resize-none border border-gray-700 pt-2 px-4 outline-none h-28"
          ></textarea>
          <div className="mt-3">
            <p className="mb-2 font-medium text-gray-700">
              {admin === true
                ? "Rekomendacija"
                : "Ar rekomenduoji šį mokytoją kitiems?"}
            </p>
            <div className="flex gap-3">
              <div
                onClick={() => handleRec(false)}
                className={`text-gray-700 text-sm px-5 py-2 border-2 border-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200 w-16 text-center rounded-md cursor-pointer ${
                  !rec ? "bg-red-500 text-white border-red-500" : ""
                }`}
              >
                Ne
              </div>
              <div
                onClick={() => handleRec(true)}
                className={`text-gray-700 text-sm px-5 py-2 border-2 border-gray-300 hover:bg-primary hover:text-white transition-colors duration-200 w-16 text-center rounded-md cursor-pointer ${
                  rec ? "bg-primary text-white border-primary" : ""
                }`}
              >
                Taip
              </div>
            </div>
          </div>
          <div className="flex flex-wrap flex-col gap-2 mt-3">
              <p className="font-medium text-gray-700">Slėpti vartotojo vardą</p>
              <button
                type="button"
                className={`rounded-sm w-6 h-6 flex transition-all items-center justify-center border border-black hover:border-primary ${
                  anonymous ? "border-primary" : ""
                }`}
                onClick={toggleAnonymous}
              >
                {anonymous && <img className="transition-all w-4 h-4" src="/images/check.svg" alt="Checked" />}
              </button>
            </div>
          <div className="flex justify-between pt-4">
            <button
              type="delete"
              onClick={() => deleteReview()}
              className="px-4 py-2 border-red-400 border rounded-md text-red-400 hover:text-white hover:bg-red-400"
            >
              Pašalinti
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white"
            >
              {loading
                ? "Kraunama..."
                : admin === true
                ? "Patvirtinti"
                : "Išsaugoti"}
            </button>
          </div>

          {error && <p className="text-red-400">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditReview;
