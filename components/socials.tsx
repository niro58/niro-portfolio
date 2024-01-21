import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { BsDiscord, BsGithub, BsLinkedin, BsMailbox } from "react-icons/bs";

export const Socials: React.FC = () => {
  return (
    <div className="mt-56">
      <div className="container border-2 border-blue-300 border-opacity-20 rounded-lg p-5 flex flex-row justify-between ">
        <div>
          <a className="gap-2 flex flex-col items-center hover:bg-blue-300 hover:bg-opacity-15 hover:cursor-pointer rounded-md  p-5">
            <BsDiscord size={36} />
            <div className="border-t-2 border-t-blue-400 h-2 w-32"></div>
            <div>niro58</div>
          </a>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/nichita-roilean-2b4673241/"
            className="gap-2 flex flex-col items-center hover:bg-blue-300 hover:bg-opacity-15 hover:cursor-pointer rounded-md  p-5"
          >
            <BsLinkedin size={36} />{" "}
            <div className="border-t-2 w-32 border-t-blue-400 h-2"></div>
            <div>Nichita Roilean</div>
          </a>
        </div>
        <div>
          <a className="gap-2 flex flex-col items-center hover:bg-blue-300 hover:bg-opacity-15 hover:cursor-pointer rounded-md  p-5">
            <BsGithub size={36} />{" "}
            <div className="border-t-2 w-32 border-t-blue-400 h-2"></div>
            <div>niro58</div>
          </a>
        </div>
        <div>
          <a className="gap-2 flex flex-col items-center hover:bg-blue-300 hover:bg-opacity-15 hover:cursor-pointer rounded-md  p-5">
            <EnvelopeIcon height={36} />
            <div className="border-t-2 w-32 border-t-blue-400 h-2"></div>
            <div>niro.dev@gmail.com</div>
          </a>
        </div>
      </div>
    </div>
  );
};
