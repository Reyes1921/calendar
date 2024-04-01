import {useEffect, useState} from "react"
import {Calendar} from "react-big-calendar"
import {CalendarEventBox, CalendarModal, FabAddNew, FabDelete} from "../index"
import "react-big-calendar/lib/css/react-big-calendar.css"

import {NavBar} from "../components/NavBar"
import {localizer, getMessagesEs} from "../../helpers"
import {useUiStore, useCalendarStore, useAuthStore} from "../../hooks"

export const CalendarPage = () => {
  const {user} = useAuthStore()
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()
  const {openDateModal} = useUiStore()
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  )

  const eventStyleGetter = (event, start, end, isSelcted) => {
    const isMyEvent = user.uid === event.user._id || user.uid === event.user.uid

    const style = {
      backgroundColor: isMyEvent ? "#34CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "#FFF",
    }

    return {
      style,
    }
  }

  const onDoubleClick = (event) => {
    openDateModal()
  }

  const onSelect = (event) => {
    setActiveEvent(event)
  }

  const onViewChange = (event) => {
    localStorage.setItem("lastView", event)
    setLastView(event)
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <>
      <NavBar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{height: "calc(100vh - 80px)"}}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
