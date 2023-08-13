export function Card(props) {
    return (
        <div className="shadow-md bg-white rounded-lg mb-5 p-5 flex items-center justify-between">
            <input className="mr-10 rounded" type="checkbox" checked={props.item.status} onChange={() => props.toggleStatus(props.item)} />
            <div className="flex-grow h-30">
                <p className={props.item.status ? "line-through text-gray-400" : "text-black"}>{props.item.title}</p>
                <small className="text-gray-500 text-xs border-t">{new Date(props.item.date).toLocaleString()}</small>
            </div>
               
            <button className="ml-10 text-red-300 hover:text-red-500" onClick={() => props.deleteTask(props.item)} title="Delete"><svg className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
</svg></button>
        </div>
    )
}