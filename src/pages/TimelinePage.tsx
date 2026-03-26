import { Link } from 'react-router-dom';
import { Calendar, FileText, Trash2 } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import EmptyState from '../components/ui/EmptyState';
import { useReportStore } from '../store/reportStore';
import { useToast } from '../components/ui/Toast';
import { useConfirm } from '../components/ui/ConfirmDialog';

const moods = ['', '😫', '😟', '😐', '🙂', '😄'];
const statusColors: Record<string, string> = { done: 'bg-emerald-500/10 text-emerald-400', 'in-progress': 'bg-accent-500/10 text-accent-400', blocked: 'bg-red-500/10 text-red-400' };
const statusLabels: Record<string, string> = { done: '完了', 'in-progress': '進行中', blocked: '停滞' };

export default function TimelinePage() {
  const { reports, deleteReport } = useReportStore();
  const { showToast } = useToast();
  const { confirm } = useConfirm();

  const handleDelete = async (id: string) => {
    const ok = await confirm({ title: '日報を削除', message: 'この日報を削除してもよろしいですか？', confirmLabel: '削除', variant: 'danger' });
    if (!ok) return;
    deleteReport(id);
    showToast('日報を削除しました', 'success');
  };

  return (
    <PageTransition className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-white mb-6">タイムライン</h1>
      {reports.length === 0 ? (
        <EmptyState icon={FileText} title="日報がありません" description="今日の日報を作成してみましょう" action={<Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium rounded-lg transition-colors">日報を書く</Link>} />
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <div key={r.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-accent-400" />
                  <span className="text-sm font-semibold text-white">{r.date}</span>
                  <span className="text-xs text-zinc-500">{r.author}</span>
                  <span className="text-lg">{moods[r.mood]}</span>
                </div>
                <button onClick={() => handleDelete(r.id)} className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
              </div>
              <div className="space-y-1.5 mb-3">
                {r.tasks.map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[t.status]}`}>{statusLabels[t.status]}</span>
                    <span className="text-sm text-zinc-300 flex-1">{t.title}</span>
                    <span className="text-xs text-zinc-500">{t.hours}h</span>
                  </div>
                ))}
              </div>
              {r.achievements && <p className="text-sm text-zinc-400 mt-2"><span className="text-emerald-400 text-xs mr-1">成果:</span>{r.achievements}</p>}
              {r.issues && <p className="text-sm text-zinc-400 mt-1"><span className="text-red-400 text-xs mr-1">課題:</span>{r.issues}</p>}
            </div>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
