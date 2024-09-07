import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

import Modal from "#/components/11Modal/4_r/modal";
import useModal from "#/components/11Modal/4_r/useModal";
import { Carousel } from "#/components/14Carousel/2_r";
// eslint-disable-next-line import/no-cycle
import Reviews, { Image } from "./reviews";

export type GalleryProps = {
  galleryKey: string;
  images: Image[];
  initialIndex: number;
};
export type SetGalleryData = Dispatch<SetStateAction<GalleryProps>>;
const initialGalleryProps: GalleryProps = {
  galleryKey: "",
  images: [],
  initialIndex: 0,
};

function GalleryModal({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  images,
  initialIndex = 0,
  setGalleryData,
}: {
  id: string;
  images: Image[];
  initialIndex: number;
  setGalleryData: SetGalleryData;
}) {
  const { modalRef, openModal, closeModal } = useModal();
  const fullImages = useMemo(
    () => images.map(({ fullsize }) => fullsize),
    [images],
  );

  const onClose = () => {
    setGalleryData(initialGalleryProps);
  };

  useEffect(() => {
    if (images.length) {
      openModal();
    }
  }, [images]);

  return (
    <Modal
      modalRef={modalRef}
      hide={closeModal}
      onClose={onClose}
      hideOnClickOutside
    >
      <Modal.Content>
        <Carousel images={fullImages} initialIndex={initialIndex} />
      </Modal.Content>
    </Modal>
  );
}

function Gallery1() {
  const [galleryData, setGalleryData] =
    useState<GalleryProps>(initialGalleryProps);

  return (
    <>
      <h2>Gallery #1 - Carousel</h2>
      <Reviews setGalleryData={setGalleryData} />
      <GalleryModal
        id={galleryData.galleryKey}
        {...galleryData}
        setGalleryData={setGalleryData}
      />
    </>
  );
}

export default Gallery1;
