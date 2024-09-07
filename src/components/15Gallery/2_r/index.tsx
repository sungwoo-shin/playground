/* eslint-disable react/button-has-type */
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import Modal from "#/components/11Modal/4_r/modal";
import useModal from "#/components/11Modal/4_r/useModal";
import LazyImage from "#/components/part1/lazyImage";
import ScrollBox, { ScrollBoxHandle } from "#/components/part1/scrollBox";
import Reviews, { Image } from "../1_r/reviews";
import cx from "../cx";

export type GalleryProps = {
  galleryKey: string;
  images: Image[];
  initialIndex: number;
};
export type SetGalleryData = Dispatch<SetStateAction<GalleryProps>>;
type Zoom = "scaleUp" | "scaleDown";
const initialGalleryProps: GalleryProps = {
  galleryKey: "",
  images: [],
  initialIndex: 0,
};

function GalleryThumbnail({
  thumbnail,
  handleClick,
}: Image & { handleClick?: () => void }) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={cx("thumbnail")} onClick={handleClick}>
      <LazyImage src={thumbnail} width={150} height={80} />
    </div>
  );
}

function GalleryModal({
  images,
  initialIndex = 0,
  setGalleryData,
}: {
  images: Image[];
  initialIndex: number;
  setGalleryData: SetGalleryData;
}) {
  const { modalRef, openModal, closeModal } = useModal();
  const scrollboxRef = useRef<ScrollBoxHandle>();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  const onClose = () => {
    setGalleryData(initialGalleryProps);
    closeModal();
  };

  const handleItemClick = (item: unknown, index: number) => () => {
    setCurrentIndex(index);
    setZoom(1);
    scrollboxRef.current!.scrollFocus(index, "smooth");
  };
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleZoom = (zoom: Zoom) => {
    setZoom((prev) =>
      Math.min(Math.max(prev + (zoom === "scaleUp" ? 1 : -1) * 0.25, 0.5), 2),
    );
  };
  const resetZoom = () => setZoom(1);

  useEffect(() => {
    if (images.length) {
      openModal();
    }
  }, [images]);

  const fullSizeImageUrl = images[currentIndex]?.fullsize || "";

  return (
    <Modal
      className={cx("GalleryModal")}
      modalRef={modalRef}
      hide={onClose}
      hideOnClickOutside
    >
      <Modal.Header hide={onClose} />
      <Modal.Content className={cx("GalleryModalContent")}>
        <div className={cx("Gallery")}>
          <div className={cx("main-view")}>
            <LazyImage
              src={fullSizeImageUrl}
              width={600}
              height={320}
              key={fullSizeImageUrl}
              style={{ transform: `scale(${zoom})` }}
            />
            <div className={cx("zoom-buttons")}>
              <button
                className={cx("zoom-down")}
                onClick={() => handleZoom("scaleDown")}
              >
                -
              </button>
              <button className={cx("current-zoom")} onClick={resetZoom}>
                {Math.round(zoom * 100)}%
              </button>
              <button
                className={cx("zoom-up")}
                onClick={() => handleZoom("scaleUp")}
              >
                +
              </button>
            </div>
          </div>
          <ScrollBox
            wrapperClassName={cx("thumbnails")}
            list={images}
            Item={GalleryThumbnail}
            handleItemClick={handleItemClick}
            currentIndex={currentIndex}
            ref={scrollboxRef}
          />
        </div>
      </Modal.Content>
    </Modal>
  );
}

function Gallery2() {
  const [galleryData, setGalleryData] =
    useState<GalleryProps>(initialGalleryProps);

  return (
    <>
      <h2>Gallery #2 - Viewer</h2>
      <Reviews setGalleryData={setGalleryData} />
      <GalleryModal
        key={galleryData.galleryKey}
        {...galleryData}
        setGalleryData={setGalleryData}
      />
    </>
  );
}

export default Gallery2;
