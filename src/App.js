import "./App.css";
import User from "./User";

function App() {
  return (
    <div className="App">
      <h1>CSES Live Scores</h1>
      <div style={{ display: "flex" }}>
        <User id={49450}/>
        <User id={72370}/>
      </div>
    </div>
  );
}

export default App;
