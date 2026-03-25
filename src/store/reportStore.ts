import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DailyReport {
  id: string;
  date: string;
  author: string;
  tasks: { title: string; status: 'done' | 'in-progress' | 'blocked'; hours: number }[];
  achievements: string;
  issues: string;
  tomorrow: string;
  mood: 1 | 2 | 3 | 4 | 5;
}

export interface ReportTemplate {
  id: string;
  name: string;
  tasks: string[];
}

interface ReportState {
  reports: DailyReport[];
  templates: ReportTemplate[];
  addReport: (r: Omit<DailyReport, 'id'>) => void;
  deleteReport: (id: string) => void;
  addTemplate: (name: string, tasks: string[]) => void;
  deleteTemplate: (id: string) => void;
}

const sampleReports: DailyReport[] = [
  { id: '1', date: '2024-01-20', author: '自分', tasks: [{ title: 'API設計レビュー', status: 'done', hours: 3 }, { title: 'フロントエンド実装', status: 'in-progress', hours: 4 }, { title: 'テスト作成', status: 'blocked', hours: 1 }], achievements: 'API設計のレビューが完了し、チームの合意を得られた', issues: 'テスト環境のDBが不安定で、テスト作成が停滞', tomorrow: 'フロントエンド実装の続き、テスト環境の調査', mood: 4 },
  { id: '2', date: '2024-01-19', author: '自分', tasks: [{ title: 'スプリント計画', status: 'done', hours: 2 }, { title: 'バグ修正 #234', status: 'done', hours: 3 }, { title: 'ドキュメント更新', status: 'done', hours: 2 }], achievements: 'スプリント計画が予定通り完了。バグ#234を解決', issues: '特になし', tomorrow: 'API設計レビュー、新機能の実装開始', mood: 5 },
  { id: '3', date: '2024-01-18', author: '田中', tasks: [{ title: 'デザインシステム更新', status: 'done', hours: 5 }, { title: 'コンポーネント実装', status: 'in-progress', hours: 3 }], achievements: 'カラーパレットの刷新が完了', issues: 'ダークモードの一部コンポーネントで表示崩れ', tomorrow: 'コンポーネント実装の続き', mood: 3 },
];

export const useReportStore = create<ReportState>()(
  persist(
    (set) => ({
      reports: sampleReports,
      templates: [
        { id: '1', name: '開発日報', tasks: ['コーディング', 'コードレビュー', 'ミーティング', 'テスト'] },
        { id: '2', name: '営業日報', tasks: ['クライアント訪問', '提案書作成', '社内報告', '事務作業'] },
      ],
      addReport: (r) => set((s) => ({ reports: [{ ...r, id: crypto.randomUUID() }, ...s.reports] })),
      deleteReport: (id) => set((s) => ({ reports: s.reports.filter((r) => r.id !== id) })),
      addTemplate: (name, tasks) => set((s) => ({ templates: [...s.templates, { id: crypto.randomUUID(), name, tasks }] })),
      deleteTemplate: (id) => set((s) => ({ templates: s.templates.filter((t) => t.id !== id) })),
    }),
    { name: 'report-storage' }
  )
);
