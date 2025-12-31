import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonCheckbox, IonButton, IonIcon } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonCheckbox, IonButton, IonIcon]
})

export class ShoppingListPage implements OnInit {
  shoppingList: any[] = [];
  constructor(private storageService: StorageService) {
    addIcons({ trash });
  }

  async ngOnInit() {
    await this.loadShoppingList();
  }
  async ionViewWillEnter() {
    await this.loadShoppingList();
  }
  async loadShoppingList() {
    this.shoppingList = await this.storageService.getShoppingList();
  }

  async toggleItem(ingredient: string) {
    await this.storageService.toggleShoppingItem(ingredient);
    await this.loadShoppingList();
  }


  async removeItem(ingredient: string) {
    await this.storageService.removeShoppingItem(ingredient);
    await this.loadShoppingList();
  }

  async clearChecked() {
    await this.storageService.clearCheckedItems();
    await this.loadShoppingList();
  }
  get hasCheckedItems(): boolean {
    return this.shoppingList.some(item => item.checked);
  }
}