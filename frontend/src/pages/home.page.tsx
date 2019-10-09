import * as React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
    <div>

        <Link to="/login">Navigate to Login</Link><br />
        <Link to="/signup">Navigate to Sign Up</Link><br />

    </div>
);

export default HomePage; 