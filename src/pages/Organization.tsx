import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Organization = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleAddService = () => {
    addItem({
      id: 'full-organization',
      name: 'Полная организация мероприятия',
      price: 100000,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
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
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">Организация мероприятий</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Свадьба, день рождения или корпоратив
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-3xl text-center">
                Полная организация мероприятия
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border-2 border-indigo-100">
                  <p className="text-lg text-gray-700 mb-6 text-center">
                    Наше объединение может подготовить мероприятие любого масштаба — 
                    от помощи с выбором места до декорирования
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-indigo-50 rounded-lg">
                      <Icon name="MapPin" size={32} className="mx-auto mb-2 text-indigo-600" />
                      <p className="font-semibold">Выбор места</p>
                    </div>
                    <div className="text-center p-4 bg-indigo-50 rounded-lg">
                      <Icon name="Users" size={32} className="mx-auto mb-2 text-indigo-600" />
                      <p className="font-semibold">Подбор персонала</p>
                    </div>
                    <div className="text-center p-4 bg-indigo-50 rounded-lg">
                      <Icon name="Sparkles" size={32} className="mx-auto mb-2 text-indigo-600" />
                      <p className="font-semibold">Декорирование</p>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-500 mb-2">Цена начинается от</p>
                    <p className="text-4xl font-bold text-indigo-600">100 000 ₽</p>
                  </div>

                  <Button 
                    onClick={handleAddService}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    size="lg"
                  >
                    <Icon name="Sparkles" className="mr-2" size={20} />
                    Полная организация мероприятия
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

export default Organization;
