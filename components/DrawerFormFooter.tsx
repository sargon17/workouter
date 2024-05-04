import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";

function DrawerFormFooter({
  closeRef,
  onSubmit,
}: {
  closeRef: React.RefObject<HTMLButtonElement>;
  onSubmit?: () => void;
}) {
  return (
    <DrawerFooter>
      <div className="flex gap-2 justify-end">
        <DrawerClose>
          <Button
            type="button"
            variant={"ghost"}
            size={"sm"}
            ref={closeRef}
          >
            Cancel
          </Button>
        </DrawerClose>
        <Button
          type="submit"
          size={"sm"}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </DrawerFooter>
  ) as JSX.Element;
}

export { DrawerFormFooter };
