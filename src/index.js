import React from "react";
import { render } from "react-dom";
import { Box, Button, Heading, Text } from "gestalt";

var number = "";
var display = [];
var decimal = false;

function update(op, ar) {
  var i = ar.indexOf(op);
  var num = 0;
  switch (op) {
    case "x":
      num = Number(ar[i - 1]) * Number(ar[i + 1]);
      break;
    case "/":
      num = Number(ar[i - 1]) / Number(ar[i + 1]);
      break;
    case "+":
      num = Number(ar[i - 1]) + Number(ar[i + 1]);
      break;
    case "-":
      num = Number(ar[i - 1]) - Number(ar[i + 1]);
      break;
    default:
      break;
  }
  ar.splice(i - 1, 3, num);
  return ar;
}

function myFunction(a) {
  if (a.length === 1) {
    return Number(a[0]);
  } else {
    if (a.indexOf("x") !== -1 && a.indexOf("/") !== -1) {
      if (a.indexOf("x") <= a.indexOf("/")) {
        return myFunction(update("x", a));
      } else {
        return myFunction(update("/", a));
      }
    } else if (a.indexOf("x") !== -1) {
      return myFunction(update("x", a));
    } else if (a.indexOf("/") !== -1) {
      return myFunction(update("/", a));
    } else if (a.indexOf("+") !== -1 && a.indexOf("-") !== -1) {
      if (a.indexOf("+") <= a.indexOf("-")) {
        return myFunction(update("+", a));
      } else {
        return myFunction(update("-", a));
      }
    } else if (a.indexOf("+") !== -1) {
      return myFunction(update("+", a));
    } else if (a.indexOf("-") !== -1) {
      return myFunction(update("-", a));
    }
  }
}

