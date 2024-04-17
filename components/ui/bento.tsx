import React from "react";

type BentoProps = {
  children?: React.ReactNode;
};

export const Bento: React.FC<BentoProps> = ({ children }) => {
  return <div className="grid h-full grid-cols-3 gap-5">{children}</div>;
};

type BentoCellProps = {
  children?: React.ReactNode;
  className?: string;
};
export const BentoCell: React.FC<BentoCellProps> = ({
  children,
  className
}) => {
  return (
    <div className={`rounded-lg border border-primary/50 p-3 ${className}`}>
      {children}
    </div>
  );
};
type BentoTitleProps = {
  text: string;
};
export const BentoTitle: React.FC<BentoTitleProps> = ({ text }) => {
  return <div>{text}</div>;
};
