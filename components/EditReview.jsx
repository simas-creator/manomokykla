import { useEffect, useState } from "react";

const EditReview = ({ setOpen, open, review }) => {
    const { criterion1, criterion2, criterion3, comment, n, m, r } = review;
    const [criteria, setCriteria] = useState([criterion1, criterion2, criterion3]);
    const [jsonData, setJsonData] = useState({ criteria: [criterion1, criterion2, criterion3], comment });
    const [loading, setLoading] = useState(false);
    const [changes, setChanges] = useState(false);
    const [error, setError] = useState("");


    const handleRating = (i, index) => {
        const updatedCriteria = [...criteria];
        updatedCriteria[index] = i;
        setCriteria(updatedCriteria);
        setJsonData((prev) => ({ ...prev, criteria: updatedCriteria }));
        setChanges(true);
    };


    const handleChange = (e) => {
        const value = e.target.value;
        setJsonData((prev) => ({ ...prev, comment: value }));
        setChanges(value !== comment || JSON.stringify(criteria) !== JSON.stringify([criterion1, criterion2, criterion3]));
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


    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!changes) {
            setError("Nieko nepakeitei:D");
            setLoading(false);
            return;
        } else setError("");

        try {
            const response = await fetch(`/api/reviews/edit?n=${n}&m=${m}&r=${r}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData),
            });

            if (!response.ok) {
                throw new Error("Klaida išsaugant duomenis");
            }

            window.location.reload();
        } catch (error) {
            console.error("Error updating review:", error);
            setError("Nepavyko išsaugoti. Bandykite dar kartą.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-20 flex justify-center items-center backdrop-blur-sm">
            <div className="w-[80%] rounded-md sm:max-w-lg h-fit bg-white border shadow-xl relative p-8">
                <button 
                    onClick={() => setOpen(false)} 
                    className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-800"
                >
                    ✖
                </button>
                <h3 className="text-2xl font-title text-center mb-6 font-bold">Redaguoti įvertinimą</h3>
                <form onSubmit={submitForm} className="flex flex-col">
                    <div>
                        <div className="flex flex-col gap-6">
                            {criteria.map((criterion, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <p className="font-medium text-gray-700">
                                        {index === 0 ? "Gebėjimas perteikti žinias" :
                                         index === 1 ? "Gebėjimas bendrauti su mokiniais" :
                                         "Dalyko išmanymas"}
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
                        className="text-sm rounded-md resize-none border-primary border pt-2 px-4 outline-none h-fit max-h-32"
                    ></textarea>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white"
                        >
                            {loading ? "Kraunama..." : "Išsaugoti"}
                        </button>
                    </div>
                    {error && <p className="text-red-400">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default EditReview;
