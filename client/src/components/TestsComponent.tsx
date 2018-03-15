import * as React from 'react';

let myMarked = require('marked');

interface IProps {
}

interface IState {
  buttonText: string,
  text: string,
  rendering: boolean,
  html: string
}

class TestsComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { 
      buttonText: 'Save',
      text: '1',
      rendering: false,
      html: ''
    };
  }

  private setClick(){
    document.getElementById("md").innerHTML = '';
    this.setState({
      buttonText: 'Save',
      rendering: false,
    });
  }

  private createMd(){
    const value = (document.getElementById('text') as HTMLInputElement).value;
    const html = myMarked(value);
    this.setState({
      buttonText: 'Change',
      text: value,
      rendering: true,
      html: html
    });
  }

  private setHtml(){
    document.getElementById("md").innerHTML = this.state.html;
  }

  public render() {
    return (
      <div >
        {this.state.rendering ?
         this.setHtml()
        : <textarea id="text" >{this.state.text}</textarea> }
        <div id='md'></div>
        <input type="button" onClick={()=>{
          this.state.rendering ? 
          this.setClick()
          : this.createMd()}}
          value={this.state.buttonText}/>
      </div>
    );
  }
}

export default TestsComponent;
