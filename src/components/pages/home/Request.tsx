import contactData from "../../../data/contactData";
import RequestCard from "../../cards/RequestCard";

const Request = () => {
  return (
    <>
      <div className="request mb-4">
        <h6 className="d-inline-flex position-relative">
          Request
          <span className="mdtxt abs-area d-center position-absolute">2</span>
        </h6>
      </div>
      <div className="d-grid gap-6">
        {/* Request Card */}
        {contactData.slice(0, 2).map((itm) => (
          <RequestCard key={itm.id} data={itm} />
        ))}
      </div>
    </>
  );
};

export default Request;
