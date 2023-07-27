export function Card(props) {
    return (
        <div>
            <input type="checkbox" checked={props.item.status} onChange={() => props.toggleStatus(props.item)} />
            <p>{props.item.title}</p>
            <small>{props.item.date}</small>
            <button onClick={() => props.deleteTask(props.item)}>DELETE</button>
        </div>
    )
}