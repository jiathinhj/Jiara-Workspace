import { Image } from "react-bootstrap";

import Action from "../../../actions/action";
import { CONTACT_ACTION } from "../../../../data/actionsData";

interface ContactProps {
  user_name: string;
  user_avt: any;
}

const SingleContact = ({ data }: { data: ContactProps }) => {
  const { user_avt, user_name } = data;

  return (
    <div className="contact-card d-flex justify-content-between mb-4">
      <div className="avatar-item d-flex gap-3 align-items-center">
        <div className="avatar-item">
          <Image className="avatar-img" src={user_avt} alt="avatar" />
        </div>
        <div className="info-area">
          <h6 className="m-0">
            <a href="/link" className="mdtxt">
              {user_name}
            </a>
          </h6>
        </div>
      </div>
      {/* Contact Action */}
      <Action actionList={CONTACT_ACTION} />
    </div>
  );
};



export default SingleContact;
