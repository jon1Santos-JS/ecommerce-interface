import Link from 'next/link';

interface NavigationBarProps {
    onOpenModal: () => void;
}

export default function NavigationBar({ onOpenModal }: NavigationBarProps) {
    return (
        <nav className="o-navigation-bar">
            <Link className="c-button" href="/">
                Food
            </Link>
            <button className="bag c-button" onClick={onOpenModal}>
                Bag
            </button>
        </nav>
    );
}
