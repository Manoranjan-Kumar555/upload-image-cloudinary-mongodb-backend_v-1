import "./App.css";
import ImageUploader from "./component/ImageUploader";

function App() {
  return (
    <>
      <div
        style={{ background: "#f9fafb", minHeight: "100vh", padding: "40px" }}
      >
        <ImageUploader />
      </div>
    </>
  );
}

export default App;
