import { Image } from "react-bootstrap";
import avatar_lu from "../../images/avatar/lu1.jpg";
import avatar_li from "../../images/avatar/li.jpg";
import avatar_lan from "../../images/avatar/lan.jpg";

interface RequestProps {
  id: number;
  user_name: string;
  user_avt: any;
  mutual?: number;
}

const RequestCard = ({ data }: { data: RequestProps }) => {
  const { user_avt, mutual = 10, user_name } = data;
  return (
    <div className="request-card mb-4">
      <div className="profile-pic d-flex gap-3">
        <div className="avatar">
          <Image className="avatar-img" src={user_avt} alt="avatar" />
        </div>
        <div className="text-area">
          <a href="/link">
            <h6 className="mb-2">{user_name}</h6>
          </a>
          <div className="friends-list d-flex gap-3 text-center">
            <ul className="d-flex align-items-center justify-content-center">
              <li>
                <Image src={avatar_lu} alt="image" />
              </li>
              <li>
                <Image src={avatar_li} alt="image" />
              </li>
              <li>
                <Image src={avatar_lan} alt="image" />
              </li>
            </ul>
            <span className="d-center">{mutual} mutual friends</span>
          </div>
        </div>
      </div>
      <div className="d-flex gap-3">
        <button className="btn-accept">Confirm</button>
        <button className="btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default RequestCard;
