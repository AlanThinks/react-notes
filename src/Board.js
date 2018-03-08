import React, { Component } from "react";
import Note from "./Note";
import FaPlus from "react-icons/lib/fa/plus";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
    this.eachNote = this.eachNote.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.nextId = this.nextId.bind(this);
  }

  componentWillMount() {
    let self = this;
    if (this.props.count) {
      fetch(
        `https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`
      )
        .then(resp => resp.json())
        .then(json =>
          json[0]
            .split(".")
            .forEach(sentences => self.add(sentences.substring(0, 35)))
        );
    }
  }

 
  update(newText, i) {
    console.log("updating iteam at index:", i, newText);
    this.setState(prevState => ({
      notes: prevState.notes.map(
        note => (note.id !== i ? note : { ...note, note: newText })
      )
    }));
  }
  add(text) {
    this.setState(preState => ({
      notes: [
        ...preState.notes,
        {
          id: this.nextId(),
          note: text
        }
      ]
    }));
  }
  nextId() {
    this.uniqueID = this.uniqueID || 0;
    return this.uniqueID++;
  }
  remove(id) {
    console.log("removing id:", id);
    this.setState(preState => ({
      notes: preState.notes.filter(note => note.id !== id)
    }));
  }

  eachNote(note, i) {
    return (
      <Note key={note.id} index={note.id} onChange={this.update} onRemove={this.remove}>
        {note.note}
      </Note>
    );
  }

  render() {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={this.add.bind(null, "new note")} id="add">
          <FaPlus />
        </button>
      </div>
    );
  }
}
