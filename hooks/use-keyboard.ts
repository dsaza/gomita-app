import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export function useKeyboard () {
  const [isOpen, setIsOpen] = useState(false);
  const metrics = Keyboard.metrics();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsOpen(true);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  
  return {
    isOpen,
    metrics
  }
}