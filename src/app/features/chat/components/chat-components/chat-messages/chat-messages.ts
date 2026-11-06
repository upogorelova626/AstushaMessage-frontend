import { afterEveryRender, ElementRef } from '@angular/core';
import type { OnDestroy, AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, viewChild, ViewChild } from '@angular/core';
import { TuiScrollbar } from '@taiga-ui/core';
import { Message } from '../message/message';
import { MessagesStoreService } from '../../../services/messages-store.service';

@Component({
  selector: 'app-chat-messages',
  imports: [TuiScrollbar, Message],
  templateUrl: './chat-messages.html',
  styleUrl: './chat-messages.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessages implements AfterViewInit, OnDestroy {
  private readonly messageStoreService = inject(MessagesStoreService);

  private readonly scrollBar = viewChild(TuiScrollbar, { read: ElementRef<HTMLElement> });

  @ViewChild('loadMore')
  private loadMore!: ElementRef<HTMLElement>;
  private observer!: IntersectionObserver;

  private initialScrollDone = false;

  protected readonly messages = this.messageStoreService.messages;

  protected readonly isLoading = this.messageStoreService.isLoading;

  constructor() {
    afterEveryRender(() => {
      const messages = this.messages();

      if (!messages) {
        this.initialScrollDone = false;
        return;
      }

      if (this.initialScrollDone) {
        return;
      }

      const element = this.scrollBar()?.nativeElement;

      if (!element) {
        return;
      }

      this.scrollToBottom();
      this.initialScrollDone = true;
    });
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      const trigger = entries[0];

      if (!trigger.isIntersecting) {
        return;
      }

      this.messageStoreService.addMessages();

      this.observer.observe(this.loadMore.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private scrollToBottom(): void {
    const scrollBar = this.scrollBar();

    if (!scrollBar) {
      return;
    }

    scrollBar.nativeElement.scrollTop = scrollBar.nativeElement.scrollHeight;
  }
}
