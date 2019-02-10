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
    if(reg.test(stringa))
      alert("not valid not 1");

    reg = new RegExp('![()]*[^()ft]');
    if(reg.test(stringa))
      alert("not valid not 2");

    reg = new RegExp('![()]*[tf][()]*[^()A-Z]');
    if(reg.test(stringa))
      alert("not valid not 3");

    reg = new RegExp('![()]*[tf][()]*[A-Z][()]*[^()&|>-]+');
    if(reg.test(stringa))
      alert("not valid not 4");
    
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

  validateAnd = () => {
    // Left Side.
    var reg = new RegExp('[^()A-Z][()]*&');
    let stringa = this.state.formula;
    if(reg.test(stringa))
      alert("not valid and left side 1");
    
    reg = new RegExp('[^()ft]+[()]*[A-Z][()]*&');
    stringa = this.state.formula;
    if(reg.test(stringa))
      alert("not valid and left side 2");

    reg = new RegExp('[^()!&|>-][()]*[ft][()]*[A-Z][()]*&');
    stringa = this.state.formula;
    if(reg.test(stringa))
      alert("not valid and left side 3");

    // Right Side.
    reg = new RegExp('&[()!]*[^()!ft]');
    stringa = this.state.formula;
    if(reg.test(stringa))
      alert("not valid and right side 1");

    reg = new RegExp('&[()!]*[ft][()]*[^()A-Z]');
    stringa = this.state.formula;
    if(reg.test(stringa))
      alert("not valid and right side 2");
    
    reg = new RegExp('&[()!]*[ft][()]*[A-Z][()]*[^()&|>-]');
    stringa = this.state.formula;
    if(reg.test(stringa))
      alert("not valid and right side 3");

  };
  validateAll = () => {
    this.validateNot();
    this.validateAnd();
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
              label="Check not"
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
 