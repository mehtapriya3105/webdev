export const FindIndex = () => {
    const numbers = [1, 2, 4, 5, 6];
    const strings = ["string1", "string3"];
  
    const fourIndex = numbers.findIndex((a) => a === 4);
    const string3Index = strings.findIndex((a) => a === "string3");
  
    return (
      <div id="wd-find-index">
        <h4>FindIndex Function</h4>
        fourIndex = {fourIndex} <br />
        string3Index = {string3Index} <hr />
      </div>
    );
  };
  
  export default FindIndex;