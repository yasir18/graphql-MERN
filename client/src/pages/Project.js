import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { GET_PROJECT } from "../queries/ProjectQueries";
import { useQuery } from "@apollo/client";
import spinner from "../assets/spinner.gif";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading)
    return (
      <div>
        <img
          src={spinner}
          alt="Loading..."
          style={{
            width: "100px",
            height: "100px",
            margin: "auto",
            display: "block",
          }}
        />
      </div>
    );
  if (error) return <div> Error in fetching data from graphql</div>;
  return (
    <>
      <Header />
      <div className="projectCard">
        <p style={{ textAlign: "right", paddingRight: "10%" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            {" "}
            <Button>Back</Button>
          </a>
        </p>
        <h3>{data.project.name}</h3>
        <p>{data.project.description}</p>
        <h4> Project Status : {data.project.status}</h4>

        <div>
          <p>
            <b>Client Information</b>
          </p>
          <div className="classInfo">
            <p>
              <PersonIcon /> {data.project.client.name}
            </p>
            <p>
              <EmailIcon /> {data.project.client.email}
            </p>
            <p>
              <PhoneIcon /> {data.project.client.phone}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
