import { WikiShell } from "../../components/shell/WikiShell";

export const metadata = {
  title: "CZN Wiki | Nhân vật",
  description: "Tra cứu nhân vật và hướng dẫn Chaos Zero Nightmare bằng tiếng Việt",
};

export default function CznLayout({ children }: { children: React.ReactNode }) {
  return <WikiShell>{children}</WikiShell>;
}
