export const TestAnim = () => {
  return (
    <>
      <style jsx>{`
        .circle {
          transition: all 0.5s ease;
        }
        .svg:hover .circle {
          transform: translate(15px, 15px);
        }
        .svg:hover .circle:first-child {
          r: 20;
        }
        .svg:hover .circle:last-child {
          r: 20;
        }
      `}</style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg h-10 w-10"
        viewBox="0 0 50 50"
      >
        <circle cx="10" cy="10" r="10" className="circle fill-primary" />
        <circle cx="25" cy="10" r="10" className="circle fill-primary" />
        <circle cx="40" cy="10" r="10" className="circle fill-primary" />
      </svg>
    </>
  );
};
