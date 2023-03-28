import BagModal from '@/components/BagModal';
import NavigationBar from '@/components/NavigationBar';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import '../styles/sass/index.scss';

export default function App({ Component, pageProps }: AppProps) {
    const [isBagModalClosed, setOnCloseBagModal] = useState(true);

    if (pageProps.statusCode === 404) return <Component {...pageProps} />;

    return (
        <div
            className="o-app"
            onClick={() => {
                !isBagModalClosed && setOnCloseBagModal(true);
            }}
        >
            <NavigationBar onOpenModal={onOpenModal} />
            <div
                className={`close-modals ${
                    isBagModalClosed ? 'is-closed' : ''
                }`}
            ></div>
            <Component {...pageProps} />
            <BagModal isClosed={isBagModalClosed} />
        </div>
    );

    function onOpenModal() {
        setOnCloseBagModal(false);
    }
}
