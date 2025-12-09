
interface TableRow {
    _key: string;
    cells: string[];
}

interface TableProps {
    value: {
        rows?: TableRow[];
    };
}

export default function Table({ value }: TableProps) {
    const { rows = [] } = value;

    if (!rows || rows.length === 0) {
        return null;
    }

    const [headerRow, ...bodyRows] = rows;

    return (
        <div className="overflow-x-auto my-8 border border-white/10 rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                <thead className="text-xs text-gray-200 uppercase bg-[#1a1a1a]">
                    <tr>
                        {headerRow.cells.map((cell, index) => (
                            <th key={index} scope="col" className="px-6 py-3 border-b border-white/10">
                                {cell}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {bodyRows.map((row) => (
                        <tr key={row._key} className="bg-black border-b border-white/10 hover:bg-[#111]">
                            {row.cells.map((cell, index) => (
                                <td key={index} className="px-6 py-4">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
