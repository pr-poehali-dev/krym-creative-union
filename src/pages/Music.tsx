import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Music = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [extraHours, setExtraHours] = useState(0);

  const handleAddMainService = () => {
    addItem({
      id: 'saxophone-main',
      name: 'Чарующий саксофон - Мария Калиева (1 час)',
      price: 4000,
      quantity: 1
    });
  };

  const handleAddExtraHour = () => {
    const newCount = extraHours + 1;
    setExtraHours(newCount);
    addItem({
      id: `saxophone-extra-${Date.now()}`,
      name: 'Чарующий саксофон - дополнительный час',
      price: 3000,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <Icon name="ArrowLeft" className="mr-2" size={20} />
          На главную
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Музыка</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Вы можете выбрать жанр и посмотреть видео обзор на исполнителя. 
            По умолчанию время исполнения — 1 час
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardTitle className="text-2xl">Чарующий саксофон</CardTitle>
              <CardDescription className="text-purple-100">
                Мария Калиева
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <img 
                    src="https://cdn.poehali.dev/projects/f418c636-8ece-4d06-bd3f-a2b44ec3ba89/files/b46020c1-4204-42ed-8ec7-3ab988a386b8.jpg"
                    alt="Мария Калиева - саксофонистка"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      1 час выступления
                    </Badge>
                    <p className="text-3xl font-bold text-purple-600">4 000 ₽</p>
                  </div>
                  <p className="text-gray-600">
                    Профессиональное выступление с саксофоном для вашего мероприятия
                  </p>
                  <Button 
                    onClick={handleAddMainService}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    size="lg"
                  >
                    <Icon name="ShoppingCart" className="mr-2" size={20} />
                    Заказать
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Icon name="Plus" size={24} className="text-purple-600" />
                Дополнительно
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">+ Час игры</h3>
                  <p className="text-2xl font-bold text-purple-600">3 000 ₽</p>
                  <p className="text-sm text-gray-500">На 1000₽ меньше чем первый час</p>
                </div>
                <div className="text-right">
                  {extraHours > 0 && (
                    <Badge variant="outline" className="mb-2">
                      Добавлено: {extraHours} ч.
                    </Badge>
                  )}
                  <Button 
                    onClick={handleAddExtraHour}
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    <Icon name="Plus" className="mr-2" size={16} />
                    Добавить час
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Music;