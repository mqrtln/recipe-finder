import { NavLink } from "react-router";

const Navbar = () => {

    return(
        <nav>
            <NavLink to="/" end>
                Home
            </NavLink>
            <NavLink to="/saved-recipes">
                Saved Recipes
            </NavLink>
        </nav>
    )
}


export default Navbar; 