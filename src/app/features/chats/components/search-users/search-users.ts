import type {
  OnInit} from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type {
  ControlValueAccessor} from '@angular/forms';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiTextfieldComponent,
  TuiDropdown,
  TuiError,
  TUI_VALIDATION_ERRORS,
} from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiComboBoxDirective } from '@taiga-ui/kit';
import {
  catchError,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  of,
  Subject,
  switchMap,
  tap,
  timer,
} from 'rxjs';

import type { AstushaUserPreview } from '../../../../shared/interfaces';
import { SearchUserService } from '../../../../shared/services/search-user.service';
import { UserPreview } from '../../../../shared/components/user-preview/user-preview';

@Component({
  selector: 'app-search-users',
  imports: [
    TuiTextfieldComponent,
    ReactiveFormsModule,
    TuiDataListWrapper,
    TuiDropdown,
    TuiChevron,
    TuiComboBoxDirective,
    TuiError,
    UserPreview,
  ],
  templateUrl: './search-users.html',
  styleUrl: './search-users.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useFactory: () => ({
        minlength: ({ requiredLength }: { requiredLength: number }) =>
          `Введите минимум ${requiredLength} символа`,
        maxlength: ({ requiredLength }: { requiredLength: number }) =>
          `Введите не более ${requiredLength} символов`,
      }),
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchUsers),
      multi: true,
    },
  ],
})
export class SearchUsers implements ControlValueAccessor, OnInit {
  private readonly searchUserService = inject(SearchUserService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  private readonly selectedUser = signal<AstushaUserPreview | null>(null);

  protected readonly search$ = new Subject<string>();
  protected readonly foundedUsers = signal<AstushaUserPreview[] | null>([]);
  protected readonly isSearching = signal(false);

  protected readonly searchControl = new FormControl<string | AstushaUserPreview>('', {
    nonNullable: true,
    validators: [Validators.minLength(2), Validators.maxLength(254)],
  });

  protected parentNgControl: NgControl | null = null;

  ngOnInit(): void {
    this.parentNgControl = this.injector.get(NgControl, null, {
      self: true,
    });

    this.searchUser();

    this.searchControl.valueChanges
      .pipe(
        filter((value): value is AstushaUserPreview => value !== null && typeof value !== 'string'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((user) => {
        this.addUser(user);
      });
  }

  writeValue(user: AstushaUserPreview | null): void {
    this.selectedUser.set(user);

    this.searchControl.setValue(user ?? '', {
      emitEvent: false,
    });

    this.foundedUsers.set([]);
  }

  registerOnChange(fn: (value: AstushaUserPreview | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.searchControl.disable({ emitEvent: false });
      this.search$.next('');
      return;
    }

    this.searchControl.enable({ emitEvent: false });
  }

  protected lossFocus(): void {
    this.onTouched();
  }

  protected isParentInvalid(): boolean | null {
    const control = this.parentNgControl?.control;

    return control?.invalid && control.touched ? true : null;
  }

  protected onSearch(value: string): void {
    const inputValue = value.trim().toLowerCase();
    const selectedUser = this.selectedUser();

    if (selectedUser && inputValue === this.stringifyUser(selectedUser).trim().toLowerCase()) {
      return;
    }

    if (selectedUser) {
      this.selectedUser.set(null);
      this.onChange(null);
    }

    this.search$.next(inputValue);
  }

  protected addUser(user: AstushaUserPreview): void {
    this.selectedUser.set(user);

    this.searchControl.setValue(user, {
      emitEvent: false,
    });

    this.search$.next('');

    this.foundedUsers.set([]);

    this.onChange(user);
    this.onTouched();
  }

  protected readonly stringifyUser = (user: AstushaUserPreview): string => {
    const fullName = [user.lastName, user.firstName].filter(Boolean).join(' ');

    return fullName || user.login || '';
  };

  private searchUser(): void {
    this.search$
      .pipe(
        map((query) => query.trim().toLowerCase()),
        distinctUntilChanged(),
        tap((query) => {
          this.foundedUsers.set(query.length >= 2 && query.length <= 254 ? null : []);
        }),
        switchMap((query) => {
          if (query.length < 2 || query.length > 254 || this.searchControl.disabled) {
            this.isSearching.set(false);
            return of<AstushaUserPreview[]>([]);
          }

          this.isSearching.set(true);

          return timer(300).pipe(
            switchMap(() =>
              this.searchUserService
                .findUser(query)
                .pipe(catchError(() => of<AstushaUserPreview[]>([]))),
            ),
            finalize(() => {
              this.isSearching.set(false);
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((users) => {
        this.foundedUsers.set(users);
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: AstushaUserPreview | null) => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};
}
