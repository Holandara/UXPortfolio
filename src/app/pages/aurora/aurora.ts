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
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  description: string;
  activities: string[];
}

interface Insight {
  title: string;
  description: string;
}

@Component({
  selector: 'app-aurora-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  templateUrl: './aurora.html',
})
export class AuroraPageComponent implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly router = inject(Router);

  readonly activeScreen = signal(0);
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;

  readonly screens: Screen[] = [
    {
      src: 'images/Aurora/LOAD.png',
      label: 'Splash Screen',
      description: 'Tela de carregamento discreta — sem revelar a natureza do app.',
    },
    {
      src: 'images/Aurora/UNLOCK.png',
      label: 'Modo Camuflado',
      description: 'Interface de desbloqueio disfarçada. O agressor não reconhece a função do app.',
    },
    {
      src: 'images/Aurora/Login.png',
      label: 'Login',
      description: 'Autenticação segura com acesso protegido por senha ou gesto secreto.',
    },
    {
      src: 'images/Aurora/Cadastro.png',
      label: 'Cadastro',
      description: 'Registro simplificado com coleta mínima de dados para proteger a identidade da usuária.',
    },
    {
      src: 'images/Aurora/HOME PAGE.png',
      label: 'Home',
      description: 'Dashboard principal com acesso rápido às funcionalidades essenciais.',
    },
    {
      src: 'images/Aurora/Pânico.png',
      label: 'Botão de Pânico',
      description: 'Um toque longo envia alerta silencioso com geolocalização para contatos de confiança e autoridades.',
    },
    {
      src: 'images/Aurora/Evidências.png',
      label: 'Registro de Evidências',
      description: 'Documentação segura e criptografada de fotos, áudios e textos como provas.',
    },
    {
      src: 'images/Aurora/Boletins de ocorrências.png',
      label: 'Boletins de Ocorrência',
      description: 'Histórico de registros e acompanhamento de denúncias realizadas.',
    },
    {
      src: 'images/Aurora/Infos.png',
      label: 'Rede de Apoio',
      description: 'Acesso direto a recursos, delegacias, abrigos e redes de apoio psicológico e jurídico.',
    },
  ];

  readonly insights: Insight[] = [
    {
      title: 'Discrição é sobrevivência',
      description:
        'O agressor frequentemente monitora o celular da vítima. Um app de segurança visível pode colocá-la em risco ainda maior — a camuflagem não é um detalhe, é o produto.',
    },
    {
      title: 'Velocidade salva vidas',
      description:
        'Em momentos de crise, cada segundo conta. A interface precisa ser acionável com um único gesto, mesmo sob pressão extrema e sem olhar para a tela.',
    },
    {
      title: 'O apoio vai além da emergência',
      description:
        'Conectar vítimas com delegacias especializadas, abrigos e redes de apoio psicológico é tão importante quanto o botão de pânico — a recuperação é um processo longo.',
    },
  ];

  readonly features: Feature[] = [
    {
      title: 'Modo Camuflado',
      icon: 'shield',
      description:
        'O Aurora se disfarça de app comum (calculadora, bloco de notas). A interface de emergência só é revelada por uma senha ou gesto secreto.',
    },
    {
      title: 'Botão de Pânico Inteligente',
      icon: 'zap',
      description:
        'Um toque longo e discreto envia alerta silencioso com geolocalização para contatos de confiança e, opcionalmente, para as autoridades.',
    },
    {
      title: 'Registro de Evidências',
      icon: 'camera',
      description:
        'Armazenamento criptografado de fotos, áudios e registros como provas, inacessíveis sem autenticação.',
    },
    {
      title: 'Rede de Apoio',
      icon: 'users',
      description:
        'Conexão direta com delegacias especializadas, abrigos, apoio psicológico e jurídico de forma anônima.',
    },
  ];

  readonly processSteps: ProcessStep[] = [
    {
      number: '01',
      phase: 'Dia 1 — Manhã',
      title: 'Imersão no Problema',
      description: 'O hackathon começou com um brief da SSP-DF. Em poucas horas, precisávamos entender o contexto real da violência doméstica e definir onde atacar.',
      activities: [
        'Brief com representantes da Secretaria de Segurança Pública do DF',
        'Dados reais da SSP sobre perfil de vítimas e barreiras para denúncia',
        'Rápido benchmarking de apps de segurança existentes',
        'Definição do problema central: o medo de ser descoberta pelo agressor',
      ],
    },
    {
      number: '02',
      phase: 'Dia 1 — Tarde',
      title: 'Ideação e Conceito',
      description: 'Com o problema claro, partimos para a geração de ideias. O conceito do "modo camuflado" surgiu como diferencial central da solução.',
      activities: [
        'Brainstorm de funcionalidades críticas para a segurança da usuária',
        'Nascimento do conceito: app disfarçado de utilitário comum',
        'Definição dos 3 pilares: discrição, velocidade e rede de apoio',
        'Escolha das funcionalidades prioritárias para o protótipo',
      ],
    },
    {
      number: '03',
      phase: 'Dias 2 e 3',
      title: 'Prototipagem no Figma',
      description: 'Com o conceito validado pela equipe, entramos em modo de execução. Dois dias intensos para transformar a ideia em um protótipo navegável.',
      activities: [
        'Criação do fluxo completo: splash, modo camuflado, login, home',
        'Design das funcionalidades-chave: botão de pânico, registro de evidências, rede de apoio',
        'Definição da identidade visual: paleta discreta, tipografia acessível',
        '9 telas de alta fidelidade e protótipo interativo no Figma',
      ],
    },
    {
      number: '04',
      phase: 'Dia 4',
      title: 'Pitch e Resultado',
      description: 'Apresentamos o Aurora para uma banca com representantes da SSP-DF e especialistas em tecnologia e segurança pública.',
      activities: [
        'Pitch de 10 minutos para banca avaliadora com SSP-DF',
        '3º Lugar no Campus Party 2025',
        'Reconhecimento pelo foco em acessibilidade e discrição',
        'Interesse da SSP-DF em continuar o desenvolvimento da solução',
      ],
    },
  ];

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);

    this.autoplayTimer = setInterval(() => {
      this.activeScreen.update((i) => (i + 1) % this.screens.length);
    }, 3500);

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
            duration: 0.5,
            delay: stagger(0.1),
          });
        }
      }, { amount: 0.1 });
    });
  }

  ngOnDestroy(): void {
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  setScreen(i: number): void {
    this.activeScreen.set(i);
  }

  prevScreen(): void {
    this.activeScreen.update((i) => (i === 0 ? this.screens.length - 1 : i - 1));
  }

  nextScreen(): void {
    this.activeScreen.update((i) => (i + 1) % this.screens.length);
  }
}
