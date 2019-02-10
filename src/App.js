import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends Component {
  state = {
    formula: '',
  };
  validateNot = () => {
    var reg = new RegExp('[^()&|>-][()]*!')
    let stringa = this.state.formula;
    if(reg.test(stringa)) {
      alert("not valid not 1");
      return false;
    }

    reg = new RegExp('![()]*[^()ft]');
    if(reg.test(stringa)) {
      alert("not valid not 2");
      return false;
    }

    reg = new RegExp('![()]*[tf][()]*[^()A-Z]');
    if(reg.test(stringa)) {
      alert("not valid not 3");
      return false;
    }

    reg = new RegExp('![()]*[tf][()]*[A-Z][()]*[^()&|>-]+');
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
    if(!(this.validateNot() && this.validateSomething('&') && this.validateSomething('|') && this.validateSomething('>') && this.validateSomething('-'))) {
      alert("Formula non valida!");
    }
  };
  cambia = (name) => event => {
    this.setState({[name]: event.target.value});
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
            />
          </td>
        </tr>
        <tr>
          <td>
            <Button variant="outlined" onClick={this.validateAll}>Click</Button>
          </td>
        </tr>
      </table>
      </center>
    );
  }
}
export default App;
 