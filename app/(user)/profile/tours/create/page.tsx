import { Button } from "@/components/ui/button";

const CreatePage = () => {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex justify-between space-y-4">
        <div>
          <h1 className="text-xl font-semibold">New Tour</h1>
          <p className="text-muted-foreground text-xs">Create new Tour.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={"secondary"}>Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
