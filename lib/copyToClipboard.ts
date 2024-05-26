import { toast } from "sonner";

export default function copyToCliboard(text: string) {
  navigator.clipboard.writeText(text);
  toast.success("Email copied to clipboard");
}
