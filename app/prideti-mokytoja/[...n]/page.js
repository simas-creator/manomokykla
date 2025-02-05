import StarRating from "@/components/StarRating";
async function getSchool(n) {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/schools/${n}`)
    const data = res.json();
    return data;
}
export default async function Page({params}) {
    const n = (await params).n;
    const data = await getSchool(n);
    const School = data;
    console.log(data)
    return (
        <main className='px-10 mt-10 w-auto'>

            <div className="flex gap-5 items-center flex-wrap">
              <div>
                <img 
                src={School.imgUrl}
                className="h-20 w-20 rounded-lg object-cover border-2 "
                />
              </div>
              <div className="flex flex-col">
                <h1 className='font-title text-xl md:text-3xl'>{School.name}</h1>
                <div className="flex gap-2 mt-2">
                  <StarRating r={School.rating} size="xl" />
                </div>
                
              </div>
              
            </div>
            
            
            <div className='divider'></div>
            
            
        </main>
    )
}