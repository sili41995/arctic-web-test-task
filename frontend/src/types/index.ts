export enum Status {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  IN_PROGRESS = 'IN_PROGRESS',
  WON = 'WON',
  LOST = 'LOST',
}

export interface Lead {
  id: string;
  name: string;
  email?: string;
  company?: string;
  status: Status;
  value?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  text: string;
  leadId: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface LeadQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  status?: Status;
  sort?: string;
  order?: 'asc' | 'desc';
}
