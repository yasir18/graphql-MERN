import { Link } from "react-router-dom";
export default function () {
  return (
    <div>
      <p>Sorry, the page doesn't exist</p>
      <p>
        <Link to="/">Go Back</Link>
      </p>
    </div>
  );
}
