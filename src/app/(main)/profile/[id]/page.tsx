import Profile from "@/modulars/Profile";
import React from "react";

type Props = {
  params?: any;
};

const ProfileDetail = ({ params }: Props) => {
  return <Profile params={params} />;
};

export default ProfileDetail;
