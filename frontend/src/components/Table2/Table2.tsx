import React, { useState } from 'react';

interface Column {
    Header: string;
    accessor: string;
    Cell?: (item: any) => JSX.Element | string;
}

interface TableProps {
    columns: Column[];
    data: any[];
    rowsPerPage?: number;
    Component:any;
}

const Table2: React.FC<TableProps> = ({data, Component, rowsPerPage = 9 }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const pageCount = Math.ceil(data.length / rowsPerPage);
    // const pages = Array.from({ length: pageCount }, (_, index) => index);

    const currentData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    const nextPage = () => setCurrentPage((prev) => (prev < pageCount - 1 ? prev + 1 : prev));
    const prevPage = () => setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));

    return (
        <div className="flex bg-white py-[1rem] sm:rounded-lg sm:px-6  overflow-hidden box-shadow  flex-col">
            <div className="w-full  overflow-x-auto">
                <div className=" sm:border  rounded-t-lg align-middle inline-block min-w-full ">
                    <div className=" overflow-hidden p-[1rem]  border-gray-200 ">
                        <div className="min-w-full">
                            <div className="sm:grid-cols-2 grid gap-[1rem]">
                                {currentData.map((user) => (
                                   <div key={user._id}>
                                     <Component  user={user}/>
                                   </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-3 px-[1rem]  flex sm:border-b sm:border-l sm:border-r rounded-b-lg items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                    <button onClick={prevPage} className="relative  inline-flex items-center px-4 py-2 border border-[#D0D5DD]  text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 ">
                        Previous
                    </button>
                    <button onClick={nextPage} className="ml-3 relative  inline-flex items-center px-4 py-2 border border-[#D0D5DD] text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 ">
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                        <nav className="relative gap-[1rem] z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button onClick={prevPage} className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-100">
                                 Previuous
                            </button>
                            <button onClick={nextPage} className="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-100">
                                Next
                            </button>
                        </nav>
                    </div>
                    <div>
                        <p className="text-sm text-gray-700">
                            Page <span className="font-medium">{currentPage * rowsPerPage + 1}</span> to <span className="font-medium">{Math.min((currentPage + 1) * rowsPerPage, data.length)}</span> of <span className="font-medium">{data.length}</span>
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Table2;
