// ─────────────────────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export interface UxProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  link: string;
  route: string;           // internal Angular route e.g. '/aurora'
  coverImage: string;
  screens: string[];
  format: 'mobile' | 'desktop';
}

export interface Hackathon {
  id: string;
  eventName: string;
  position: string;
  positionLabel: string;
  year: number;
  description: string;
  image: string;
}

export interface Skill {
  name: string;
  icon: string;  // lucide icon name (kebab-case)
  category: 'design' | 'frontend' | 'backend' | 'soft';
}

export interface ArtPiece {
  src: string;
  title: string;
  isVideo?: boolean;
  span?: 'wide' | 'tall' | 'normal';
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

export const UX_PROJECTS: UxProject[] = [
  {
    id: 'aurora',
    title: 'Aurora',
    subtitle: 'Sistema de Segurança Pública',
    description:
      'Aplicativo móvel de apoio a vítimas de violência doméstica e situações de risco. A pesquisa envolveu entrevistas com usuárias e especialistas em segurança pública, resultando em uma solução focada em discrição, acessibilidade e resposta rápida.',
    tags: ['Pesquisa de Campo', 'Prototipagem', 'Figma', 'Acessibilidade', 'Mobile'],
    link: 'https://portfolio-sarolanda.vercel.app/aurora',
    route: '/aurora',
    coverImage: 'images/Aurora/HOME PAGE.png',
    screens: [
      'images/Aurora/Login.png',
      'images/Aurora/Cadastro.png',
      'images/Aurora/HOME PAGE.png',
      'images/Aurora/Pânico.png',
      'images/Aurora/Evidências.png',
      'images/Aurora/Boletins de ocorrências.png',
      'images/Aurora/Infos.png',
      'images/Aurora/UNLOCK.png',
      'images/Aurora/LOAD.png',
    ],
    format: 'mobile',
  },
  {
    id: 'coffee-app',
    title: 'Coffee App',
    subtitle: 'Experiência de Pedido de Café',
    description:
      'Redesign completo da experiência de pedido de café especial. ' +
      'O processo incluiu testes de usabilidade e pesquisas de usuário. ',
    tags: ['UX Research', 'UI Design', 'Prototipagem', 'Testes de Usabilidade', 'Figma'],
    link: 'https://www.behance.net/gallery/247945923/Case-Study-UXUI-Coffee-App',
    route: 'https://www.behance.net/gallery/247945923/Case-Study-UXUI-Coffee-App',
    coverImage: 'images/CoffeeApp/1.png',
    screens: [
      'images/CoffeeApp/1.png',
      'images/CoffeeApp/2.png',
      'images/CoffeeApp/3.png',
      'images/CoffeeApp/4.png',
      'images/CoffeeApp/5.png',
      'images/CoffeeApp/6.png',
      'images/CoffeeApp/7.png',
      'images/CoffeeApp/8.png',
    ],
    format: 'desktop',
  },
];

export const HACKATHONS: Hackathon[] = [
  {
    id: 'brasilia-virtual',
    eventName: 'Brasília Virtual',
    position: '1st',
    positionLabel: '1º Lugar',
    year: 2026,
    description:
      'Competição com o TCU, criamos uma solução que recolhia denúncias da população e alimentava um painel público, além disso fizemos um bot do whatsapp com IA generativa',
    image: 'images/Hackathons/BrasiliaVirtual.jpg',
  },
  {
    id: 'regenera',
    eventName: 'Regenera',
    position: '1st',
    positionLabel: '1º Lugar',
    year: 2025,
    description:
      'Hackathon de sustentabilidade e tecnologia regenerativa. Desenvolvemos uma interface gamificada para engajamento comunitário em práticas sustentáveis.',
    image: 'images/Hackathons/Regenera.jpg',
  },
  {
    id: 'brasilia-ti',
    eventName: 'Brasília TI + IBM',
    position: '3st',
    positionLabel: '3º Lugar',
    year: 2025,
    description:
      'Utilizamos o watson orchestrate da IBM para desenvolver uma solução para a CAIXA Econômica federal agrupar ideias dos colaboradores.',
    image: 'images/Hackathons/BrasiliaTI.jpg',
  },
  {
    id: 'campus-2025',
    eventName: 'Campus Party 2025',
    position: '3rd',
    positionLabel: '3º Lugar',
    year: 2025,
    description:
      'Maior festival de tecnologia e inovação da América Latina. Projeto protótipo do Aurora, em parceria com a SSP DF para mulheres vítimas de violência doméstica',
    image: 'images/Hackathons/Campus2025.jpg',
  },
  {
    id: 'agrohack',
    eventName: 'AgroHack',
    position: '2st',
    positionLabel: '2º Lugar',
    year: 2025,
    description: 'Solução para ajudar cooperativas do agronegócio',
    image: 'images/Hackathons/Agrohack.jpg',
  },
  {
    id: 'impulsiona',
    eventName: 'Impulsiona',
    position: '3st',
    positionLabel: '3º Lugar',
    year: 2026,
    description:
      'Programa de aceleração e hackathon para startups de impacto social. Projeto vencedor com solução para pessoas internadas utilizarem uma pulseira com sensores de sinais vitais',
    image: 'images/Hackathons/Impulsiona.jpg',
  },
];

export const SKILLS: Skill[] = [
  { name: 'Figma', icon: 'figma', category: 'design' },
  { name: 'UI Design', icon: 'palette', category: 'design' },
  { name: 'UX Research', icon: 'users', category: 'design' },
  { name: 'JavaScript', icon: 'code', category: 'frontend' },
  { name: 'TypeScript', icon: 'terminal', category: 'frontend' },
  { name: 'Angular', icon: 'layers', category: 'frontend' },
  { name: 'React', icon: 'monitor', category: 'frontend' },
  { name: 'Node.js', icon: 'zap', category: 'backend' },
  { name: 'Arduino', icon: 'cpu', category: 'backend' },
  { name: 'Inglês Fluente', icon: 'globe', category: 'soft' },
  { name: 'Liderança', icon: 'star', category: 'soft' },
];

export const ART_PIECES: ArtPiece[] = [
  { src: 'images/artes/girl4.jpg', title: 'girl', span: 'tall' },
  { src: 'images/artes/Rosa.jpg', title: 'rosa', span: 'normal' },

  { src: 'images/artes/snuf.png', title: 'Snuf', span: 'normal' },
  { src: 'images/artes/NewCanvas2.png', title: 'New Canvas', span: 'normal' },
  { src: 'images/artes/Oharastuff.jpg', title: "O'Hara", span: 'tall' },
  { src: 'images/artes/SONPGE BOB.png', title: 'Sponge Bob', span: 'normal' },
  { src: 'images/artes/Sprite-0003.gif', title: 'Sprite Animation', span: 'tall' },
  { src: 'images/artes/Patreon1.jpg', title: 'Patreon', span: 'tall' },
  { src: 'images/artes/image3 (2)-crop-u840.jpg', title: 'Arte III', span: 'normal' },
  { src: 'images/artes/image4 (1).jpg', title: 'Arte IV', span: 'wide' },
  { src: 'images/artes/image5 (1)-crop-u972.jpg', title: 'Arte V', span: 'normal' },
  { src: 'images/artes/boy.jpg', title: 'boy', span: 'tall' },
  { src: 'images/artes/boy2.jpg', title: 'boy2', span: 'normal' },
  { src: 'images/artes/brothers.jpg', title: 'boy', span: 'normal' },
  { src: 'images/artes/camie.jpg', title: 'camie', span: 'normal' },
  { src: 'images/artes/cat.jpg', title: 'cat', span: 'normal' },
  { src: 'images/artes/Cogu.jpg', title: 'mushroom guy', span: 'tall' },
  { src: 'images/artes/dry.jpg', title: 'dry', span: 'tall' },
  { src: 'images/artes/easter.jpg', title: 'easter', span: 'normal' },
  { src: 'images/artes/eyes.jpg', title: 'eyes', span: 'tall' },
  { src: 'images/artes/frog.jpg', title: 'frog and girl', span: 'normal' },
  { src: 'images/artes/galdor.jpg', title: 'galdor', span: 'tall' },
  { src: 'images/artes/game.jpg', title: 'game', span: 'normal' },
  { src: 'images/artes/game33.png', title: 'Nabucos game', span: 'wide' },
  { src: 'images/artes/ghost.jpg', title: 'dtiys', span: 'tall' },
  { src: 'images/artes/girl2.jpg', title: 'girl', span: 'tall' },
  { src: 'images/artes/girl3.jpg', title: 'girl', span: 'tall' },
  { src: 'images/artes/lamb.jpg', title: 'lamb', span: 'normal' },
];
