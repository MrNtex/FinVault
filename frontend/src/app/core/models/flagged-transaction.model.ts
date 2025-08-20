export enum FlaggedStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed',
}

export interface FlaggedTransaction {
  id: number;
  reason: string;
  flaggedAt: string;
  status: FlaggedStatus;
  resolutionNotes?: string;
}
