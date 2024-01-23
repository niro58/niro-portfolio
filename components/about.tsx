import Image from "next/image";

export const About: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-between p-24 bg-gradient-to-t from-black to-gray-800">
      <div className="container flex flex-row justify-between ">
        <div>
          <Image
            src={"/images/about-me.webp"}
            className="object-cover h-full border-4 border-gray-900 rounded-xl"
            width={600}
            height={600}
            alt="about"
          />
        </div>
        <div className="w-1/2 p-5 space-y-5">
          <div className="text-4xl font-thin tracking-wide text-blue-200">
            About
          </div>
          <div className="text-xl tracking-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            vehicula tellus a gravida efficitur. Praesent lobortis enim in justo
            ultrices eleifend. Cras ut aliquam magna. <br />
            Ut eu blandit libero. Phasellus ultricies ut nisi sit amet gravida.
            Morbi commodo sapien posuere, lacinia leo sed, cursus dui. Nulla
            tortor urna, luctus non suscipit eleifend, laoreet eu velit.
          </div>
        </div>
      </div>
    </div>
  );
};
