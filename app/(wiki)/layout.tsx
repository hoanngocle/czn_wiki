import { WikiShell } from "../../components/shell/WikiShell";

export default function CznLayout({ children }: { children: React.ReactNode }) {
  return <WikiShell>{children}</WikiShell>;
}
