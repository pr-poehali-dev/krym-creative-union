import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const { items, removeItem, duplicateItem, getTotalPrice, getItemCount, applyPromocode, promoCode, discount } = useCart();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleApplyPromo = () => {
    const success = applyPromocode(promoInput);
    if (!success) {
      setPromoError('Такого промокода не существует');
    } else {
      setPromoError('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Icon name="Music" className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold">Объединение Крым</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/dance" className="hover:text-primary transition-colors">
            Танцы
          </Link>
          <Link to="/music" className="hover:text-primary transition-colors">
            Музыка
          </Link>
          <Link to="/media" className="hover:text-primary transition-colors">
            СМИ
          </Link>
          <Link to="/organization" className="hover:text-primary transition-colors">
            Организация
          </Link>
        </nav>

        {getItemCount() > 0 && (
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Icon name="ShoppingCart" size={20} />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                  {getItemCount()}
                </Badge>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-4">
                {items.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    {items.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {item.canDuplicate && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => duplicateItem(item.id)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            )}
                            <span className="text-sm">× {item.quantity}</span>
                          </div>
                          <span className="font-semibold">{item.price * item.quantity}₽</span>
                        </div>
                      </Card>
                    ))}
                    
                    <div className="border-t pt-4 mt-6">
                      <div className="space-y-3 mb-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Введите промокод"
                            value={promoInput}
                            onChange={(e) => {
                              setPromoInput(e.target.value);
                              setPromoError('');
                            }}
                            className="flex-1"
                          />
                          <Button onClick={handleApplyPromo} variant="outline">
                            Применить
                          </Button>
                        </div>
                        {promoError && (
                          <p className="text-sm text-destructive">{promoError}</p>
                        )}
                        {promoCode && (
                          <p className="text-sm text-green-600">Промокод "{promoCode}" применён (-{discount}%)</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        {discount > 0 && (
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Скидка {discount}%:</span>
                            <span>-{Math.round(getTotalPrice() * discount / 100)}₽</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-lg font-bold">
                          <span>Итого:</span>
                          <span>{Math.round(getTotalPrice() * (1 - discount / 100))}₽</span>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4" size="lg" onClick={handleCheckout}>
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};

export default Header;