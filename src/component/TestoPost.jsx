import { useState } from "react";

const TestoPost = ({ text, maxLength }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const displayText = showFullText ? text : text.slice(0, maxLength);

  return (
    <div>
      <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{displayText}</p>
      {text.length > maxLength && <button onClick={toggleText}>{showFullText ? "Mostra Meno" : "Mostra Altro"}</button>}
    </div>
  );
};

export default TestoPost;
