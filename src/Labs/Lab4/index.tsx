import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import ReduxExamples from "./ReduxExamples";
import StringStateVariables from "./StringStateVariables";
import ArrayStateVariable from "./ArrayStateVariable";
import DataStateVariable from "./DateStateVariable";
export default function Lab4() {

    function sayHello() {
        alert("Hello");
      }
    
  return (
    <div>
      <h1>Lab 4</h1>
      <div className="list-group">
<ClickEvent />
<PassingDataOnEvent />
<PassingFunctions theFunction={sayHello} />
<EventObject />
<Counter />
<BooleanStateVariables />
<StringStateVariables />
<DataStateVariable />
<ObjectStateVariable />
<ArrayStateVariable />
<hr />
<ParentStateComponent />
<ReduxExamples />
      </div>
    </div>
  );
}

