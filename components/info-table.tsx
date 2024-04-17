import style from "@/styles/info-table.module.css";
import { Bento, BentoCell, BentoTitle } from "./ui/bento";
export const InfoTable = () => {
  return (
    <div
      className={`h-screen min-h-screen bg-gradient-to-br via-primary bg-no-repeat  ${style.info_table_background}`}
    >
      <div className="container h-screen p-5">
        <Bento>
          <BentoCell className={"col-span-2"}>
            <BentoTitle text="I am" />
          </BentoCell>
          <BentoCell className={""}>
            <BentoTitle text="Socials" />
          </BentoCell>
          <BentoCell className={"row-span-2"}>
            <BentoTitle text="Recent Projects" />
          </BentoCell>
          <BentoCell className={"col-span-2"}>
            <BentoTitle text="Current Project" />
          </BentoCell>
          <BentoCell className={"col-span-2"}>
            <BentoTitle text="Current Stack" />
          </BentoCell>
        </Bento>
      </div>
    </div>
  );
};
