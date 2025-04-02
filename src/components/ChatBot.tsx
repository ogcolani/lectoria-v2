
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Send, X } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const initialMessage: Message = {
  text: "Bonjour ! Je suis l'assistant Lectoria. Comment puis-je vous aider avec nos livres personnalisés pour enfants ?",
  isUser: false,
  timestamp: new Date(),
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Simuler une réponse de l'IA (à remplacer par une véritable API d'IA)
      setTimeout(() => {
        const botResponses = [
          "Nos livres personnalisés sont créés spécifiquement pour chaque enfant à partir de son prénom et de ses centres d'intérêt.",
          "Vous pouvez créer un livre en seulement 2 minutes ! Il vous suffit de renseigner quelques informations sur votre enfant.",
          "Nous proposons des livres imprimés à 39,99€ et des versions eBook à 9,99€.",
          "La livraison des livres imprimés se fait généralement en 5 à 7 jours ouvrés.",
          "Oui, nous offrons une garantie satisfait ou remboursé si le livre ne vous convient pas.",
          "Chaque histoire est générée par intelligence artificielle et est donc totalement unique.",
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        const botMessage: Message = {
          text: randomResponse,
          isUser: false,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de recevoir une réponse pour le moment.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col h-[450px] transition-all">
          {/* Chat header */}
          <div className="p-3 border-b bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
            <h3 className="font-semibold">Chat Lectoria</h3>
            <p className="text-xs opacity-90">Assistant virtuel</p>
          </div>

          {/* Messages area */}
          <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 block text-right mt-1">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex space-x-1 items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input area */}
          <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !inputValue.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
