import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Media = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [extraCopies, setExtraCopies] = useState(0);

  const handleAddPhotographer = () => {
    addItem({
      id: 'photographer',
      name: 'Фотограф - Олег (всё мероприятие)',
      price: 4000,
      quantity: 1
    });
  };

  const handleAddArticle = () => {
    addItem({
      id: 'article',
      name: 'Статья о мероприятии - Юлия (3 экземпляра)',
      price: 5000,
      quantity: 1
    });
  };

  const handleAddExtraCopy = () => {
    const newCount = extraCopies + 1;
    setExtraCopies(newCount);
    addItem({
      id: `article-extra-${Date.now()}`,
      name: 'Дополнительный экземпляр газеты',
      price: 1000,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
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
          <h1 className="text-4xl font-bold text-orange-900 mb-4">СМИ</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Раздел СМИ поможет оставить воспоминания о вашем мероприятии
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white">
              <CardTitle className="text-2xl">Фотограф</CardTitle>
              <CardDescription className="text-orange-100">
                Олег
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <img 
                    src="https://cdn.poehali.dev/projects/f418c636-8ece-4d06-bd3f-a2b44ec3ba89/files/da397184-6510-4ec9-a184-d8d46c037751.jpg"
                    alt="Фотограф Олег"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      Всё мероприятие
                    </Badge>
                    <p className="text-3xl font-bold text-orange-600">4 000 ₽</p>
                  </div>
                  <p className="text-gray-600">
                    Мастер своего дела, который уже много лет делает потрясающие снимки
                  </p>
                  <Button 
                    onClick={handleAddPhotographer}
                    className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
                    size="lg"
                  >
                    <Icon name="Camera" className="mr-2" size={20} />
                    Заказать
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
              <CardTitle className="text-2xl">Статья</CardTitle>
              <CardDescription className="text-yellow-100">
                Юлия
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <img 
                    src="https://cdn.poehali.dev/projects/f418c636-8ece-4d06-bd3f-a2b44ec3ba89/files/7a5d6c89-dba8-4402-934c-8285eb126456.jpg"
                    alt="Журналист Юлия"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      3 экземпляра
                    </Badge>
                    <p className="text-3xl font-bold text-orange-600">5 000 ₽</p>
                  </div>
                  <p className="text-gray-600">
                    Профессиональный журналист с огромным опытом работы в СМИ напишет 
                    памятную статью о вашем мероприятии
                  </p>
                  <Button 
                    onClick={handleAddArticle}
                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                    size="lg"
                  >
                    <Icon name="Newspaper" className="mr-2" size={20} />
                    Заказать
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Icon name="Plus" size={24} className="text-orange-600" />
                Дополнительно
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">+ 1 экземпляр газеты</h3>
                  <p className="text-2xl font-bold text-orange-600">1 000 ₽</p>
                </div>
                <div className="text-right">
                  {extraCopies > 0 && (
                    <Badge variant="outline" className="mb-2">
                      Добавлено: {extraCopies} шт.
                    </Badge>
                  )}
                  <Button 
                    onClick={handleAddExtraCopy}
                    variant="outline"
                    className="border-orange-600 text-orange-600 hover:bg-orange-50"
                  >
                    <Icon name="Plus" className="mr-2" size={16} />
                    Добавить экземпляр
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

export default Media;