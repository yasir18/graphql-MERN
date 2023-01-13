import * as React from "react";
import ProjectCard from "./ProjectCard";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import { useQuery } from "@apollo/client";
import spinner from "../assets/spinner.gif";

export default function Project() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

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
      <div className="clientHeader">Projects</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "10px",
          flexWrap: "wrap",
        }}
      >
        {data.projects.map((project) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </div>
    </>
  );
}
