import { Modal, Image } from 'antd';
import { useState } from 'react';

function AllImagesPreviews({ item }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = item.storeImages || [];

    const openModal = (index = 0) => {
        setCurrentIndex(index);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentIndex(0);
    };
    return (
        <>
            <td>
                {images.length > 0 ? (
                    <a onClick={() => openModal(0)} style={{cursor:"pointer"}}>View Image{images.length > 1 ? "s" : ""}</a>
                ) : (
                    "-"
                )}
            </td>

            <Modal
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800}
                centered
            >
                {images.length === 1 ? (
                    <Image src={images[0]} width="100%" />
                ) : (
                    <>
                        <div style={{ textAlign: 'center' }}>
                            <Image src={images[currentIndex]} width="100%" height={"400px"} style={{width:"100%",height:"400px", objectFit:"contain"}} />
                            <div style={{ marginTop: 16 }}>
                                <button
                                    onClick={() =>
                                        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
                                    }
                                >
                                    ◀️
                                </button>
                                <span style={{ margin: '0 16px' }}>
                                    {currentIndex + 1} / {images.length}
                                </span>
                                <button
                                    onClick={() =>
                                        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
                                    }
                                >
                                    ▶️
                                </button>
                            </div>
                        </div>

                        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 8 }}>
                            {images.map((img, index) => (
                                <Image
                                    key={index}
                                    src={img}
                                    width={100}
                                    height={100}
                                    style={{ cursor: 'pointer', objectFit: 'cover' }}
                                    onClick={() => setCurrentIndex(index)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
}

export default AllImagesPreviews