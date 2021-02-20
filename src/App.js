import React, { Component } from "react";
import Dropzone from "react-dropzone";
import csv from "csvtojson";
import "./App.css";
import Calendar from "./Calendar";

const apiUrl = "http://localhost:3001";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      bookings: [],
      conflicts: []
    };
  }

  componentDidMount() {
    fetch(`${apiUrl}/bookings`)
      .then(response => response.json())
      .then(onSuccess, onError);
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      csv({
        checkType: true
      })
        .fromString(reader.result)
        .then(rows => {
          this.postCsvRows(rows);
        });
    };
    reader.onabort = () => console.warn("file reading was aborted");
    reader.onerror = () => console.error("file reading has failed");

    acceptedFiles.forEach(file => {
      reader.readAsBinaryString(file);
    });
  };

  postCsvRows = rows => {
    fetch(`${apiUrl}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rows)
    })
      .then(response => response.json())
      .then(onSuccess, onError);
  };

  eventClickFunc = event => {
    if (window.confirm("Confirm to delete this booking ?")) {
      const eventId = event.id;
      fetch(`${apiUrl}/booking/${eventId}`, { method: "DELETE" })
        .then(response => response.json())
        .then(onSuccess, onError);
    }
  };

  eventDropFunc = event => {
    fetch(`${apiUrl}/booking`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: event.id,
        title: event.title,
        start: event.start.format(),
        end: event.end.format()
      })
    })
      .then(response => response.json())
      .then(onSuccess, onError);
  };

  onSuccess = json => {
    this.setState({
      isLoaded: true,
      bookings: json.bookings,
      conflicts: json.conflicts
    });
  };

  onError = error => {
    this.setState({
      isLoaded: true,
      error
    });
  };

  render() {
    const { error, isLoaded, bookings, conflicts } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <Dropzone accept=".csv" onDrop={this.onDrop}>
            Drag files here
          </Dropzone>
        </div>

        <div className="App-calendar">
          <Calendar
            bookings={bookings}
            conflicts={conflicts}
            eventClickFunc={this.eventClickFunc}
            eventDropFunc={this.eventDropFunc}
          />
        </div>
      </div>
    );
  }
}

export default App;
