import contactData from "../../../data/contactData";
import RequestCard from "../../cards/request";

const Request = () => {
  return (
    <>
      <div className="request d-flex mb-4 gap-1">
        <h5>Request</h5>
        <span className="abs-area d-center">2</span>
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
