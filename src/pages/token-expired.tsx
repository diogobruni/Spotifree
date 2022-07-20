import { AiOutlineMail } from "react-icons/ai";

export default function TokenExpired() {

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full gap-8">
      <p className="text-zinc-400 text-center text-lg">
        The Spotify access token has expired.
        <br />
        Please ask the developer to update it.
      </p>

      <a
        className="flex items-center justify-center gap-2 bg-zinc-900 rounded-md border border-green-500 px-3 py-2 relative text-green-500 shadow-lg hover:shadow-green-900 transition"
        href="mailto:diogobruni@gmail.com"
      >
        <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>

        <AiOutlineMail
          className="w-5 h-6"
        />

        <span className="text-xs font-semibold ">
          Contact me
        </span>
      </a>
    </div>
  )
}