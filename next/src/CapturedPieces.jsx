export default function CapturedPieces({ whiteCaptured, blackCaptured }) {
  return (
    <div className="captured-pieces">
      <div>
        <h4>White Captured</h4>
        <div>{whiteCaptured.join(" ")}</div>
      </div>
      <div>
        <h4>Black Captured</h4>
        <div>{blackCaptured.join(" ")}</div>
      </div>
    </div>
  );
}
