import Link from 'next/link';
const Footer = () => {
  return (
    <footer className="footer relative justify-center p-7 flex bg-black border-t-2 border-gray-100 text-white font-title">
        <div>
            
            <h6 className='text-lg font-medium'>Puslapiai</h6>
            <ul className='gap-y-1 flex flex-col font-thin'>
              <Link href={'/perziureti-mokyklas'}>
                <li className='hover:underline cursor-pointer'>Įvertinimai</li>
              </Link>
              <Link href={'/prideti-mokykla'}>
                <li className='hover:underline cursor-pointer'>Pridėti mokyklą</li>
              </Link>
              <Link href={'/taisykles'}>
                <li className='hover:underline cursor-pointer'>Taisyklės</li>
              </Link>
              <Link href={'/skydelis'}>
                <li className='hover:underline cursor-pointer'>Paskyra</li>
              </Link>
            </ul>
        </div>
        <div>
            <h6 className='text-lg font-medium'>Susisiekti</h6>
            <p>info@manomokyk.la</p>
            <p className='absolute bottom-3 right-6'>manomokykla © {new Date().getFullYear()}</p>
        </div>
    </footer>
  );
};

export default Footer;