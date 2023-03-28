interface BagModalProps {
    isClosed: boolean;
}

export default function BagModal({ isClosed }: BagModalProps) {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`o-bag-modal ${isClosed ? 'is-closed' : ''}`}
        >
            bag modal
        </div>
    );
}
