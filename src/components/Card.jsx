export function Card(props) {
    return (
        <div className="shadow-sm bg-gray-100 rounded-lg mb-4 p-4 flex items-center justify-between">
            <input className="mr-10" type="checkbox" checked={props.item.status} onChange={() => props.toggleStatus(props.item)} />
            <div className="flex-grow h-30">
                <p className={props.item.status ? "line-through text-gray-400" : "text-black"}>{props.item.title}</p>
                <small className="text-gray-500 text-xs border-t">{new Date(props.item.date).toLocaleString()}</small>
            </div>
               
            <button className="ml-10 text-red-300 hover:text-red-500" onClick={() => props.deleteTask(props.item)}><small className="text-xs">DELETE</small></button>
        </div>
    )
}