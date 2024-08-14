import { logout } from "@/actions/action";
import { RiLogoutBoxLine } from "react-icons/ri";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        await logout();
      }}
    >
      <button
        type="submit"
        className="text-sm text-black hidden lg:block"
       
      >
      <RiLogoutBoxLine  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/> 
      </button>
    </form>
  );
}