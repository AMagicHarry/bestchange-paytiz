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
    RowComponent:any;
}

const Table: React.FC<TableProps> = ({ columns, data,RowComponent, rowsPerPage = 5 }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const pageCount = Math.ceil(data.length / rowsPerPage);
    // const pages = Array.from({ length: pageCount }, (_, index) => index);

    const currentData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    const nextPage = () => setCurrentPage((prev) => (prev < pageCount - 1 ? prev + 1 : prev));
    const prevPage = () => setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));

    return (
        <div className="flex bg-white sm:rounded-lg sm:px-6 lg:px-8 overflow-hidden box-shadow  flex-col">
            <div className="-my-2  overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full ">
                    <div className=" overflow-hidden border-b border-gray-200 ">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {columns.map((column) => (
                                        <th key={column.accessor}
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-[#475467] tracking-wider">
                                            {column.Header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className=" divide-y divide-gray-200">
                                {currentData.map((currentData) => (
                                    <RowComponent exchanger={currentData} key={currentData.id}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="py-3 mt-[1rem] sm:mt-0">
                
                <div className="flex flex-col items-center gap-[1rem] sm:flex-row sm:justify-between">
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

export default Table;
