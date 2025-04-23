export default function FindIndex() {
    let numberArray1 = [1, 2, 3, 4, 5, 6];
    let stringArray1 = ['string1', 'string3'];
    const four = numberArray1.find((a) => a === 4);
    const string3 = stringArray1.find((a) => a === "string3");
    return (
      <div id="wd-find-function">
        <h4>FindIndex function</h4>
        fourIndex = {four} <br />
        string3Index = {string3} <hr />
      </div>
    );
}