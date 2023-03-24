interface BagModalProps {
    isClosed: boolean;
}

export default function BagModal({ isClosed }: BagModalProps) {
    return (
        <div className={`o-bag-modal ${isClosed ? 'is-closed' : ''}`}>
            bag modal
        </div>
    );
}
