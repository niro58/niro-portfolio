export const Portfolio: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen p-5 bg-black">
      <div className="container text-4xl text-primary tracking-wider pb-16">
        Portfolio
      </div>
      <div className="grid grid-rows-4 grid-flow-col gap-4 min-h-screen">
        <div className="bg-transparent items-center rounded-lg row-span-2 border-2 shadow-md shadow-primary border-primary-foreground">
          <div>img</div>
          <div>
            <div className="text-2xl text-primary">Title</div>
            <div className="text-2xl text-primary"> 2024</div>
          </div>
          <div>descirption</div>
        </div>
        <div className="bg-transparent rounded-lg border-2 shadow-md shadow-primary border-primary-foreground">
          2
        </div>
        <div className="bg-transparent rounded-lg border-2 shadow-md shadow-primary border-primary-foreground">
          3
        </div>
        <div className="bg-transparent rounded-lg row-span-2 border-2 shadow-md shadow-primary border-primary-foreground">
          4
        </div>
        <div className="bg-transparent rounded-lg border-2 shadow-md shadow-primary border-primary-foreground">
          5
        </div>
        <div className="bg-transparent rounded-lg border-2 shadow-md shadow-primary border-primary-foreground">
          1
        </div>
        <div className="bg-transparent rounded-lg border-2 row-span-2 shadow-md shadow-primary border-primary-foreground">
          2
        </div>
        <div className="bg-transparent rounded-lg border-2 shadow-md shadow-primary border-primary-foreground">
          3
        </div>
        <div className="bg-transparent rounded-lg border-2 shadow-md shadow-primary border-primary-foreground">
          4
        </div>
        <div className="bg-transparent rounded-lg border-2 row-span-2 shadow-md shadow-primary border-primary-foreground">
          5
        </div>
        <div className="bg-transparent rounded-lg border-2 shadow-md shadow-primary border-primary-foreground">
          1
        </div>
        <div className="bg-transparent rounded-lg border-2 shadow-md shadow-primary border-primary-foreground">
          1
        </div>
      </div>
    </div>
  );
};
