export default function UserMessage(props: { message: string }) {
  return (
    <div className="flex mb-6 mr-6">
      <div className="ml-auto bg-[#4B86F8] text-white p-4 rounded-md max-w-[50%]">
        {props.message}
      </div>
    </div>
  );
}
