import React from "react";
import FaPencil from "react-icons/lib/fa/pencil";
import FaTrash from "react-icons/lib/fa/trash";
import FaFloppyO from "react-icons/lib/fa/floppy-o";

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    this.save = this.save.bind(this);
    this.randomBetween=this.randomBetween.bind(this)

  }

  componentWillMount(){
    this.style={
      right: this.randomBetween(0,window.innerWidth-150,'px'),
      top: this.randomBetween(0,window.innerHeight-150,'px'),
      transform: `rotate(${this.randomBetween(-25,25,'deg')}`
    }
  }
  componentDidUpdate(){
    let textarea
    if(this.state.editing){
      textarea=this._newText
      textarea.focus()
      textarea.select()
    }
  }

  shouldComponentUpdate(nextProps,nextState){
    return(
      this.props.children !==nextProps.children || this.state !== nextState
    )
  }
  randomBetween(x,y,units){
    return x+Math.ceil(Math.random()*(y-x))+units
  }

  edit() {
    this.setState({
      editing: true
    });
  }
  remove() {
      this.props.onRemove(this.props.index)
  }
  save(e) {
    e.preventDefault()
    this.props.onChange(this._newText.value, this.props.index)
    this.setState({
      editing:false
    })
  }

  renderForm() {
    return (
      <div className="note" style={this.style}>
        <form onSubmit={this.save}>
          <textarea ref={input => (this._newText = input)} defaultValue={this.props.children}/>
          <button id='save'>
            <FaFloppyO />
          </button>
        </form>
      </div>
    );
  }

  renderDisplay() {
    return (
      <div className="note" style={this.style}>
        <p>{this.props.children}</p>
        <span>
          <button id="edit" onClick={this.edit}>
            <FaPencil />
          </button>
          <button id="remove" onClick={this.remove}>
            <FaTrash />
          </button>
        </span>
      </div>
    );
  }
  render() {
    return this.state.editing ? this.renderForm() : this.renderDisplay();
  }
}
