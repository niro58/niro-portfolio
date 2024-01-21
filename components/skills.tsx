import { Socials } from "./socials";

export const Skills: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row grow w-full gap-5">
        <div className="w-1/2 text-right  flex flex-col">
          <div className="text-2xl tracking-wide mb-5">
            Skills that I currently improve
          </div>
          <div className="flex flex-col self-end w-1/2 space-y-3 tracking-wide">
            <div className="w-full inline-flex justify-between text-lg">
              <div className="text-blue-300">2024</div>
              <div>React, Next.JS, Typescript, TailwindCSS</div>
            </div>
            <div className="w-full inline-flex justify-between text-lg">
              <div className="text-blue-300">2023 - 2024</div>
              <div>
                AI, ML, Data Structures -
                <span className="text-blue-300 font-bold text-xl"> Python</span>
              </div>
            </div>
            <div className="w-full inline-flex justify-between text-lg">
              <div className="text-blue-300">2023 - 2024</div>
              <span className="text-blue-300 font-bold text-xl">MongoDB</span>
            </div>
            <div className="w-full inline-flex justify-between text-lg">
              <div className="text-blue-300">2023 - 2024</div>
              <div>
                Blazor, ASP.NET -
                <span className="text-blue-300 font-bold text-xl"> C#</span>
              </div>
            </div>
            <div className="w-full inline-flex justify-between text-lg">
              <div className="text-blue-300">2023 - 2024</div>
              <div>
                UI/UX Design -
                <span className="text-blue-300 font-bold text-xl"> Figma</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 border-blue-400" />
        <div className="w-1/2 ">
          <div className="text-2xl tracking-wide mb-5">Archived skills</div>
          <div className="flex flex-col self-end w-1/2 space-y-3 tracking-tight">
            <div className="w-full inline-flex justify-between text-lg">
              <div>Symfony, Twig</div>
              <div className="text-blue-300">2023 - 2023</div>
            </div>
            <div className="w-full inline-flex justify-between text-lg">
              <div>
                <span className="text-blue-300 font-bold text-xl">
                  Blender, Maya{" "}
                </span>
                - 3D Modelling
              </div>
              <div className="text-blue-300">2021 - 2023</div>
            </div>

            <div className="w-full inline-flex justify-between text-lg">
              <div>
                <span className="text-blue-300 font-bold text-xl">
                  SQL, SQLite, MariaDB
                </span>
              </div>
              <div className="text-blue-300">2021 - 2023</div>
            </div>
            <div className="w-full inline-flex justify-between text-lg">
              <div>
                <span className="text-blue-300 font-bold text-xl">C# </span>-
                Unity
              </div>
              <div className="text-blue-300">2021 - 2023</div>
            </div>
          </div>
        </div>
      </div>
      <Socials />
    </div>
  );
};
