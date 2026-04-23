import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { animate, inView } from 'motion';
import { stagger } from 'motion-dom';

interface Screen {
  src: string;
  label: string;
  description: string;
  group: 'onboarding' | 'discovery' | 'order' | 'experience';
}

interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  description: string;
  activities: string[];
}

@Component({
  selector: 'app-coffee-app-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  templateUrl: './coffee-app.html',
})
export class CoffeeAppPageComponent implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly router = inject(Router);

  readonly activeScreen = signal(0);
  readonly activeGroup = signal<Screen['group']>('onboarding');
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;

  readonly screens: Screen[] = [
    { src: 'images/CoffeeApp/1.png',  label: 'Splash',         description: 'Tela de entrada com identidade visual quente e acolhedora do app.', group: 'onboarding' },
    { src: 'images/CoffeeApp/2.png',  label: 'Onboarding',     description: 'Apresentação da proposta de valor: café especial com praticidade.', group: 'onboarding' },
    { src: 'images/CoffeeApp/3.png',  label: 'Login / Cadastro', description: 'Fluxo de autenticação simplificado para acesso rápido.', group: 'onboarding' },
    { src: 'images/CoffeeApp/4.png',  label: 'Home',           description: 'Dashboard principal com destaque para promoções e favoritos.', group: 'discovery' },
    { src: 'images/CoffeeApp/5.png',  label: 'Menu / Catálogo', description: 'Exploração do cardápio com filtros por tipo, torra e intensidade.', group: 'discovery' },
    { src: 'images/CoffeeApp/6.png',  label: 'Detalhe do Produto', description: 'Página do produto com origem, notas sensoriais e opções de personalização.', group: 'discovery' },
    { src: 'images/CoffeeApp/7.png',  label: 'Personalização', description: 'Customização do pedido: tamanho, leite, temperatura e extras.', group: 'order' },
    { src: 'images/CoffeeApp/8.png',  label: 'Carrinho',       description: 'Revisão do pedido antes de confirmar com resumo claro de valores.', group: 'order' },
    { src: 'images/CoffeeApp/9.png',  label: 'Checkout',       description: 'Pagamento integrado com múltiplos métodos e aplicação de cupons.', group: 'order' },
    { src: 'images/CoffeeApp/10.png', label: 'Confirmação',    description: 'Feedback visual do pedido confirmado com estimativa de preparo.', group: 'experience' },
    { src: 'images/CoffeeApp/11.png', label: 'Acompanhamento', description: 'Rastreamento em tempo real do status do preparo e entrega.', group: 'experience' },
    { src: 'images/CoffeeApp/12.png', label: 'Avaliação',      description: 'Coleta de feedback pós-consumo para melhoria contínua.', group: 'experience' },
    { src: 'images/CoffeeApp/13.png', label: 'Perfil / Fidelidade', description: 'Programa de fidelidade com histórico de pedidos e recompensas.', group: 'experience' },
  ];

  readonly groups: { id: Screen['group']; label: string }[] = [
    { id: 'onboarding',  label: 'Onboarding' },
    { id: 'discovery',   label: 'Descoberta' },
    { id: 'order',       label: 'Pedido' },
    { id: 'experience',  label: 'Experiência' },
  ];

  readonly processSteps: ProcessStep[] = [
    {
      number: '01',
      phase: 'Empatia',
      title: 'Entendendo o Usuário',
      description: 'Primeira fase do curso: aprender a pensar pelo usuário antes de pensar em solução. Trabalhei com personas e cenários fictícios de consumidores de café especial.',
      activities: [
        'Criação de personas fictícias baseadas em arquétipos de usuário',
        'Mapeamento de cenários e contextos de uso',
        'Definição do problema central: pedido de café especial sem personalização real',
        'Aplicação dos frameworks de empatia do curso Google UX',
      ],
    },
    {
      number: '02',
      phase: 'Definição',
      title: 'Estruturando o Problema',
      description: 'Com o usuário em mente, defini o escopo do projeto e os fluxos que seriam trabalhados no protótipo.',
      activities: [
        'Problem statement e How Might We questions',
        'User journey do desejo ao pós-consumo',
        'Definição dos 4 fluxos principais: onboarding, descoberta, pedido, experiência',
        'Priorização das funcionalidades pelo método MoSCoW',
      ],
    },
    {
      number: '03',
      phase: 'Ideação',
      title: 'Explorando Soluções',
      description: 'Fase de exploração visual — wireframes rápidos para testar layouts antes de investir tempo no visual final.',
      activities: [
        'Crazy 8s para gerar ideias de interface rapidamente',
        'Wireframes de baixa fidelidade dos fluxos principais',
        'Definição da arquitetura de informação e navegação',
        'Escolha da direção visual: quente, aconchegante, artesanal',
      ],
    },
    {
      number: '04',
      phase: 'Prototipagem',
      title: 'UI de Alta Fidelidade',
      description: 'A parte que mais gosto: transformar a estrutura em uma interface bonita e funcional. Design System, componentes e 13 telas no Figma.',
      activities: [
        'Design System com cores, tipografia e componentes reutilizáveis',
        '13 telas cobrindo todos os fluxos definidos',
        'Protótipo interativo e navegável no Figma',
        'Projeto final entregue para conclusão do Google UX Design Certificate',
      ],
    },
  ];

  get filteredScreens(): Screen[] {
    return this.screens.filter((s) => s.group === this.activeGroup());
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);

    this.startAutoplay();

    const host = this.el.nativeElement as HTMLElement;

    host.querySelectorAll<HTMLElement>('.fade-up').forEach((el) => {
      inView(el, (target) => {
        animate(target as HTMLElement, { opacity: [0, 1], translateY: ['40px', '0px'] }, { duration: 0.65 });
      }, { amount: 0.2 });
    });

    host.querySelectorAll<HTMLElement>('.stagger-group').forEach((group) => {
      inView(group, (target) => {
        const children = Array.from((target as HTMLElement).querySelectorAll<HTMLElement>('.stagger-item'));
        if (children.length) {
          animate(children, { opacity: [0, 1], translateY: ['30px', '0px'] }, {
            duration: 0.5, delay: stagger(0.09),
          });
        }
      }, { amount: 0.1 });
    });
  }

  ngOnDestroy(): void {
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);
  }

  private startAutoplay(): void {
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);
    this.autoplayTimer = setInterval(() => {
      this.activeScreen.update((i) => (i + 1) % this.screens.length);
    }, 3200);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  setScreen(i: number): void {
    this.activeScreen.set(i);
  }

  setGroup(group: Screen['group']): void {
    this.activeGroup.set(group);
    const first = this.screens.findIndex((s) => s.group === group);
    if (first !== -1) this.activeScreen.set(first);
    this.startAutoplay();
  }

  prevScreen(): void {
    this.activeScreen.update((i) => (i === 0 ? this.screens.length - 1 : i - 1));
  }

  nextScreen(): void {
    this.activeScreen.update((i) => (i + 1) % this.screens.length);
  }
}
