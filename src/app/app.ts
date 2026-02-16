import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly config = {
    currentFollowers: 1270,
    targets: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000],
  };

  protected readonly cellSizeFollowers = 10;

  protected readonly blocks = [
    {
      title: 'Telegram Reminder Bot',
      description: 'Бот нагадує про задачі автоматично.',
    },
    {
      title: 'Instagram DM \u2192 Google Sheets',
      description: 'Кожне повідомлення в Instagram зберігається як лід.',
    },
    {
      title: 'AI Quote of the Day',
      description: 'Щодня AI надсилає коротку думку дня в Telegram.',
    },
    {
      title: 'Telegram \u2b50 \u2192 Notion To-Do',
      description: 'Ставиш реакцію \u2b50 \u2014 і задача з\u2019являється в Notion.',
    },
    {
      title: 'AI Summary',
      description: 'AI підсумовує твій день в 5 рядків.',
    },
    {
      title: 'Weather Reminder',
      description: 'Бот пише погоду і що вдягнути.',
    },
    {
      title: 'Birthday Reminder',
      description: 'Нагадування про дні народження автоматично.',
    },
    {
      title: 'Voice \u2192 Text',
      description: 'Голосове перетворюється в текст автоматично.',
    },
    {
      title: 'AI Content Ideas',
      description: 'AI генерує ідеї для постів за 5 секунд.',
    },
    {
      title: 'Weekly Stats Digest',
      description: 'Щотижня отримуєш короткий звіт по метриках.',
    },
    {
      title: 'Auto Reply',
      description: 'Автовідповідач на типові питання.',
    },
    {
      title: 'Lead Tagger',
      description: 'Автоматично позначає лідів за темою.',
    },
  ];

  protected getMaxProgressBlocks(i: number): number[] {
    return Array.from({ length: this.getTotalCells(i) });
  }

  protected addLevel() {
    this.config.currentFollowers += 50;
  }

  protected isUnlocked(target: number, index: number): boolean {
    return this.config.currentFollowers >= target;
  }

  protected get unlockedCount(): number {
    return this.config.targets.filter((target, index) => this.isUnlocked(target, index)).length;
  }

  protected get allUnlocked(): boolean {
    return this.unlockedCount === this.config.targets.length;
  }

  protected progressPercent(target: number): number {
    if (target <= 0) {
      return 0;
    }
    return Math.min(100, Math.round((this.config.currentFollowers / target) * 100));
  }

  protected get nextUnlockIndex(): number {
    const index = this.config.targets.findIndex((target, i) => !this.isUnlocked(target, i));
    return index === -1 ? -1 : index;
  }

  protected getTotalCells(index: number): number {
    const blockTarget = this.getBlockTarget(index);
    return Math.max(1, Math.ceil(blockTarget / this.cellSizeFollowers));
  }

  protected getGridCols(index: number): number {
    return Math.ceil(Math.sqrt(this.getTotalCells(index)));
  }

  protected getGridRows(index: number): number {
    const cols = this.getGridCols(index);
    return Math.ceil(this.getTotalCells(index) / cols);
  }

  protected getUnlockedCells(index: number): number {
    const progressFollowers = this.getBlockProgress(index);
    return Math.min(
      this.getTotalCells(index),
      Math.floor(progressFollowers / this.cellSizeFollowers),
    );
  }

  protected isCellUnlocked(blockIndex: number, cellIndex: number): boolean {
    return cellIndex < this.getUnlockedCells(blockIndex);
  }

  protected isCellCurrent(blockIndex: number, cellIndex: number): boolean {
    const unlocked = this.getUnlockedCells(blockIndex);
    return cellIndex === unlocked && cellIndex < this.getTotalCells(blockIndex);
  }

  protected getBlockStart(index: number): number {
    return index === 0 ? 0 : this.config.targets[index - 1];
  }

  protected getBlockTarget(index: number): number {
    return this.config.targets[index] - this.getBlockStart(index);
  }

  protected getBlockProgress(index: number): number {
    const start = this.getBlockStart(index);
    const end = this.config.targets[index];
    const raw = this.config.currentFollowers - start;
    return Math.min(end - start, Math.max(0, raw));
  }
}
