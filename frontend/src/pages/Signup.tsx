import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export function Signup() {
  return (
    <div className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
      <Auth type="signup" />
      <Quote />
    </div>
  );
}
