

export default function User(props) {

  return (
    <>
      <div className=" shadow-xl w-full lg:max-w-full lg:flex my-3">
        <div className=" w-full border-1 border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8 ">
            <div className="text-gray-900 font-bold text-xl mb-2">
              {props.user.full_name}
            </div>
            <p className="text-gray-700 text-base">
              First Name : {props.user.first_name}
            </p>
            <p className="text-gray-700 text-base">
              Last Name : {props.user.last_name}
            </p>
            <p className="text-gray-700 text-base">
              Age : {props.user.age}
            </p>
            <p className="text-gray-700 text-base">
              Gender : {props.user.gender}
            </p>
          </div>
          <div className="flex items-center">
            <div className="text-sm">
                <p className="text-gray-600">Number of messages : {props.user.number_of_messages}</p>
                <p className="text-gray-600">{props.user.creation_date}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
