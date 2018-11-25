import React, { Component } from "react";
import Dropzone from "react-dropzone";
import csv from "csvtojson";
import "./App.css";
import Calendar from "./Calendar";
import { toBooking } from "./lib/booking";

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
      .then(
        json => {
          console.log(json);
          this.setState({
            isLoaded: true,
            bookings: json.bookings,
            conflicts: json.conflicts
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      csv({
        checkType: true
      })
        .fromString(reader.result)
        .then(raw => {
          console.log(raw);
          this.postBookings(raw.map(toBooking).filter(Boolean));
        });
    };
    reader.onabort = () => console.warn("file reading was aborted");
    reader.onerror = () => console.error("file reading has failed");

    acceptedFiles.forEach(file => {
      reader.readAsBinaryString(file);
    });
  };

  postBookings = bookings => {
    fetch(`${apiUrl}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookings)
    })
      .then(response => response.json())
      .then(
        json => {
          this.setState({
            isLoaded: true,
            bookings: json.bookings,
            conflicts: json.conflicts
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
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
          <Calendar bookings={bookings} conflicts={conflicts} />
        </div>
      </div>
    );
  }
}

export default App;
