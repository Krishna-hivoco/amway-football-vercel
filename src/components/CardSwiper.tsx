import React, { useState, useEffect, useRef } from "react";

// TinderCard Props Interface
interface TinderCardProps {
  children: React.ReactNode;
  onSwipe?: (direction: string) => void;
  className?: string;
  style?: React.CSSProperties;
  swipeThreshold?: number;
  preventSwipe?: string[];
}

// Mock TinderCard component for demo
const TinderCard: React.FC<TinderCardProps> = ({
  children,
  onSwipe,
  className,
  style,
  swipeThreshold,
  preventSwipe,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setCurrentPos({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = (): void => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = swipeThreshold || 100;
    if (Math.abs(currentPos.x) > threshold) {
      const direction = currentPos.x > 0 ? "right" : "left";
      if (onSwipe && !preventSwipe?.includes(direction)) {
        onSwipe(direction);
      }
    }

    setCurrentPos({ x: 0, y: 0 });
  };

  const cardStyle: React.CSSProperties = {
    transform: `translate(${currentPos.x}px, ${currentPos.y}px) rotate(${
      currentPos.x * 0.1
    }deg)`,
    transition: isDragging ? "none" : "transform 0.3s ease",
    ...style,
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={cardStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </div>
  );
};

// Card Data Interface
interface CardData {
  id: string | number;
  title: string;
  content: string;
  color: string;
  icon: string;
  [key: string]: any;
}

// Swipe Result Interface
interface SwipeResult {
  card: CardData;
  direction: string;
  index: number;
}

// Card Swiper Props Interface
interface CardSwiperProps {
  cards: CardData[];
  onSwipe?: (direction: string, cardIndex: number, card: CardData) => void;
  onCardClick?: (cardIndex: number, card: CardData) => void;
  onAllCardsProcessed?: (results: SwipeResult[]) => void;
  renderCard?: (
    card: CardData,
    index: number,
    onClick: () => void
  ) => React.ReactNode;
  className?: string;
  cardClassName?: string;
  swipeThreshold?: number;
  preventSwipe?: string[];
  isLoaded?: boolean;
}

const CardSwiper: React.FC<CardSwiperProps> = ({
  cards = [],
  onSwipe,
  onCardClick,
  onAllCardsProcessed,
  renderCard,
  className = "",
  cardClassName = "",
  swipeThreshold = 100,
  preventSwipe = [],
  isLoaded = true,
}) => {
  const [currentCards, setCurrentCards] = useState<CardData[]>(cards);
  const [results, setResults] = useState<SwipeResult[]>([]);

  useEffect(() => {
    setCurrentCards(cards);
    setResults([]);
  }, [cards]);

  useEffect(() => {
    if (results.length === cards.length && onAllCardsProcessed) {
      onAllCardsProcessed(results);
    }
  }, [results, cards.length, onAllCardsProcessed]);

  const handleCardSwipe = (
    direction: string,
    cardId: string | number
  ): void => {
    const cardIndex = currentCards.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) return;

    const cardData = currentCards[cardIndex];

    setResults((prev) => [
      ...prev,
      { card: cardData, direction, index: cardIndex },
    ]);

    // Remove the card immediately
    setCurrentCards((prevCards) =>
      prevCards.filter((card) => card.id !== cardId)
    );

    if (onSwipe) {
      onSwipe(direction, cardIndex, cardData);
    }
  };

  const handleCardClick = (cardId: string | number): void => {
    const cardIndex = currentCards.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) return;

    const cardData = currentCards[cardIndex];

    if (onCardClick) {
      onCardClick(cardIndex, cardData);
    }

    handleCardSwipe("left", cardId);
  };

  const defaultCardRenderer = (
    card: CardData,
    index: number,
    onClick: () => void
  ): React.ReactNode => (
    <div
      className={`h-full w-full ${card.color} rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-white/20`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="text-6xl mb-6">{card.icon}</div>
        <h2 className="text-2xl font-bold mb-4 text-white">{card.title}</h2>
        <p className="text-lg text-white/90 leading-relaxed">{card.content}</p>
        <div className="mt-8 text-sm text-white/70">
          Click to swipe left • Drag to swipe
        </div>
        <div className="mt-2 text-xs text-white/50">Card ID: {card.id}</div>
      </div>
    </div>
  );

  return (
    <div
      className={`
        w-full
        h-full 
        overflow-hidden
        transition-opacity 
        duration-1000
        ease-in-out
        ${isLoaded ? "opacity-100" : "opacity-0"}
        ${className}
      `}
    >
      <div className="w-full h-full relative">
        {currentCards.map((card, index) => (
          <TinderCard
            className={`absolute w-full h-96 ${cardClassName}`}
            style={{
              zIndex: cards.length - index,
              top: `${index * 10}px`,
              left: `${index * 2}px`,
            }}
            swipeThreshold={swipeThreshold}
            key={card.id}
            onSwipe={(direction: string) => handleCardSwipe(direction, card.id)}
            preventSwipe={preventSwipe}
          >
            <div className="h-full w-full px-4 rounded-xl overflow-hidden">
              {renderCard
                ? renderCard(card, index, () => handleCardClick(card.id))
                : defaultCardRenderer(card, index, () =>
                    handleCardClick(card.id)
                  )}
            </div>
          </TinderCard>
        ))}

        {currentCards.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl text-white p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-2">All Cards Completed!</h2>
            <p className="text-xl opacity-90">
              Great job swiping through all the cards!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              type="button"
            >
              Reset Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Swipe History Interface
interface SwipeHistory {
  direction: string;
  card: string;
}

// Demo Component
const CardSwiperDemo: React.FC = () => {
  const [swipeResults, setSwipeResults] = useState<SwipeHistory[]>([]);

  const dummyCards: CardData[] = [
    {
      id: 1,
      title: "Adventure Awaits",
      content:
        "Discover new places, meet interesting people, and create unforgettable memories on your next journey.",
      color: "bg-gradient-to-br from-blue-500 to-purple-600",
      icon: "🚀",
    },
    {
      id: 2,
      title: "Culinary Delights",
      content:
        "Explore the world of flavors with authentic recipes and cooking techniques from around the globe.",
      color: "bg-gradient-to-br from-orange-500 to-red-600",
      icon: "🍜",
    },
    {
      id: 3,
      title: "Fitness & Health",
      content:
        "Transform your lifestyle with effective workout routines and healthy living tips for a better you.",
      color: "bg-gradient-to-br from-green-500 to-teal-600",
      icon: "💪",
    },
    {
      id: 4,
      title: "Creative Arts",
      content:
        "Unleash your creativity through various art forms, from digital design to traditional painting.",
      color: "bg-gradient-to-br from-pink-500 to-purple-600",
      icon: "🎨",
    },
    {
      id: 5,
      title: "Technology Trends",
      content:
        "Stay updated with the latest tech innovations and learn how they're shaping our future.",
      color: "bg-gradient-to-br from-cyan-500 to-blue-600",
      icon: "💻",
    },
  ];

  const handleSwipe = (
    direction: string,
    cardIndex: number,
    card: CardData
  ): void => {
    console.log(`Swiped ${direction}:`, card.title);
    setSwipeResults((prev) => [...prev, { direction, card: card.title }]);
  };

  const handleAllCardsProcessed = (results: SwipeResult[]): void => {
    console.log("All cards processed:", results);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-8">
      <div className="max-w-md mx-auto h-full">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Card Swiper Demo
          </h1>
          <p className="text-gray-300">
            Click cards or drag to swipe •{" "}
            {dummyCards.length - swipeResults.length} cards remaining
          </p>
        </div>

        <div className="h-5/6">
          <CardSwiper
            cards={dummyCards}
            onSwipe={handleSwipe}
            onAllCardsProcessed={handleAllCardsProcessed}
            swipeThreshold={100}
            isLoaded={true}
          />
        </div>

        {swipeResults.length > 0 && (
          <div className="mt-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="text-white font-semibold mb-2">Swipe History:</h3>
            <div className="max-h-20 overflow-y-auto">
              {swipeResults
                .slice(-3)
                .map((result: SwipeHistory, index: number) => (
                  <div key={index} className="text-sm text-gray-300">
                    {result.direction === "left" ? "👈" : "👉"} {result.card}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardSwiperDemo;
