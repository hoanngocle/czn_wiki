import {
  ArrowLeftIcon, ArrowRightIcon, ArrowTopRightOnSquareIcon, ArrowsPointingOutIcon,
  Bars3Icon, BookOpenIcon, ChevronRightIcon, GlobeAltIcon, HandRaisedIcon,
  MagnifyingGlassIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, MapIcon,
  MinusIcon, MoonIcon, PencilSquareIcon, PlusIcon, QuestionMarkCircleIcon,
  SparklesIcon, SunIcon, TrashIcon, UserIcon, XMarkIcon,
} from "@heroicons/react/24/outline";

const icons = {
  book: BookOpenIcon, map: MapIcon, search: MagnifyingGlassIcon,
  plus: PlusIcon, minus: MinusIcon, fit: ArrowsPointingOutIcon,
  arrow: ArrowRightIcon, back: ArrowLeftIcon, close: XMarkIcon,
  person: UserIcon, world: GlobeAltIcon, event: SparklesIcon,
  hand: HandRaisedIcon, chevron: ChevronRightIcon, external: ArrowTopRightOnSquareIcon,
  edit: PencilSquareIcon, trash: TrashIcon, help: QuestionMarkCircleIcon,
  contents: Bars3Icon, fontDown: MagnifyingGlassMinusIcon, fontUp: MagnifyingGlassPlusIcon,
  moon: MoonIcon, sun: SunIcon,
};

export function HeroIcon({ name, size = 20 }: { name: keyof typeof icons; size?: number }) {
  const Component = icons[name];
  return <Component width={size} height={size} strokeWidth={1.5} aria-hidden="true" style={{ flexShrink: 0 }} />;
}
