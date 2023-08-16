import React from "react";

import contactData from "../../../../data/contactData";
import SingleContact from "./singleContact";

const Contact = () => {
  return (
    <>
      <div className="contact mb-4">
        <h5>Online Contact</h5>
      </div>
      <div className="d-flex flex-column gap-6">
        {contactData?.map((itm) => (
          <div
            key={itm.id}
            className="profile-area d-center justify-content-between"
          >
            {/* Single Contact*/}
            <SingleContact data={itm} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Contact;
