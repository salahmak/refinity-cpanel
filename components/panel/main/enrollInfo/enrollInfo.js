import Modal from "react-bootstrap/Modal";

export default ({ enroll, close, show, modifyEnroll }) => {
    return (
        <>
            <Modal show={show} onHide={close} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Enrollment info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>{`id: ${enroll.id}`}</li>
                        <li>{`creation date: ${Date(enroll.createdAt)}`}</li>
                        {enroll.status === "accepted" && (
                            <li>{`accept on: ${Date(enroll.acceptedAt)}`}</li>
                        )}
                        <li>{`name: ${enroll.name}`}</li>
                        <li>{`email: ${enroll.email}`}</li>
                        <li>{`status: ${enroll.status}`}</li>
                        <li>{`grade: ${enroll.grade}`}</li>
                        <li>{`geo location: ${enroll.geoLocation}`}</li>
                        <li>{`timezone: ${enroll.timezone}`}</li>
                        <li>{`service: ${enroll.service}`}</li>
                        <li>{`profInterests: ${enroll.profInterests}`}</li>
                        <li>{`funFact: ${enroll.funFact}`}</li>
                        <li>{`subscribed to email list: ${enroll.emailList}`}</li>
                        <li>{`subscibed to tutoring emails: ${enroll.tutoringMails}`}</li>
                        <li>{`subscribed to academic/Svs emails: ${enroll.academicSvsMails}`}</li>
                        <li>{`subscribed to relations emails: ${enroll.relationsMails}`}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={close}>
                        Close
                    </button>
                    <button
                        onClick={() => modifyEnroll("delete", "delete", enroll.id)}
                        type="button"
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                    <button
                        disabled={enroll.status === "accepted"}
                        onClick={() => modifyEnroll("accept", "put", enroll.id)}
                        type="button"
                        className="btn btn-primary"
                    >
                        Accept
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
