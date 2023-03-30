import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PulzoHubService {

  pulzo_hub_key: string = 'pulzohub';
  baseUrl = `${env.apiUrl}`;

  constructor(private http: HttpClient) { }

  getPulzoHub() {
    const item = JSON.parse(localStorage.getItem(this.pulzo_hub_key) || '[]');
    console.log('item', item);
    if (!item) {
      return null;
    }
    return item
  }

  setPulzoHub(id: number) {
    // get apps
    this.getMyApps(id).subscribe((data: any) => {
      if (data) {
        const pulzohubValues = [];
        for (const item of data) {
          const pulzohubValue = item.pulzohub;
          pulzohubValues.push(pulzohubValue);
        }
        // save
        localStorage.setItem(this.pulzo_hub_key, JSON.stringify(pulzohubValues));
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
