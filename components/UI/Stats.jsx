import School from '@/lib/modals/school'
import Teacher from '@/lib/modals/teacher'
import Review from '@/lib/modals/review'
import User from '@/lib/modals/user'
import connect from '@/lib/mongodb'
const getStats = async () => {
    await connect();
    const schoolsPromise = School.estimatedDocumentCount();
    const teachersPromise = Teacher.estimatedDocumentCount();
    const reviewsPromise = Review.estimatedDocumentCount();
    const userPromise = User.estimatedDocumentCount();
    const [schools, teachers, reviews, users] = await Promise.all([schoolsPromise, teachersPromise, reviewsPromise, userPromise])
    return {
        schools,
        teachers,
        reviews,
        users
    }
}

const Stats = async () => {
    const { schools, teachers, reviews, users } = await getStats();
  
    return (
      <div className="mt-16 bg-white grid grid-cols-2 gap-4 rounded-xl p-6 md:grid-cols-4">
        {[
          { label: "Mokyklų", value: schools, icon: "graduation-cap" },
          { label: "Mokytojų", value: teachers, icon: "teacher" },
          { label: "Atsiliepimų", value: reviews, icon: "review" },
          { label: "Vartotojų", value: users, icon: "user" },
        ].map(({ label, value, icon }, index) => (
          <div key={index}
           className="text-center flex flex-col items-center border p-4 rounded-lg shadow-md">
            <div className=" relative text-2xl font-bold text-primary flex items-center gap-1 flex-col">
              <div 
                className="w-16 h-16 rounded-full bg-primary bg-opacity-30 flex items-center justify-center"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #009dff, #00d2ff)',
                }}
              >
                {icon === "graduation-cap" && (
                  <svg
                  fill={'#000000'}
                  height={40}
                  width={40}
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 487.5 487.5"
                  xmlSpace="preserve"
                >
                  <g>
                    <path d="M437,12.3C437,5.5,431.5,0,424.7,0H126.3C84.4,0,50.4,34.1,50.4,75.9v335.7c0,41.9,34.1,75.9,75.9,75.9h298.5 
                      c6.8,0,12.3-5.5,12.3-12.3V139.6c0-6.8-5.5-12.3-12.3-12.3H126.3c-28.3,0-51.4-23.1-51.4-51.4S98,24.5,126.3,24.5h298.5 
                      C431.5,24.5,437,19,437,12.3z M126.3,151.8h286.2V463H126.3c-28.3,0-51.4-23.1-51.4-51.4V131.7 
                      C88.4,144.2,106.5,151.8,126.3,151.8z"
                    />
                    <path d="M130.5,64.8c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h280.1c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3H130.5z"/>
                    <path d="M178,397.7c6.3,2.4,13.4-0.7,15.8-7.1l17.9-46.8h62.7c0.5,0,0.9-0.1,1.3-0.1l17.9,46.9c1.9,4.9,6.5,7.9,11.4,7.9 
                      c1.5,0,2.9-0.3,4.4-0.8c6.3-2.4,9.5-9.5,7.1-15.8l-54-141.2c-3-7.9-10.4-13-18.8-13c-8.4,0-15.8,5.1-18.8,13l-54,141.2 
                      C168.5,388.2,171.7,395.2,178,397.7z M243.7,260l22.7,59.3h-45.3L243.7,260z"
                    />
                  </g>
                </svg>
                )}
                {icon === "teacher" && (
                  <svg
                  width={50}
                  height={50}
                  viewBox="0 0 245.827 245.827"
                  xmlns="http://www.w3.org/2000/svg"
                  fill={'#000000'}
                >
                  <path d="M223.336,148.384l-0.137-23.527l22.628-12.662L122.576,47.195L0,113.495l49.144,28.216l0.098,16.766l0.01,1.339
                  l0.449-0.215c-0.518,0.703-0.85,1.426-0.84,2.149c0.039,8.246,33.326,14.772,74.41,14.548c41.064-0.215,74.302-7.122,74.273-15.349
                  c0-0.723-0.381-1.426-0.889-2.149l0.449,0.215v-1.339l-0.088-16.834l21.309-13.258l0.117,20.83c-2.345,1.006-3.976,3.312-3.957,6.009
                  c0.02,3.537,2.892,6.399,6.458,6.37c3.586-0.02,6.429-2.912,6.409-6.439C227.332,151.657,225.691,149.371,223.336,148.384z
                  M123.241,170.621c-36.452,0.205-66.017-3.801-66.046-8.91c-0.029-5.11,29.496-9.399,65.949-9.585
                  c36.462-0.205,66.017,3.781,66.037,8.881C189.209,166.098,159.703,170.426,123.241,170.621z M195.335,127.183
                  c-4.934-5.188-22.618-18.886-72.426-18.602c-49.877,0.264-67.336,14.128-72.211,19.394l-0.029-4.963
                  c0,0,14.147-21.524,72.202-21.827c58.025-0.313,72.436,21.045,72.436,21.045L195.335,127.183z M215.755,162.199l-2.511,36.433
                  c7.767-12.203,14.255-7.66,14.255-7.66l-0.156-28.832C218.998,165.414,215.755,162.199,215.755,162.199z" />
                </svg>
                )}
                {icon === "review" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={'#000000'} className="w-12 h-12">
                    <path d="M12 2L15 8H21L16 12L18 18L12 14L6 18L8 12L3 8H9L12 2Z" />
                  </svg>
                )}
                {icon === "user" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={'#000000'} className="w-12 h-12">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" />
                    <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20H4Z" />
                  </svg>
                )}
              </div>
              <p className="text-2xl font-title">{value}+</p>
            </div>
            <p className="text-sm text-gray-500 tracking-wider">{label}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Stats;
  
