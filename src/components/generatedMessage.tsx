export default function GeneratedMessage(props: { message: string }) {
  return (
    <div className="flex mb-6 ml-6">
      <div className="w-12 h-12 bg-[#D9D9D9] rounded-full mr-4"></div>
      <div className="bg-white text-black p-4 rounded-md max-w-[50%]">
        {props.message}
      </div>
    </div>
  );
}
