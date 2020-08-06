import Modal from "react-bootstrap/Modal";
import Alert from "../../../alert/alert.js";
import Loading from "../../../loading/spinner.js";

export default ({ enroll, close, show, modifyEnroll, alert, acceptLoading, deleteLoading }) => {
    return (
        <>
            <Modal size="lg" show={show} onHide={close} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Enrollment info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {alert.display && <Alert alert={alert} />}
                    <ul>
                        <li>{`id: ${enroll.id}`}</li>
                        <li>{`created on: ${new Date(enroll.createdAt)}`}</li>
                        {enroll.status === "accepted" && (
                            <li>{`accepted on: ${new Date(enroll.acceptedAt)}`}</li>
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
                        disabled={acceptLoading || deleteLoading}
                        style={{ minHeight: "38px" }}
                        onClick={() => modifyEnroll("delete", "delete", enroll.id)}
                        type="button"
                        className="btn btn-danger"
                    >
                        {deleteLoading ? <Loading /> : "Delete"}
                    </button>
                    <button
                        style={{ minHeight: "38px" }}
                        disabled={enroll.status === "accepted" || acceptLoading || deleteLoading}
                        onClick={() => modifyEnroll("accept", "put", enroll.id)}
                        type="button"
                        className="btn btn-primary"
                    >
                        {acceptLoading ? <Loading /> : "Accept"}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
