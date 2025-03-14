import Link from 'next/link'
const Card = ({type}) => {
  return (
    <Link href={type === 'view' ? '/perziureti-mokyklas' : '/prideti-mokykla'}>
    <div className="sm:w-[350px] w-[300px] h-full">
      <div className={`group lg:h-80 relative cursor-pointer overflow-hidden ${type === 'view' ? 'bg-gray-100' : 'bg-blue-100'} px-6 pt-10 pb-8 shadow-xl ring-1 ${type === 'view' ? 'ring-gray-900/10' : 'ring-primary/10'} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg`}>
        {/* Background circle with distinct colors for each type */}
        <span className={`absolute top-10 z-0 h-24 w-24 rounded-full ${type === 'view' ? 'bg-black' : 'bg-primary'} transition-all duration-300 md:group-hover:scale-[10]`}></span>
        
        <div className="relative z-10 mx-auto w-full">
        {type === 'view' ? (
              <span className="grid h-24 w-24 place-items-center rounded-full bg-black transition-all duration-300 group-hover:bg-opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
                className="h-10 w-10 text-white transition-all md:group-hover:scale-[3] md:group-hover:translate-x-20"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </span>
            ) : (
              <span className="grid h-24 w-24 place-items-center rounded-full bg-primary transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-10 w-10 text-white transition-all md:group-hover:scale-[3] md:group-hover:translate-x-20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </span>
            )}
            
          <div className="pt-5 lg:pt-10 font-semibold leading-7 text-xl ">
            <p className={`${type === 'view' ? 'text-black' : 'text-primary'} md:text-3xl transition-all duration-300 md:group-hover:text-white lg:text-lg flex items-center justify-between`}>
              <span className='lg:text-2xl'>{type === 'view' ? 'Peržiūrėti įvertinimus' : 'Pridėti mokyklą'}</span>
              <span className="transform transition-all duration-300 group-hover:translate-x-1">&rarr;</span>
            </p>
            
          </div>
        </div>
        

      </div>
    </div>
  </Link>
  )
}
function Hero() {
  return (
    <section className='flex w-full container justify-center items-center lg:my-40 max-lg:my-20 lg:gap-20 md:gap-10 max-md:gap-5 max-sm:flex-col m-auto'> 
    <Card type={'view'}/>
    <Card type={'rate'}/>
    </section>
  );
}

export default Hero;