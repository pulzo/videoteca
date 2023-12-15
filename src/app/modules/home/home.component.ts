import { Component, OnInit } from '@angular/core';
import { PulzoHubService } from 'src/app/core/services/pulzo-hub.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private storageService: StorageService,  private pulzoHubService: PulzoHubService, private modalService: ModalService, private router: Router) {
    const user = this.storageService.decryptAndGetObject('user');
    if (user) {
        this.pulzoHubService.setPulzoHub(user._id);
    }
  }

  ngOnInit(): void {
  }

}
