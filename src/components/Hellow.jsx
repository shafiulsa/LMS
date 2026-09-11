"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Hellow = () => {
  const handleClick = () => {
    toast("Hello! 👋");
  };

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <Button onClick={handleClick}>
        Click Me
      </Button>
    </div>
  );
};

export default Hellow;