import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Order {
  orderId: number;
  eventDate: string;
  eventLocation: string;
  eventTime: string;
  contactType: string;
  contactInfo: string;
  promoCode: string;
  totalAmount: number;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  createdAt: string;
}

interface Section {
  id: number;
  slug: string;
  title: string;
  description: string;
  services: Service[];
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  videoUrl: string;
  isExtra: boolean;
  extraLabel: string;
  sortOrder: number;
}

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/8882c0d0-a5b1-4cfe-8b9b-4f5830b60727', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setIsAuthenticated(true);
        toast({
          title: 'Успешный вход',
          description: `Добро пожаловать, ${data.username}!`
        });
        loadOrders();
        loadSections();
      } else {
        toast({
          variant: 'destructive',
          title: 'Ошибка входа',
          description: data.error || 'Неверные данные'
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось подключиться к серверу'
      });
    }
    setLoading(false);
  };

  const loadOrders = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/fe0f6bcc-49cf-43eb-9d1b-09dc40b8b7de');
      const data = await response.json();
      if (response.ok) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  const loadSections = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/a400ad53-67a6-420d-87e1-c83a8a359676');
      const data = await response.json();
      if (response.ok) {
        setSections(data.sections);
      }
    } catch (error) {
      console.error('Failed to load sections:', error);
    }
  };

  const handleUpdateSection = async (sectionId: number, title: string, description: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/a400ad53-67a6-420d-87e1-c83a8a359676', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_section',
          id: sectionId,
          title,
          description
        })
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Раздел обновлен'
        });
        loadSections();
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось обновить раздел'
      });
    }
  };

  const handleCreateService = async (sectionId: number, serviceData: Partial<Service>) => {
    try {
      const response = await fetch('https://functions.poehali.dev/a400ad53-67a6-420d-87e1-c83a8a359676', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_service',
          sectionId,
          ...serviceData
        })
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Услуга добавлена'
        });
        loadSections();
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось добавить услугу'
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              <Icon name="Shield" size={32} className="mx-auto mb-2" />
              Админ-панель
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Админ-панель</h1>
          <Button 
            variant="outline" 
            onClick={() => {
              setIsAuthenticated(false);
              setToken('');
            }}
          >
            <Icon name="LogOut" className="mr-2" size={20} />
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">
              <Icon name="ShoppingBag" className="mr-2" size={16} />
              Заявки
            </TabsTrigger>
            <TabsTrigger value="content">
              <Icon name="FileEdit" className="mr-2" size={16} />
              Контент
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Все заявки ({orders.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Заявок пока нет</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.orderId} className="border-l-4 border-l-blue-500">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">Заявка #{order.orderId}</CardTitle>
                              <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleString('ru-RU')}
                              </p>
                            </div>
                            <Badge variant="secondary" className="text-lg">
                              {order.totalAmount.toLocaleString()} ₽
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Дата мероприятия</p>
                              <p className="font-semibold">{order.eventDate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Время</p>
                              <p className="font-semibold">{order.eventTime}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Место</p>
                              <p className="font-semibold">{order.eventLocation}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Контакт ({order.contactType})</p>
                              <p className="font-semibold">{order.contactInfo}</p>
                            </div>
                          </div>
                          {order.promoCode && (
                            <div className="mb-4">
                              <Badge variant="outline">Промокод: {order.promoCode}</Badge>
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-gray-500 mb-2">Услуги:</p>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                  <span>{item.name} x{item.quantity}</span>
                                  <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} ₽</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Управление разделами и услугами</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Здесь вы можете редактировать существующие разделы и добавлять новые услуги
                </p>
                <div className="space-y-6">
                  {sections.map((section) => (
                    <Card key={section.id} className="border-2">
                      <CardHeader className="bg-gray-50">
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                        <p className="text-sm text-gray-600">{section.description}</p>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <p className="font-semibold">Услуги в разделе: {section.services.length}</p>
                          {section.services.map((service) => (
                            <div key={service.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                              <div>
                                <p className="font-semibold">{service.name}</p>
                                <p className="text-sm text-gray-600">{service.description}</p>
                              </div>
                              <Badge>{service.price.toLocaleString()} ₽</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
