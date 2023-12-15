import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PulzoHubService {
  pulzo_hub_key: string = 'pulzohub';
  baseUrl = `${env.apiCerberoUrl}`;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getPulzoHub() {
    const item = this.storageService.decryptAndGetObject(this.pulzo_hub_key);
    if (!item) {
      return null;
    }
    return item
  }

  setPulzoHub(id: number) {
    this.getMyApps(id).subscribe((data: any) => {
      if (data) {
        const pulzohubValues = [];
        for (const item of data) {
          const pulzohubValue = item.pulzohub;
          pulzohubValues.push(pulzohubValue);
        }
        this.storageService.encryptAndSaveObject(this.pulzo_hub_key, JSON.stringify(pulzohubValues));
      }
    });
  }

  removePulzoHub() {
    localStorage.removeItem(this.pulzo_hub_key);
  }

  getMyApps(id: number) {
    return this.http.get<any>(`${this.baseUrl}/users/${id}/apps`);
  }
}
