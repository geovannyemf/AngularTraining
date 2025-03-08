import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, getDocs, orderBy, query, addDoc, onSnapshot } from '@angular/fire/firestore';
import { FormsModule } from "@angular/forms";
import { Message } from '../../models/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  nickName: string = '';
  private firestore: Firestore = inject(Firestore);

  ngOnInit(): void {
    this.subscribeToMessages();
  }

  subscribeToMessages(): void {
    const messagesRef = collection(this.firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    onSnapshot(q, (querySnapshot) => {
      const messages: Message[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Message, 'id'>;
        messages.push({
          id: doc.id,
          ...data
        });
      });
      this.messages = messages;
    }, (error) => {
      console.error("Error getting messages: ", error);
    });
  }

  sendMessage() {
    if (this.newMessage && this.newMessage.trim() !== '') {
      const messagesRef = collection(this.firestore, 'messages');

      const newMessageData = {
        nickname: this.nickName.trim(),
        text: this.newMessage.trim(),
        createdAt: Date.now()
      };

      addDoc(messagesRef, newMessageData)
        .then(() => {
          this.newMessage = '';
        })
        .catch(error => {
          console.error("Error sending message: ", error);
        });
    }
  }
}
