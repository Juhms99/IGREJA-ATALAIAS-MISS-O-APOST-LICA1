
export enum MemberRole {
  MEMBRO = 'Membro',
  COOPERADOR = 'Cooperador(a)',
  DIACONO = 'Diácono/Diaconisa',
  EVANGELISTA = 'Evangelista',
  MISSIONARIA = 'Missionária',
  PASTOR = 'Pastor(a)',
  ADMIN = 'Administrador'
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
  documentNumber: string;
  role: MemberRole;
  uncao: string;
  validity: string;
  birthDate: string;
  observations?: string;
  qrCodeData: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Geral' | 'Evento' | 'Urgente';
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface PrayerRequest {
  id: string;
  requesterName: string;
  memberId?: string;
  request: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Hymn {
  number: number;
  title: string;
  lyrics: string;
}

export interface AuthState {
  user: Member | null;
  isAuthenticated: boolean;
}
