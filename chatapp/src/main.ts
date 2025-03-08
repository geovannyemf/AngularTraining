import { ChatComponent } from './app/components/chat/chat.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

bootstrapApplication(ChatComponent, appConfig)
  .catch((err) => console.error(err));
