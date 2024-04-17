import { useState } from "react";
import "./App.css";
import AddUrlInput from "./components/AddUrlInput";
import Hero from "./components/Hero";
import ShortTable from "./components/ShortTable";

function App() {
  return (
    <>
      <main className="min-h-screen bg-gray-900">
        <Hero />
        <AddUrlInput />
        <ShortTable />
      </main>
    </>
  );
}

export default App;
