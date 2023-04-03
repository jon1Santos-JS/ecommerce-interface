import Image, { ImageLoaderProps } from 'next/image';

interface PreImageProps {
    attributes: { alt: string; src: string; id?: string; blurDataUrl?: string };
    objectFit: 'cover' | 'fill';
}

export default function PreImage({ attributes, objectFit }: PreImageProps) {
    const priority =
        attributes.id && attributes.id === '52855' ? true : undefined;

    return (
        <Image
            loader={imageLoader}
            src={attributes.src}
            blurDataURL={attributes.blurDataUrl && attributes.blurDataUrl}
            style={{ objectFit: objectFit }}
            fill={true}
            alt={attributes.alt}
            priority={priority}
            placeholder={attributes.blurDataUrl ? 'blur' : 'empty'}
            sizes="(max-width: 768px) 100vw,
    (max-width: 1200px) 50vw,
    33vw"
        ></Image>
    );

    function imageLoader({ src, width }: ImageLoaderProps) {
        return `${src}?w=${width}`;
    }
}
