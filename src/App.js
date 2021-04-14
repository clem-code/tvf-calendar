import './App.css';
import React, { useState, useEffect } from 'react'
import {
  ChakraProvider, Flex, Button, Box, Editable, EditableInput, EditablePreview
} from "@chakra-ui/react"

function App() {
  //State
  const [month, updateMonth] = useState([])
  const [eventList, updateEventList] = useState([])
  const [newEvent, updateNewEvent] = useState('')
  //Generates an empty April calendar upon loading the page
  useEffect(() => {
    function aprilGen() {
      const april = []
      const events = []
      for (let index = 1; index < 31; index++) {
        april.push(index)
        events.push([])
      }
      console.log(april)
      console.log(events)
      updateMonth(april)
      updateEventList(events)
    }
    aprilGen()
    //Loads saved events from local storage to the calendar
    if (localStorage.getItem('events')) {
      const eventSaved = localStorage.getItem('events')
      const pushToCalendar = eventSaved.split(',')
      updateEventList(pushToCalendar)
    }
  }, [])
  //Handles the input forms on each calendar day 
  function handleChange(event) {
    updateNewEvent(event.target.value)
  }
  //Handles the buttons on each calendar day
  function handleSubmit(indexFunc) {
    const newList = eventList.map((event, index) => {
      //generates a new calendar list with the new event added in
      if (index == indexFunc) {
        return newEvent
      } else {
        return event
      }
    })
    updateEventList(newList)
    //adds updated calendar to local storage
    if (localStorage) {
      localStorage.setItem('events', newList)
    }
  }
  return (
    <ChakraProvider>
      <Flex wrap className="App">
        {month.map((day, index) => {
          return <Box bg={index % 2 === 0 ? "green" : "yellow"} w="50%" p={8} color="black">
            <p>{`April ${index + 1}`}</p>
            <Editable id={index} defaultValue={eventList[index].length > 0 ? `${eventList[index]}` : 'Add an event here'}>
              <EditablePreview />
              <EditableInput id={index} onChange={handleChange} />

            </Editable>
            <Button colorScheme="blue" id={index} onClick={(event) =>
              handleSubmit(event.target.id)}>Save Event</Button>
          </Box>
        })}
      </Flex>
    </ChakraProvider>
  );
}
export default App;
