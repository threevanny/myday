import logo from '../assets/images/logo.png';

export function Navbar(props) {
    return (
        <div className="flex items-center justify-between">
            <img className="h-10" src={logo} alt="MyDay Logo" />
            <p>{props.date}</p>
        </div>
    )
}