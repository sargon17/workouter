"use client";
import { Button } from "../ui/button";

export default function VibrateButton() {
  return (
    <Button
      variant="secondary"
      className="absolute bottom-2 right-2"
      onClick={() => {
        navigator.vibrate([200, 800, 200, 800, 200, 800, 200, 800, 200, 800]);
      }}
    >
      Vibrate
    </Button>
  );
}
