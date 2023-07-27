export function Card({ id, title, status, date }) {
    return (
        <div key={id}>
            <input type="checkbox" />
            <p>{title}</p>
            <small>{date}</small>
        </div>
    )
}