import React, { useContext } from "react";
import ContextValue from "../context/notes/notecontext";
import Notes from "./Notes";

const Home = () => {
  const context = useContext(ContextValue);
  const { notes, setNotes } = context;
  return (
    <div>
      <Notes />
    </div>
  );
};

export default Home;
