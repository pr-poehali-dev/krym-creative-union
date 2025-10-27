import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';

const Badge = ({ children, className = '', variant = 'default' }: { children: React.ReactNode; className?: string; variant?: string }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variant === 'outline' ? 'border border-primary/20 text-primary' : 'bg-primary text-white'} ${className}`}>
    {children}
  </span>
);

const danceServices = [
  {
    id: 'polka',
    name: 'Полька',
    description: 'Танцы лиричные, лёгкие, но при этом ритмичные и темпераментные. Движения отличаются чёткостью, плавностью и последовательностью.',
    price: 5000,
    image: 'https://cdn.poehali.dev/files/b8bc13dd-b171-440c-ac11-20ffa8d3564b.png',
    canDuplicate: false,
  },
  {
    id: 'waltz',
    name: 'Вальс',
    description: 'Вальс стал одним из самых популярных танцев, который используется на балах, свадьбах, выпускных вечерах и других торжественных мероприятиях. Его романтичная природа и грациозность делают этот танец любимым во всём мире.',
    price: 5000,
    image: 'https://cdn.poehali.dev/files/b8bc13dd-b171-440c-ac11-20ffa8d3564b.png',
    canDuplicate: false,
  },
  {
    id: 'jazz',
    name: 'Джаз',
    description: 'Динамичное и энергичное направление, сочетающее в себе элементы балета и современных танцевальных техник.',
    price: 5000,
    image: 'https://cdn.poehali.dev/files/b8bc13dd-b171-440c-ac11-20ffa8d3564b.png',
    canDuplicate: false,
  },
];

const additionalServices = [
  {
    id: 'extra-couple',
    name: 'Дополнительная пара',
    description: 'Цена увеличивается в два раза',
    price: 10000,
    canDuplicate: true,
  },
  {
    id: 'master-class',
    name: 'Мастер классы',
    description: 'Обучение танцам для гостей мероприятия',
    price: 7000,
    canDuplicate: false,
  },
];

const Dance = () => {
  const { addItem } = useCart();

  const handleAddToCart = (service: typeof danceServices[0] | typeof additionalServices[0]) => {
    addItem({
      id: service.id,
      name: service.name,
      price: service.price,
      canDuplicate: service.canDuplicate,
      category: 'Танцы',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Танцы
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Вы можете выбрать жанр и посмотреть видео обзор на услугу. По умолчанию подразумевается одна пара, время выступления от 15 минут.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {danceServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                  <p className="text-muted-foreground mb-4 min-h-20">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{service.price}₽</span>
                    <Button onClick={() => handleAddToCart(service)}>
                      Заказать
                      <Icon name="ShoppingCart" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Дополнительно
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalServices.map((service) => (
                <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Icon name={service.canDuplicate ? 'Users' : 'GraduationCap'} className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                      {service.canDuplicate && (
                        <Badge variant="outline" className="mb-3">
                          <Icon name="RefreshCw" size={12} className="mr-1" />
                          Можно дублировать
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{service.price}₽</span>
                    <Button variant="outline" onClick={() => handleAddToCart(service)}>
                      Добавить
                      <Icon name="Plus" size={16} className="ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dance;