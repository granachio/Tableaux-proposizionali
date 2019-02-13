import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends Component {
  state = {
    formula: '',
    valida: false
  };
  componentDidMount() {
    setInterval(this.updateDiv, 1000);
  }
  validateNot = () => {
    var reg = new RegExp('[^!()&|>-][()]*!')
    let stringa = this.state.formula;
    if(reg.test(stringa)) {
      alert("not valid not 1");
      return false;
    }

    reg = new RegExp('![()!]*[^!()ft]');
    if(reg.test(stringa)) {
      alert("not valid not 2");
      return false;
    }

    reg = new RegExp('![()!]*[tf][()]*[^()A-Z]');
    if(reg.test(stringa)) {
      alert("not valid not 3");
      return false;
    }

    reg = new RegExp('![()!]*[tf][()]*[A-Z][()]*[^()&|>-]+');
    if(reg.test(stringa)) {
      alert("not valid not 4");
      return false;
    }
    
    return true;
    /* var myString = this.state.formula;
    var myRegexp = /[^()&|>-][()]*!/g;
    var match = myRegexp.exec(myString);
    let i = 0;
    if(match !== null) {
      if(match.length >= 1) {
        while (match[i] !== undefined) {
          alert(match[i]);
          i++;
        }
      }
    } */
  };

  validateSomething = (symbol) => {
    symbol = '[' + symbol + ']';
    // Left Side.
    var reg = new RegExp('[^()A-Z][()]*' + symbol);
    let stringa = this.state.formula;
    if(reg.test(stringa)) {
      alert("not valid " + symbol + " left side 1");
      return false;
    }
    reg = new RegExp('[^()ft]+[()]*[A-Z][()]*'+ symbol);
    stringa = this.state.formula;
    if(reg.test(stringa)) {
      alert("not valid " + symbol + " left side 2");
      return false;
    }
    reg = new RegExp('[^()!&|>-][()]*[ft][()]*[A-Z][()]*' + symbol);
    stringa = this.state.formula;
    if(reg.test(stringa)) {
      alert("not valid " + symbol + " left side 3");
      return false;
    }
    // Right Side.
    reg = new RegExp(symbol + '[()!]*[^()!ft]');
    stringa = this.state.formula;
    if(reg.test(stringa)) {
      alert("not valid " + symbol + " right side 1");
      return false;
    }
    reg = new RegExp(symbol + '[()!]*[ft][()]*[^()A-Z]');
    stringa = this.state.formula;
    if(reg.test(stringa)) {
      alert("not valid "+ symbol + " right side 2");
      return false;
    }
    reg = new RegExp(symbol + '[()!]*[ft][()]*[A-Z][()]*[^()&|>-]');
    stringa = this.state.formula;
    if(reg.test(stringa)) {
      alert("not valid " + symbol + " right side 3");
      return false;
    }
    return true;
  };
  validateAll = () => {
    if(this.state.valida) {
      alert("La formula è gia valida!");
      return;
    }
    if(!(this.validateNot() && this.validateSomething('&') && this.validateSomething('|') && this.validateSomething('>') && this.validateSomething('-'))) {
      alert("Formula non valida!");
      return;
    }
    if(!this.checkBrackets()) {
      alert("Invalid brackets pattern!")
      return;
    }
    this.setState({valida: true});
    this.brackets();
    setInterval(this.notResolve, 3000);
  };
  checkBrackets = () => {
    let open = (this.state.formula.match(new RegExp('[(]','g') || [])).length;
    let close = (this.state.formula.match(new RegExp('[)]','g') || [])).length;
    if(open !== close)
      return false;

    return true;
  };
  brackets = () => {
    var temp = this.state.formula; 
    var match = temp.match(/[tf][A-Z]/g);
    var stringa = "";
    let i = 0;
    if(match !== null) {
        while (match[i] !== undefined) {
          let some = match[i];
          let index = temp.indexOf(some);
          stringa += temp.substring(0, index) + '(' + some + ')';
          temp = temp.substring(index + some.length);
          i++;
        }    
    }
    stringa += temp;
    this.setState((state) => ({formula: stringa}));
  };
  notResolve = () => {
    this.resolverForNot(/![(][tf][A-Z][)]/g, 2);
  };
  resolverForNot = (reg, charIndex) => {
    let temp = this.state.formula;
    var match = temp.match(reg);
    var support = "";
    let i = 0;
    if(match !== null) {
        while (match[i] !== undefined) {
          let some = match[i];
            let verita = true;
            switch(some.charAt(charIndex)) {
              case 'f':
              verita = false;
              break;
              default:
              break;
            }
            let iof = temp.indexOf(some);
            (verita) ? some = some.replace("t", "f") : some = some.replace("f", "t");
            support += temp.substring(0, iof) + some.substring(1);
            temp = temp.substring(iof + some.length);
          i++;
        } 
    }
    support += temp;
    this.setState({formula: support});
  };
  equalBrackets = (some) => {
      let open = this.numberOccurences(some, new RegExp("[(]", "g"));
      let close = this.numberOccurences(some, new RegExp("[)]", "g"));
      return (open === close)?true:false;
  };
  numberOccurences = (some, rgxp) => {
    return (some.match(rgxp) || []).length;
  };
  updateDiv = () => {
    document.getElementById("formula").innerHTML = this.state.formula;
  };
  cambia = (name) => event => {
    this.setState({[name]: event.target.value, valida: false});
  };
  handleKeyPress = (event) => {
    // keyCode 13 === Enter
    if(event.keyCode === 13) {
      this.validateAll();
    }
  };
  render() {
    return (
      <center>
      <table>
        <tr>
          <td>
            <TextField
              id="outlined-name"
              label="Check"
              margin="normal"
              variant="outlined"
              onChange={this.cambia('formula')}
              onKeyUp={this.handleKeyPress}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Button variant="outlined" onClick={this.validateAll}>Click</Button>
          </td>
        </tr>
        <tr>
          <td>
            <div id="formula"></div>
          </td>
        </tr>
      </table>
      </center>
    );
  }
}
export default App;
 