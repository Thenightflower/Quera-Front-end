import React, { useReducer, Fragment } from "react";
import "./App.css";

const steps = [1, 2, 3, 4];

function reducer(state, action) {
  switch (action.type) {
    case "NEXT":
      return state < steps.length - 1 ? state + 1 : state;
    case "PREV":
      return state > 0 ? state - 1 : state;
    default:
      return state;
  }
}

function App() {
  const [currentStep, dispatch] = useReducer(reducer, 0); 

  return (
    <div className="container">
      <div className="pages">
        {steps.map((step, index) => (
          <React.Fragment>
            <div
              style={{
                borderColor: index <= currentStep ? "rgb(70, 92, 216)" : "gray",
              }}
            >
              {step}
            </div>
            {index < steps.length - 1 && (
              <span
                style={{
                  backgroundColor: index < currentStep ? "rgb(70, 92, 216)" : "gray",
                }}
              ></span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="btns" >
        <button
          data-testid="prevBtn"
          onClick={() => dispatch({ type: "PREV" })}
          disabled={currentStep === 0}
          style={{
            backgroundColor: currentStep === 0 ? "gray" : "rgb(70, 92, 216)",
          }}
        >
          Prev
        </button>

        <button
          data-testid="nextBtn"
          onClick={() => dispatch({ type: "NEXT" })}
          disabled={currentStep === steps.length - 1}
          style={{
            backgroundColor:
              currentStep === steps.length - 1 ? "gray" : "rgb(70, 92, 216)",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
