import Link from 'next/link';
const Dashb = ({admin, setAdmin}) => {

  return (
      <>
      <section className='md:h-[100vh] flex relative flex-col md:flex-row'>
      <div className='absolute top-4 left-4 md:top-8 md:left-8'>
        <div>
            <button className={`${admin === true ? 'bg-white text-black px-2 py-1' : 'bg-black text-gray-300 px-2 py-2 rounded-md'}`} onClick={() => setAdmin(false)}>
              Mokinys
            </button>
            <button className={`${admin === true ? 'bg-primary border border-white text-white px-2 py-2 rounded-md' : 'bg-white px-2 py-1'}`} onClick={() => setAdmin(true)}>
              Admin
            </button>
        </div>
      </div>

        <Link className='text-2xl pb-16 pt-20 font-title text-center md:pt-44 md:w-1/2 bg-black md:text-3xl font-bold text-white' href={`/skydelis/laukia-patvirtinimo`}>Laukia patvirtinimo
        <div className='w-full flex justify-center mt-8'>
          <img width={window.innerWidth > 600 ? 200 : 100} src="/images/clock.svg" alt="" />
        </div>
        </Link>
        

        <Link className='text-2xl pb-16 pt-20 font-title text-center md:pt-44 md:w-1/2 bg-primary md:text-3xl font-bold text-white' href={`/skydelis/pranesimai`}>Pranešimai
          <div className='w-full flex justify-center'>
            <img className='mt-8' width={window.innerWidth > 600 ? 200 : 100} src="/images/flag-country-svgrepo-com.svg" alt="" />
          </div>
        </Link>

      </section>
      </>
    )


  
};

export default Dashb;
