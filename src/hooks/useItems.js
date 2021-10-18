import { useState } from 'react';

export function useItems() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  return [items, loaded];
}
