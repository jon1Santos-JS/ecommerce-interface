import Link from 'next/link';

interface NavigationBarProps {
    onOpenBagModal: () => void;
    onCloseBagModal: () => void;
    isBagModalOpen: boolean;
    totalItems: number;
}

export default function NavigationBar({
    onOpenBagModal,
    onCloseBagModal,
    isBagModalOpen,
    totalItems,
}: NavigationBarProps) {
    return (
        <nav className="o-navigation-bar l-primary-style">
            <Link className="c-button" href="/">
                Food
            </Link>
            <button
                className="bag c-button"
                onClick={() =>
                    isBagModalOpen ? onCloseBagModal() : onOpenBagModal()
                }
            >
                Bag
                {totalItems > 0 ? (
                    <span className="items-quantity l-secondary-style">
                        {totalItems}
                    </span>
                ) : null}
            </button>
        </nav>
    );
}
