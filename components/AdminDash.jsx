import Link from 'next/link';
const Dashb = ({admin, setAdmin}) => {

  return (
      <>
      <section className=' h-[100vh] flex relative'>
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

        <Link className='font-title text-center pt-44 w-1/2 bg-black text-3xl font-bold text-white' href={`/skydelis/laukia-patvirtinimo`}>Laukia patvirtinimo</Link>


        <Link className='font-title text-center pt-44 w-1/2 bg-primary text-3xl font-bold text-white' href={`/skydelis/pranesimai`}>Pranešimai</Link>

      </section>
      </>
    )


  
};

export default Dashb;
