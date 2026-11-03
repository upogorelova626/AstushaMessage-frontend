import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TuiScrollbar } from '@taiga-ui/core';
import { Message } from '../message/message';
import { MessagesStoreService } from '../../../services/messages-store.service';
import { TuiSkeleton } from '@taiga-ui/kit';

@Component({
  selector: 'app-chat-messages',
  imports: [TuiScrollbar, Message, TuiSkeleton],
  templateUrl: './chat-messages.html',
  styleUrl: './chat-messages.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessages implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('loadMore')
  private loadMore!: ElementRef<HTMLElement>;
  private observer!: IntersectionObserver;

  @ViewChild('messagesContainer')
  private messagesContainer?: ElementRef<HTMLElement>;

  private readonly messageStoreService = inject(MessagesStoreService);

  protected readonly messages = this.messageStoreService.messages;

  protected readonly isLoading = this.messageStoreService.isLoading;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      const trigger = entries[0];

      if (!trigger.isIntersecting) {
        return;
      }

      this.messageStoreService.addMessages();

      this.observer.observe(this.loadMore.nativeElement);

      this.scrollToBottom();
    });
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private scrollToBottom(): void {
    const element = this.messagesContainer?.nativeElement;

    if (!element) {
      return;
    }

    element.scrollTop = element.scrollHeight;
  }
}
