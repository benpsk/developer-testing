const generateNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const imageUrl = (() => {
    const urls = [
      "https://images.unsplash.com/photo-1717416698658-59ca65071a84?auto=format&q=75&fit=crop&w=600",
      "https://images.unsplash.com/photo-1717501219008-5f436ead74d5?auto=format&q=75&fit=crop&w=600",
      "https://images.unsplash.com/photo-1718111990329-cfe23a502e06?auto=format&q=75&fit=crop&w=600",
      "https://images.unsplash.com/photo-1715880005923-0013a6820a72?auto=format&q=75&fit=crop&w=600",
      "https://images.unsplash.com/photo-1716117274929-875f37a83fe5?auto=format&q=75&fit=crop&w=600",
    ];
    const usedUrls = new Map<number, Set<string>>();
    const getRandomUrl = (x: number): string | null => {
      const availableUrls = urls.filter(url => !usedUrls.get(x)?.has(url));
      const randomIndex = Math.floor(Math.random() * availableUrls.length);
      if (availableUrls.length === 0) {
        return urls[randomIndex];
      }
      return availableUrls[randomIndex];
    };
  
    return (x: number): string => {
      if (!usedUrls.has(x)) {
        usedUrls.set(x, new Set());
      }
      const url = getRandomUrl(x);
      if (url) {
        usedUrls.get(x)!.add(url);
        return url;
      }
  
      return 'URLs';
    };
  })();

export { generateNumber, imageUrl };