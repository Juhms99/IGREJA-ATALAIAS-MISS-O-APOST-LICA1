
import { MemberRole, Member, Notice, ChurchEvent, Hymn, PrayerRequest } from './types';

export const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Pr. Antônio Silva',
    email: 'pastor@atalaias.com',
    phone: '(11) 98888-7777',
    photoUrl: 'https://images.unsplash.com/photo-1544717297-fa95b3ee91ef?auto=format&fit=crop&q=80&w=200&h=200',
    documentNumber: '123.456.789-00',
    role: MemberRole.PASTOR,
    uncao: 'Sênior',
    validity: '12/2026',
    birthDate: '1975-05-15',
    qrCodeData: 'MEMBER_1_PASTOR',
    observations: 'Presidente do conselho ministerial e fundador da missão.'
  },
  {
    id: '2',
    name: 'Miss. Maria Oliveira',
    email: 'maria@email.com',
    phone: '(11) 97777-6666',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    documentNumber: '222.333.444-55',
    role: MemberRole.MISSIONARIA,
    uncao: 'Evangelismo',
    validity: '06/2025',
    birthDate: '1988-10-20',
    qrCodeData: 'MEMBER_2_MISSIONARIA',
    observations: 'Líder do departamento de missões transculturais.'
  },
  {
    id: '3',
    name: 'Ev. Carlos Santos',
    email: 'carlos@email.com',
    phone: '(11) 96666-5555',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
    documentNumber: '333.444.555-66',
    role: MemberRole.EVANGELISTA,
    uncao: 'Palavra',
    validity: '01/2027',
    birthDate: '1992-03-12',
    qrCodeData: 'MEMBER_3_DIACONO',
    observations: 'Coordena as cruzadas evangelísticas de bairro.'
  },
  {
    id: '4',
    name: 'Dc. Roberto Almeida',
    email: 'roberto@email.com',
    phone: '(11) 95555-4444',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    documentNumber: '444.555.666-77',
    role: MemberRole.DIACONO,
    uncao: 'Serviço',
    validity: '05/2026',
    birthDate: '1980-08-25',
    qrCodeData: 'MEMBER_4_DIACONO',
    observations: 'Responsável pela logística e ordem no templo sede.'
  },
  {
    id: '5',
    name: 'Coop. Juliana Lima',
    email: 'juliana@email.com',
    phone: '(11) 94444-3333',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200',
    documentNumber: '555.666.777-88',
    role: MemberRole.COOPERADOR,
    uncao: 'Auxiliar',
    validity: '08/2025',
    birthDate: '1995-12-10',
    qrCodeData: 'MEMBER_5_COOPERADOR',
    observations: 'Auxilia na recepção e escola bíblica dominical.'
  },
  {
    id: '6',
    name: 'Lucas Ferreira',
    email: 'lucas@email.com',
    phone: '(11) 93333-2222',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    documentNumber: '666.777.888-99',
    role: MemberRole.MEMBRO,
    uncao: 'Comunhão',
    validity: '12/2027',
    birthDate: '2001-04-05',
    qrCodeData: 'MEMBER_6_MEMBRO',
    observations: 'Integrante do ministério de louvor (Teclado).'
  }
];

export const MOCK_CULT_PHOTOS = [
  { id: 'p1', url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=400&h=300', title: 'Culto de Celebração' },
  { id: 'p2', url: 'https://images.unsplash.com/photo-1444212477490-ca40a925329e?auto=format&fit=crop&q=80&w=400&h=300', title: 'Vigília da Vitória' },
  { id: 'p3', url: 'https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&q=80&w=400&h=300', title: 'Santa Ceia' },
  { id: 'p4', url: 'https://images.unsplash.com/photo-1529070532779-d46772714571?auto=format&fit=crop&q=80&w=400&h=300', title: 'Escola Bíblica' }
];

export const MOCK_HYMNS: Hymn[] = [
  { number: 1, title: 'Chuvas de Graça', lyrics: 'Deus prometeu com certeza, Chuvas de graça mandar...' },
  { number: 15, title: 'Foi na Cruz', lyrics: 'Ó quão cego eu andei e perdido vaguei...' },
  { number: 545, title: 'Jerusalém de Ouro', lyrics: 'Jerusalém de ouro, que brilha como o sol...' }
];

export const MOCK_PRAYERS: PrayerRequest[] = [
  { id: 'p1', requesterName: 'Irmã Neide', request: 'Pela saúde do meu neto que está com febre.', date: '2024-05-19', status: 'approved' },
  { id: 'p2', requesterName: 'Carlos José', request: 'Pelas portas de emprego abertas.', date: '2024-05-20', status: 'pending' }
];

export const MOCK_NOTICES: Notice[] = [
  { id: 'n1', title: 'Grande Vigília da Vitória', content: 'Nesta sexta-feira teremos nossa vigília mensal.', date: '2024-05-20', category: 'Urgente' }
];

export const MOCK_EVENTS: ChurchEvent[] = [
  { id: 'e1', title: 'Culto de Adoração', date: 'Domingo', time: '18:00', location: 'Templo Sede', description: 'Celebração semanal.' }
];
