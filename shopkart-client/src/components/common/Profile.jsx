const Profile = ({ user }) => {
  return (
    <div className="w-fit  h-fit flex flex-col justify-start bg-blue-300 text-white items-start gap-2 p-6">
      <img
        src={img}
        alt="customerprofile"
        className=" w-32 h-auto rounded-full border-2 border-yellow-400 mix-blend-multiply "
      />
      <h1 className="w-full h-fit text-xl font-semibold ">
        Name- {user?.name}
      </h1>
      <h2 className="w-full h-fit text-xl font-semibold">
        Email- {user?.email}
      </h2>
      <h3 className="w-full h-fit text-xl font-semibold">
        Phone- {user?.phone}
      </h3>
      <h4 className="w-full h-fit text-xl font-semibold">
        Role-{" "}
        <span className="w-fit h-fit px-2 py-1 bg-green-700 rounded-md">
          {user?.userType.toUpperCase()}
        </span>
      </h4>
    </div>
  );
};

export default Profile;
