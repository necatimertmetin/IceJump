import { useEffect, useState } from "react";

const GRAVITY = 0.1; // Yerçekiminin kuvveti
const JUMP_FORCE = 10; // Zıplama sırasında uygulanan başlangıç kuvveti

export const useGravity = (
  groundRef: React.RefObject<HTMLDivElement>,
  initialPosition: { x: number; y: number }
) => {
  const [position, setPosition] = useState<{ x: number; y: number }>(
    initialPosition
  ); // İlk konumu burada ayarlayın
  const [velocity, setVelocity] = useState<number>(0); // Y yönündeki hız
  const [isGrounded, setIsGrounded] = useState<boolean>(true); // Oyuncunun yerde olup olmadığını kontrol et

  const applyGravity = () => {
    if (!isGrounded) {
      setVelocity((prevVelocity) => prevVelocity + GRAVITY); // Yerçekimi nedeniyle hızı artır
    } else {
      setVelocity(0); // Yerdeyken hızı sıfırla
    }

    setPosition((prevPosition) => {
      const groundLevel =
        groundRef.current?.getBoundingClientRect().top ||
        window.innerHeight + 50; // Yerin konumunu belirle
      const newY = Math.min(prevPosition.y - velocity, groundLevel); // Y pozisyonunu güncelle
      setIsGrounded(newY >= groundLevel); // Yerde olup olmadığını kontrol et
      return { ...prevPosition, y: newY };
    });
  };

  const jump = () => {
    if (isGrounded) {
      setVelocity(-JUMP_FORCE); // Zıplama kuvvetini uygula
      setIsGrounded(false); // Zıpladıktan sonra yerde değil olarak ayarla
    }
  };

  useEffect(() => {
    // Yerçekimi etkisi için oyun döngüsü
    const interval = setInterval(applyGravity, 16); // Yaklaşık 60 FPS

    return () => {
      clearInterval(interval);
    };
  }, [velocity, isGrounded]);

  return { position, jump };
};
