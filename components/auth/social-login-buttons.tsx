import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

export function SocialLoginButtons() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Button variant="outline" type="button" className="w-full">
        <Github className="h-4 w-4" />
        GitHub (UI)
      </Button>
      <Button variant="outline" type="button" className="w-full">
        <Mail className="h-4 w-4" />
        Google (UI)
      </Button>
    </div>
  );
}
