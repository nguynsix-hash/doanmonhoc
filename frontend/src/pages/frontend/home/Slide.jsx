import React, { useEffect, useState } from "react";
import BannerServices from "@/services/BannerSevices";
import { API_URL } from "@/services/config";

export default function Slide() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await BannerServices.getAllBanners();
        if (Array.isArray(data)) {
          setBanners(data.slice(0, 4));
        } else {
          console.error("API banner không trả về mảng:", data);
        }
      } catch (error) {
        console.error("Lỗi khi tải banner:", error);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) return null;

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 950,
        margin: "0 auto 32px",
        overflow: "hidden",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        position: "relative",
      }}
    >
      <img
        // ✅ Dùng đúng field từ API
        src={`http://localhost:8080${banners[currentIndex].imageUrl}`}
        alt={banners[currentIndex].title || `Banner ${currentIndex + 1}`}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </section>
  );
}
