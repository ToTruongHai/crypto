import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { isEmpty } from "@/ultis/helpers";
import UserInterface from "@/components/UserInterface";

type Props = {};

const UserActions = (props: Props) => {
  const [userLogin, setUserLogin] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("id");
    if (data) setUserLogin(data);
  }, []);

  const handleLogout = () => {
    const data = localStorage.getItem("id");
    if (data) {
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
      return setUserLogin(null);
    }
  };

  const renderUser = useMemo(() => {
    const isHaveUser = !isEmpty(userLogin);

    if (isHaveUser)
      return <UserInterface handleLogout={handleLogout} userInfo={userLogin} />;
    return (
      <>
        <Link href={"/login"}>Sign in</Link>
        <Link href={"/register"}>Sign up</Link>
      </>
    );
  }, [userLogin]);

  return (
    <div className="flex gap-5 text-white">
      {renderUser}

      {/* <ThemeSwitch /> */}
    </div>
  );
};

export default UserActions;
