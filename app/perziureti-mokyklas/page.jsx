'use client'
import FilterSchools from '@/components/FilterSchools'
import SchoolCase from '@/components/SchoolCase'
const Page = () => {
    return (
        <div>
            <FilterSchools />
            <div className="grid justify-center grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                <SchoolCase/>
                <SchoolCase/>
            </div>
        </div>
    );
}
export default Page;