import React from "react";
import FullCalendar from "fullcalendar-reactwrapper";
import moment from "moment";
import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";

const Calendar = ({ bookings, conflicts }) => {
  return (
    <div>
      <FullCalendar
        id="bookings-calendar"
        header={{
          left: "prev,next today myCustomButton",
          center: "Booking calendar",
          right: "month,basicWeek,basicDay"
        }}
        defaultDate={moment()}
        navLinks={true}
        editable={false}
        eventLimit={true}
        events={bookings.concat(conflicts)}
        defaultView={"agendaWeek"}
        timezone={"local"}
        businessHours={{
          start: "8:00",
          end: "20:00"
        }}
      />
    </div>
  );
};

export default Calendar;
