import { FiBookOpen } from "react-icons/fi";

function Spinner() {
  return (
    <div className="loadingSpinnerContainer" role="status" aria-live="polite">
      <div className="loadingSpinnerCard">
        <div className="loadingSpinner" aria-hidden="true">
          <span className="loadingSpinnerRing" />
          <span className="loadingSpinnerIcon">
            <FiBookOpen size={27} />
          </span>
        </div>
        <p className="loadingSpinnerMessage">Finding your next great read</p>
        <span className="loadingSpinnerSrOnly">Loading</span>
      </div>
    </div>
  );
}

export default Spinner;
