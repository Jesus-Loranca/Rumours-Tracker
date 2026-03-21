import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  getDetailedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getYear(dateString: string): number {
    return new Date(dateString).getFullYear();
  }

  getUnresolvedDate(createdString: string): number {
    const createdDate = new Date(createdString);
    const now = new Date();
    return Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  getResolvedDate(createdString: string, resolvedString: string): number {
    const createdDate = new Date(createdString);
    const resolvedDate = new Date(resolvedString);
    return Math.floor((resolvedDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  }
}
