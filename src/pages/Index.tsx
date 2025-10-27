import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const categories = [
  {
    id: 'dance',
    title: 'Танцы',
    icon: 'Music',
    color: 'from-primary to-accent',
    description: 'Профессиональные танцевальные коллективы',
    examples: ['Современная хореография', 'Классический балет', 'Народные танцы']
  },
  {
    id: 'music',
    title: 'Музыка',
    icon: 'Mic2',
    color: 'from-secondary to-accent',
    description: 'Музыканты и вокалисты высокого уровня',
    examples: ['Живая музыка', 'Диджеи', 'Вокальные группы']
  },
  {
    id: 'media',
    title: 'СМИ',
    icon: 'Camera',
    color: 'from-orange to-primary',
    description: 'Профессиональные фото и видеоуслуги',
    examples: ['Фотосессии', 'Видеосъемка', 'Стриминг']
  },
  {
    id: 'organization',
    title: 'Организация',
    icon: 'Calendar',
    color: 'from-accent to-secondary',
    description: 'Полное сопровождение мероприятий',
    examples: ['Ведущие', 'Декор', 'Техническая поддержка']
  }
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden paint-splash">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/a25d90b5-34b1-49de-bb13-d3f34fe611ce.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Объединение Крым
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-foreground/80 max-w-3xl mx-auto">
            Онлайн-платформа для заказа талантливых артистов на ваши мероприятия
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {categories.map((category, index) => (
              <Card 
                key={category.id}
                className="p-6 bg-card/80 backdrop-blur-sm border-2 hover:scale-105 transition-all duration-300 cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon name={category.icon} className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-muted-foreground text-sm">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={40} className="text-primary" />
        </div>
      </section>

      <section 
        className="py-40 relative"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto animate-slide-up">
            <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              О платформе
            </h2>
            
            <Card className="p-8 bg-card/60 backdrop-blur-sm border-2 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Icon name="Target" className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Наша миссия</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Мы объединяем талантливых артистов Крыма и предоставляем простой способ заказать их услуги 
                    для любых мероприятий. Каждый исполнитель имеет опыт выступлений более двух лет и прошёл 
                    тщательный отбор нашей командой.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/60 backdrop-blur-sm border-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-orange flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Строгий отбор</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Не все заявки артистов одобряются. Мы проверяем портфолио, опыт и профессионализм каждого 
                    кандидата. Каждая услуга сопровождается подробным описанием, фотографиями и видеообзором, 
                    чтобы вы могли сделать правильный выбор.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="h-32 bg-gradient-to-b from-background via-background/50 to-transparent relative z-20" />
      
      <section className="py-32 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-40 transition-all duration-700 ease-out"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/70253429-6a89-4af7-a983-d3d9719e3a02.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(60px)',
            transform: `scale(1.2) translateY(${scrollY * 0.1}px)`
          }}
        />
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
            Категории услуг
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <Card 
                key={category.id}
                className="p-8 hover:shadow-2xl transition-all duration-300 animate-scale-in border-2"
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  transform: `translateY(${scrollY * 0.05 * (index % 2 === 0 ? 1 : -1)}px)`
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <Icon name={category.icon} className="text-white" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold">{category.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 text-lg">{category.description}</p>
                
                <div className="space-y-3">
                  {category.examples.map((example) => (
                    <div key={example} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                      <span className="text-foreground">{example}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full mt-6 bg-gradient-to-r ${category.color} hover:opacity-90 transition-opacity`}
                  size="lg"
                >
                  Смотреть артистов
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/175198f3-bfea-48a1-8136-fe21ee3cf819.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-4xl mx-auto p-12 bg-card/90 backdrop-blur-md border-2 text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Готовы сделать ваше мероприятие незабываемым?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Выберите категорию услуг, ознакомьтесь с портфолио артистов и узнайте стоимость прямо на платформе
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6">
              Начать поиск
              <Icon name="Sparkles" size={24} className="ml-2" />
            </Button>
          </Card>
        </div>
      </section>

      <footer className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Объединение Крым
          </h3>
          <p className="text-muted-foreground">
            Объединяем творческих людей для незабываемых мероприятий
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;