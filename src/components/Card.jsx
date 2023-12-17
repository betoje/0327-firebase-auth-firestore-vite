// React Bootstrap
import { Button, Container } from "react-bootstrap";
// Styles
import "./Card.css";

export default function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card text-center m-4 " + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "18rem" }}>
      <div className="card-header text-ligth">
        <h4>
          <strong>
            {props.header1}
            {props.headerValue1}
          </strong>
        </h4>
        <div>
          {props.header2}
          {props.header2Value}
        </div>
        {props.header3 ? (
          <Button disabled={true} className="bg-light text-dark">
            {props.header3}
            {props.header3Value}
          </Button>
        ) : (
          <></>
        )}
      </div>
      <div className="card-body">
        {props.title && (
          <h5 className={"card-title text-" + props.txtcolor2}>
            {props.title}
          </h5>
        )}
        {props.text && (
          <p className={"card-text text-" + props.txtcolor2}>{props.text}</p>
        )}
        {props.body}
        {props.status && (
          <Container className="mt-2">
            <div id="createStatus" className="text-warning">
              {props.status}
            </div>
          </Container>
        )}
      </div>
    </div>
  );
}