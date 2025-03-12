import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingFunctions from "./PassignFunction";
import PassingDataOnEvent from "./PassingDataEvent";
import ReduxExamples from "./ReduxExamples";
import StringStateVariables from "./StringStateVariables";


export default function Lab4(){
    function sayHello() {
        alert("Hello");
      }
    
    return(
        <div>
            <p>Hello Lab 4</p>

            <ClickEvent/>
            <PassingDataOnEvent />
            <PassingFunctions theFunction={sayHello} />
            <EventObject />
            <Counter/>
            <BooleanStateVariables/>
            <StringStateVariables/>
            <DateStateVariable/>
            <ObjectStateVariable/>
            <ArrayStateVariable/>
            <ParentStateComponent/>

            <ReduxExamples />
        </div>
    )
};