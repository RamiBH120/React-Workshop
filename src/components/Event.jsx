import { useState } from "react";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteEvent } from "../service/api";

function Event(props) {
  const [event, setEvent] = useState(props.event);

  const navigate = useNavigate();

  const buy = () => {
    props.showAlert();
    setEvent((prevEvent) => ({
      ...prevEvent,
      nbParticipants: prevEvent.nbParticipants + 1,
      nbTickets: prevEvent.nbTickets - 1,
    }));
  };

  const handleLike = () => {
    setEvent((eventPrev) => ({
      ...eventPrev,
      like: !eventPrev.like,
    }));
  };

  const deleteItem = async () => {
    try {
      const respo = await deleteEvent(props.event.id);
      console.log(respo);
      console.log("deleteItem");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <NavLink to={`/events/details/${event.id}`}>
          <Card.Img
            variant="top"
            src={`images/${event.nbTickets ? event.img : "sold_out.png"}`}
          />
        </NavLink>

        <Card.Body>
          <Card.Title>{event.name} </Card.Title>
          <Card.Text>Price : {event.price}</Card.Text>
          <Card.Text>Number of tickets :{event.nbTickets}</Card.Text>
          <Card.Text>Number of participants :{event.nbParticipants}</Card.Text>
          <Button variant="info" className="mx-2" onClick={handleLike}>
            {event.like ? "Dislike" : "Like"}
          </Button>
          <Button
            variant="primary"
            disabled={event.nbTickets ? false : true}
            onClick={buy}
          >
            Book an event
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              props.deleteEvent(event.id);
            }}
          >
            Delete Event
          </Button>
          <Nav.Link as={NavLink} to={`edit/${event.id}`}>
            <Button variant="secondary">Edit Event</Button>
          </Nav.Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default Event;
