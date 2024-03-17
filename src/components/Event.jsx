import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { deleteEventReducer } from "../redux/slices/eventsSlice";
import { addWishlist, deleteEvent } from "../service/api";
import { addWishlistReducer } from "../redux/slices/wishlistSlice";

function Event(props) {
  const [event, setEvent] = useState(props.event);

  const dispatch = useDispatch();

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

  const handleDelete = async () => {
    try {
      const resp = await deleteEvent(event.id);
      dispatch(deleteEventReducer(event.id));
      if (resp.status === 200) {
        console.log("deleted successfully! ");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToWishlist = async () => {
    try {
      const resp = await addWishlist(event);
      dispatch(addWishlistReducer(event));

      if (resp.status === 201) {
        alert("event added successfully to your wishlist!");
      }
    } catch (err) {
      console.log(err);
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

          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>

          <Button variant="warning">
            <Link to={`/events/update/${event.id}`}>Update</Link>
          </Button>

          <Button variant="success" onClick={addToWishlist}>
            ADD TO WISHLIST
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default Event;
