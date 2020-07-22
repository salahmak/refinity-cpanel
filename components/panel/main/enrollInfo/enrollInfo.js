export default ({ enroll, close }) => {
    return (
        <div
            className="modal"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            {enroll.name}
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={close}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ul>
                            <li>{`id: ${enroll.id}`}</li>
                            <li>{`date: ${enroll.date}`}</li>
                            <li>{`name: ${enroll.name}`}</li>
                            <li>{`email: ${enroll.email}`}</li>
                            <li>{`status: ${enroll.status}`}</li>
                            <li>{`grade: ${enroll.grade}`}</li>
                            <li>{`geoLocation: ${enroll.geoLocation}`}</li>
                            <li>{`timezone: ${enroll.timezone}`}</li>
                            <li>{`service: ${enroll.service}`}</li>
                            <li>{`profInterests: ${enroll.profInterests}`}</li>
                            <li>{`funFact: ${enroll.funFact}`}</li>
                            <li>{`subscribed to email list: ${enroll.emailList}`}</li>
                            <li>{`subscibed to tutoring emails: ${enroll.tutoringMails}`}</li>
                            <li>{`subscribed to academic/Svs emails: ${enroll.academicSvsMails}`}</li>
                            <li>{`subscribed to relations emails: ${enroll.relationsMails}`}</li>
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={close}
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary">
                            Understood
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
