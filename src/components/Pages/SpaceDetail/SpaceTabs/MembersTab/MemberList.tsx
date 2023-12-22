import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../../../Avatar";
import {
  Button,
  Avatar as MTAvatar,
  Typography,
} from "@material-tailwind/react";
import useAllAccounts from "../../../../Hooks/useAllAccounts";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";

const MemberList = ({ data, type, onRemoveMember }: any) => {
  const isManager = useSelector((state: any) => state.group.isManager);
  const [memberData, setMemberData] = useState<Object[]>([]);

  const handleMapInfo = (res: any) => {
    let newData: Object[] = [];
    data &&
      data.forEach((element: any) => {
        const fullInfo = {
          username: element,
          info: res.find((account: any) => account.username === element),
        };
        newData.push(fullInfo);
      });
    setMemberData(newData);
  };
  const { data: allUser } = useAllAccounts(handleMapInfo);

  useEffect(() => {}, [data]);
  return (
    <List>
      {memberData && memberData.length ? (
        memberData.map(({ username, info }: any) => (
          <ListItem key={username}>
            <ListItemPrefix>
              {info.avatarUrl ? (
                <MTAvatar variant="circular" src={info.avatarUrl} />
              ) : (
                <Avatar firstname={info.firstname} lastname={info.lastname} />
              )}
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {info.username}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Software Engineer @ Material Tailwind
              </Typography>
              {isManager && type === "members" ? (
                <Typography onClick={() => onRemoveMember(info.username)}>
                  Remove member
                </Typography>
              ) : null}
            </div>
          </ListItem>
        ))
      ) : (
        <Typography className="text-blue-gray-900 text-sm text-center italic">
          No one here
        </Typography>
      )}
    </List>
  );
};

export default MemberList;
