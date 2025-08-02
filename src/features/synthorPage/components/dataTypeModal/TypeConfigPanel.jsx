


export default function TypeConfigPanel({ selectedType, onConfirm }) {
    if (!selectedType) {
        return (
            <div className="w-full h-full overflow-y-auto px-4 py-2">


            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-y-auto px-4 py-2">

            <h4 className="text-lg font-semibold mb-4">{selectedType.name}</h4>
            <p className="text-gray-400 text-sm mb-4">
                Configure the selected data type
            </p>



            <button
                className="mt-2 px-4 py-2 bg-cyan-400 rounded hover:bg-cyan-700"
                onClick={onConfirm}
            >
                Select Type
            </button>
        </div>
    );
}
