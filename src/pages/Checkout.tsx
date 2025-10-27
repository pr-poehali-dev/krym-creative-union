import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, discount, promoCode, clearCart } = useCart();
  const [contactType, setContactType] = useState<'telegram' | 'phone'>('telegram');
  const [formData, setFormData] = useState({
    eventDate: '',
    eventLocation: '',
    eventTime: '',
    contact: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const finalPrice = Math.round(getTotalPrice() * (1 - discount / 100));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/b247850a-2031-4ac4-bae9-c1651f3935d7', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          contactType,
          items: items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            category: item.category,
          })),
          promoCode: promoCode || null,
          discount,
          totalPrice: finalPrice,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setOrderId(data.orderId);
        clearCart();
      }
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <Card className="max-w-md mx-auto p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Заявка №{orderId}</h2>
            <p className="text-lg text-muted-foreground mb-6">принята в работу</p>
            <p className="text-sm text-muted-foreground mb-6">
              Мы свяжемся с вами в ближайшее время через указанный контакт
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              Вернуться на главную
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <Card className="max-w-md mx-auto p-8 text-center">
            <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Корзина пуста</h2>
            <p className="text-muted-foreground mb-6">Добавьте услуги для оформления заказа</p>
            <Button onClick={() => navigate('/')}>На главную</Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-6">Оформление заказа</h1>
            
            <Card className="p-6 mb-6">
              <h3 className="font-semibold mb-4">Ваш заказ</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">{item.price * item.quantity}₽</span>
                  </div>
                ))}
              </div>
              
              {discount > 0 && (
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Промокод "{promoCode}" (-{discount}%)</span>
                    <span>-{Math.round(getTotalPrice() * discount / 100)}₽</span>
                  </div>
                </div>
              )}
              
              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                <span>Итого:</span>
                <span>{finalPrice}₽</span>
              </div>
            </Card>
          </div>

          <Card className="p-6 h-fit">
            <h3 className="font-semibold mb-6">Данные мероприятия</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="eventDate">Дата мероприятия</Label>
                <Input
                  id="eventDate"
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="eventLocation">Место проведения</Label>
                <Input
                  id="eventLocation"
                  placeholder="Адрес или название площадки"
                  required
                  value={formData.eventLocation}
                  onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="eventTime">Время проведения</Label>
                <Input
                  id="eventTime"
                  type="time"
                  required
                  value={formData.eventTime}
                  onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                />
              </div>

              <div>
                <Label className="mb-3 block">Способ связи</Label>
                <div className="flex gap-4 mb-3">
                  <button
                    type="button"
                    onClick={() => setContactType('telegram')}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                      contactType === 'telegram'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    Telegram
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactType('phone')}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                      contactType === 'phone'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    Мобильная связь
                  </button>
                </div>
                <Input
                  placeholder={
                    contactType === 'telegram' 
                      ? '@username или номер телефона'
                      : '+7 (___) ___-__-__'
                  }
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;