function roundToFour(num) {
  var n = Math.round(num * 10000) / 10000;
  if (n > 1 || n < -1) {
    if (n.toString().indexOf("e") !== -1) {
      return n.toPrecision(4);
    }
    return n;
  }
  return n;
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      display0: "0",
      display1: "0"
    };
    this.bclick = this.bclick.bind(this);
  }

  bclick(e) {
    switch (e) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        //console.log("number: "+number);
        //console.log("e: "+e);
        if (number !== "0") {
          number = number.concat(e);
          this.setState({
            display0: display.join(" ") + " " + number,
            display1: number
          });
          break;
        } else if (number === "0" && e !== "0") {
          number = e;
          this.setState({
            display0: display.join(" ") + " " + number,
            display1: number
          });
          break;
        } else {
          break;
        }

      case ".":
        if (decimal === false) {
          number = number.concat(e);
          this.setState({
            display0: display.join(" ") + " " + number,
            display1: number
          });
          decimal = true;
          break;
        } else {
          break;
        }

      case "c":
        number = "";
        decimal = false;
        display = [];
        this.setState({
          display0: "0",
          display1: "0"
        });
        break;

      case "x":
      case "/":
      case "+":
      case "-":
        // console.log('number: '+number);
        // console.log('e: '+e);
        if (
          ["x", "/", "+", "-"].includes(display[display.length - 1]) &&
          display.length > 0
        ) {
          display[display.length - 1] = e;
          number = "";
          this.setState({
            display0: display.join(" "),
            display1: e
          });
          break;
        } else {
          if (number !== "") {
            //   console.log('display pushed: '+number);
            display.push(number);
          }
          number = "";
          display.push(e);
          decimal = false;
          this.setState({
            display0: display.join(" "),
            display1: e
          });
          break;
        }

      case "=":
        // console.log('pressed: '+e);
        // console.log('number: '+number);
        // console.log('display: '+display);
        if (number === "" || number === ".") {
          break;
        } else {
          // console.log("about to push: " + number);
          display.push(number);
          // console.log(display);
        } /*
        if (["x", "/", "+", "-", "."].includes(display[display.length - 1])) {
          console.log("what");
          this.setState({
            display1: "PLEASE ENTER NUMBER:"
          });

          break;
        }
*/
        number = roundToFour(myFunction(display));
        decimal = false;
        display = [];
        this.setState({
          display0: number,
          display1: number
        });
        number = number.toString();
        // console.log("number: " + number + " nl: " + number.length);
        // console.log("display: " + display.length);
        break;

      default:
        break;
    }
  }
  render() {
    return (
      <Box padding={2}>
        <Box align="center">
          <Box align="center" maxWidth={520} marginBottom={1}>
            <Heading size="lg">Calculator</Heading>
          </Box>
          <Box color="darkGray" maxWidth={520} shape="rounded" padding={4}>
            <Box marginBottom={4}>
              <Text bold size="sm" align="center" color="white">
                {this.state.display0}
              </Text>
            </Box>
            <Box marginBottom={4}>
              <Text bold size="xl" align="center" color="white">
                {this.state.display1}
              </Text>
            </Box>
            <Box
              display="flex"
              direction="row"
              marginLeft={-2}
              marginRight={-2}
            >
              <Box display="flex" direction="row" column={6} paddingX={2}>
                <Button
                  id="s"
                  color="transparent"
                  text="7"
                  onClick={() => {
                    this.bclick("7");
                  }}
                />
              </Box>
              <Box display="flex" direction="row" column={6} paddingX={2}>
                <Button
                  color="transparent"
                  text="8"
                  onClick={() => {
                    this.bclick("8");
                  }}
                />
              </Box>
              <Box display="flex" direction="row" column={6} paddingX={2}>
                <Button
                  color="transparent"
                  text="9"
                  onClick={() => {
                    this.bclick("9");
                  }}
                />
              </Box>
              <Box column={6} paddingX={2}>
                <Button
                  color="white"
                  text="X"
                  onClick={() => {
                    this.bclick("x");
                  }}
                />
              </Box>
            </Box>

            <Box
              display="flex"
              direction="row"
              marginLeft={-2}
              marginRight={-2}
            >
              <Box display="flex" direction="row" column={6} paddingX={2}>
                <Button
                  color="transparent"
                  text="4"
                  onClick={() => {
                    this.bclick("4");
                  }}
                />
              </Box>
              <Box display="flex" direction="row" column={6} paddingX={2}>
                <Button
                  color="transparent"
                  text="5"
                  onClick={() => {
                    this.bclick("5");
                  }}
                />
              </Box>
              <Box display="flex" direction="row" column={6} paddingX={2}>
                <Button
                  color="transparent"
                  text="6"
                  onClick={() => {
                    this.bclick("6");
                  }}
                />
              </Box>
              <Box column={6} paddingX={2}>
                <Button
                  color="white"
                  text="/"
                  onClick={() => {
                    this.bclick("/");
                  }}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              direction="row"
              marginLeft={-2}
              marginRight={-2}
            >
              <Box display="flex" direction="row" column={6} paddingX={2}>
                <Button
                  color="transparent"
                  text="1"
                  onClick={() => {
                    this.bclick("1");
                  }}
                />
              </Box>
              <Box display="flex" direction="row" column={6} paddingX={2}>
                <Button
                  color="transparent"
                  text="2"
                  onClick={() => {
                    this.bclick("2");
                  }}
                />
              </Box>
              <Box display="flex" direction="row" column={6} paddingX={2}>
                <Button
                  color="transparent"
                  text="3"
                  onClick={() => {
                    this.bclick("3");
                  }}
                />
              </Box>
              <Box column={6} paddingX={2}>
                <Button
                  color="white"
                  text="+"
                  onClick={() => {
                    this.bclick("+");
                  }}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              direction="row"
              marginLeft={-2}
              marginRight={-2}
            >
              <Box display="flex" direction="row" column={6} paddingX={2}>
                <Button
                  color="red"
                  text="Clear"
                  onClick={() => {
                    this.bclick("c");
                  }}
                />
              </Box>
              <Box display="flex" direction="row" column={6} paddingX={2}>
                <Button
                  color="transparent"
                  text="0"
                  onClick={() => {
                    this.bclick("0");
                  }}
                />
              </Box>
              <Box display="flex" direction="row" column={6} paddingX={2}>
                <Button
                  color="transparent"
                  text="."
                  onClick={() => {
                    this.bclick(".");
                  }}
                />
              </Box>
              <Box column={6} paddingX={2}>
                <Button
                  color="white"
                  text="-"
                  onClick={() => {
                    this.bclick("-");
                  }}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              direction="row"
              marginTop={2}
              marginLeft={-2}
              marginRight={-2}
            >
              <Box column={12} paddingX={2}>
                <Button
                  color="blue"
                  text="="
                  onClick={() => {
                    this.bclick("=");
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

render(<Demo />, document.getElementById("root"));
