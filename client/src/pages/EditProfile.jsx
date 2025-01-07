import React from "react";
import EditProfileForm from "../components/EditProfileForm";
import { useParams } from "react-router-dom";

function EditProfile() {
  const { userId } = useParams();
  console.log("Edit User Id:", userId);
  return <EditProfileForm  />; //userId={userId}
}

export default EditProfile;
